
// Tạm thời vô hiệu hóa Supabase để test Local
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => {},
    getUser: async () => ({ data: { user: null } }),
    signInWithPassword: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({ eq: () => ({ single: async () => ({ data: null, error: { code: 'PGRST116' } }) }) }),
    insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
    update: () => ({ eq: async () => ({ error: null }) }),
  })
} as any;
