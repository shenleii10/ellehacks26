import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

export async function POST(request: Request) {
    const { fullName, age, country } = await request.json()

    // For now we're using the anon client to get current user
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    // Update the profile with the basic info
    const { error } = await supabaseAdmin
        .from('profiles')
        .update({
            full_name: fullName,
            age: age,
            country: country,
            updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

    if (error) {
        console.error('Profile update error:', error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
}