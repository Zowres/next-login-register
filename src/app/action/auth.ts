"use server"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { adminAuth } from "@/utils/firebase/admin"

export async function createSessionCookie(idToken: string) {
  if (!adminAuth) {
    console.error("Firebase Admin not initialized")
    return { success: false, error: "Authentication service not available" }
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    const response = NextResponse.redirect("/") // or any page you want to redirect after login
    response.cookies.set("session", sessionCookie, {
      maxAge: expiresIn / 1000, // in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error creating session cookie:", error)
    return NextResponse.json({ success: false, error: "Failed to create session" })
  }
}
