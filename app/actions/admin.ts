"use server"

import { revalidatePath } from "next/cache"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { z } from "zod"

// Define schema for deposit approval
const depositApprovalSchema = z.object({
  depositId: z.string().uuid("Invalid deposit ID"),
  adminId: z.string().uuid("Invalid admin ID"),
})

export async function approveDeposit(data: z.infer<typeof depositApprovalSchema>) {
  try {
    // Validate data
    const validatedData = depositApprovalSchema.parse(data)

    // Get Supabase client with service role
    const supabase = createServiceRoleClient()

    // Start a transaction
    const { data: deposit, error: depositError } = await supabase.rpc("approve_deposit", {
      p_deposit_id: validatedData.depositId,
      p_admin_id: validatedData.adminId,
    })

    if (depositError) {
      console.error("ADMIN_001: Deposit approval failed", depositError)
      throw new Error("Failed to approve deposit")
    }

    // Revalidate admin page
    revalidatePath("/admin")

    return { success: true, deposit }
  } catch (error) {
    console.error("ADMIN_002: Deposit approval action failed", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

// Define schema for bulk deposit approval
const bulkDepositApprovalSchema = z.object({
  depositIds: z.array(z.string().uuid("Invalid deposit ID")),
  adminId: z.string().uuid("Invalid admin ID"),
})

export async function bulkApproveDeposits(data: z.infer<typeof bulkDepositApprovalSchema>) {
  try {
    // Validate data
    const validatedData = bulkDepositApprovalSchema.parse(data)

    // Get Supabase client with service role
    const supabase = createServiceRoleClient()

    // Process each deposit in sequence
    const results = []
    for (const depositId of validatedData.depositIds) {
      const { data: deposit, error: depositError } = await supabase.rpc("approve_deposit", {
        p_deposit_id: depositId,
        p_admin_id: validatedData.adminId,
      })

      if (depositError) {
        console.error(`ADMIN_003: Bulk deposit approval failed for ${depositId}`, depositError)
        results.push({ id: depositId, success: false, error: depositError.message })
      } else {
        results.push({ id: depositId, success: true })
      }
    }

    // Revalidate admin page
    revalidatePath("/admin")

    return {
      success: true,
      results,
      summary: {
        total: validatedData.depositIds.length,
        successful: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
      },
    }
  } catch (error) {
    console.error("ADMIN_004: Bulk deposit approval action failed", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
