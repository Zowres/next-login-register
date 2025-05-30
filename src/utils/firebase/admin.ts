let adminAuth: any = null

// Only initialize Firebase Admin if we're on the server and have the required env vars
if (typeof window === "undefined") {
  try {
    const { initializeApp, getApps, cert } = require("firebase-admin/app")
    const { getAuth } = require("firebase-admin/auth")

    const hasRequiredEnvVars =
      process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY

    if (hasRequiredEnvVars) {
      const apps = getApps()

      const firebaseAdminApp =
        apps.length > 0
          ? apps[0]
          : initializeApp({
              credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
              }),
            })

      adminAuth = getAuth(firebaseAdminApp)
    }
  } catch (error) {
    console.error("Firebase Admin initialization error:", error)
  }
}

export { adminAuth }
