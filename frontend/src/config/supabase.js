import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Create Supabase client only if credentials are provided
let supabase = null
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.warn('Supabase initialization failed:', error)
  }
}

// Export a safe wrapper that handles missing Supabase
export { supabase }

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null
}

