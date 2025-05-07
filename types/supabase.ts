export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          balance: number
          role: "user" | "admin"
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          balance?: number
          role?: "user" | "admin"
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          balance?: number
          role?: "user" | "admin"
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          platform: string
          service_type: string
          price: number
          unit: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          platform: string
          service_type: string
          price: number
          unit: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          platform?: string
          service_type?: string
          price?: number
          unit?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          service_id: string | null
          service_name: string
          quantity: number
          amount: number
          target_url: string | null
          status: "pending" | "processing" | "completed" | "cancelled" | "failed"
          notes: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          service_id?: string | null
          service_name: string
          quantity: number
          amount: number
          target_url?: string | null
          status?: "pending" | "processing" | "completed" | "cancelled" | "failed"
          notes?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          service_id?: string | null
          service_name?: string
          quantity?: number
          amount?: number
          target_url?: string | null
          status?: "pending" | "processing" | "completed" | "cancelled" | "failed"
          notes?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      deposits: {
        Row: {
          id: string
          user_id: string
          amount: number
          payment_method: "upi" | "bitcoin" | "usdt" | "card"
          transaction_id: string | null
          payment_proof_url: string | null
          status: "pending" | "approved" | "rejected"
          notes: string | null
          created_at: string
          updated_at: string
          approved_by: string | null
          approved_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          payment_method: "upi" | "bitcoin" | "usdt" | "card"
          transaction_id?: string | null
          payment_proof_url?: string | null
          status?: "pending" | "approved" | "rejected"
          notes?: string | null
          created_at?: string
          updated_at?: string
          approved_by?: string | null
          approved_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          payment_method?: "upi" | "bitcoin" | "usdt" | "card"
          transaction_id?: string | null
          payment_proof_url?: string | null
          status?: "pending" | "approved" | "rejected"
          notes?: string | null
          created_at?: string
          updated_at?: string
          approved_by?: string | null
          approved_at?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: "deposit" | "order" | "refund" | "adjustment"
          reference_id: string | null
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: "deposit" | "order" | "refund" | "adjustment"
          reference_id?: string | null
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: "deposit" | "order" | "refund" | "adjustment"
          reference_id?: string | null
          description?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: "pending" | "processing" | "completed" | "cancelled" | "failed"
      deposit_status: "pending" | "approved" | "rejected"
      transaction_type: "deposit" | "order" | "refund" | "adjustment"
      user_role: "user" | "admin"
      payment_method: "upi" | "bitcoin" | "usdt" | "card"
    }
  }
}
