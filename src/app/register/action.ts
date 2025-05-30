"use server"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export async function register(formData: FormData) {
  const supabase = await createClient()

  // Get form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate passwords match
  if (password !== confirmPassword) {
    return redirect("/register?error=Passwords do not match")
  }

  // Register the user
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    return redirect(`/register?error=${error.message}`)
  }

  // Redirect to login page with success message
  return redirect("/login?message=Registration successful! Please check your email to confirm your account.")
}
