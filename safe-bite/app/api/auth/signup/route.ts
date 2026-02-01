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
    const { email, password, fullName } = await request.json()

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    })

    if (authError) {
        console.error('Auth error:', authError)
        return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (authData.user) {
        console.log('Creating profile for user:', authData.user.id)

        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .insert([
                {
                    id: authData.user.id,
                    email: authData.user.email,
                    full_name: fullName,
                },
            ])

        if (profileError) {
            console.error('Profile error:', profileError)
            return NextResponse.json({ error: profileError.message }, { status: 400 })
        }

        console.log('Profile created successfully')
    }

    return NextResponse.json({ user: authData.user })
}