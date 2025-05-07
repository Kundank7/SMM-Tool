"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { z } from "zod"

// Define schema for deposit form data
const depositSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  paymentMethod: z.enum(["upi", "bitcoin", "usdt", "card"], {
    errorMap: () => ({ message: "Invalid payment method" }),
  }),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
})

export type DepositFormData = z.infer<typeof depositSchema>

export async function createDeposit(formData: DepositFormData) {
  try {
    // Validate form data
    const validatedData = depositSchema.parse(formData)

    // Get Supabase client
    const supabase = createServerSupabaseClient()

    // Get current user
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session) {
      throw new Error("You must be logged in to create a deposit")
    }

    // Create deposit
    const { data: deposit, error: depositError } = await supabase
      .from("deposits")
      .insert({
        user_id: session.user.id,
        amount: validatedData.amount,
        payment_method: validatedData.paymentMethod,
        transaction_id: validatedData.transactionId || null,
        notes: validatedData.notes || null,
        status: "pending",
      })
      .select()
      .single()

    if (depositError) {
      console.error("DEPOSIT_001: Deposit creation failed", depositError)
      throw new Error("Failed to create deposit")
    }

    // Revalidate deposit page
    revalidatePath("/deposit")

    return { success: true, deposit }
  } catch (error) {
    console.error("DEPOSIT_002: Deposit action failed", error)

    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors
      return {
        success: false,
        error: "Validation failed",
        fieldErrors,
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
