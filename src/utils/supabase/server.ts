import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies(); // Await the promise

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,         // Supabase project URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,    // Supabase anon key
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value || null;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
