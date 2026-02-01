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
    const { healthConditions, allergies } = await request.json()

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Delete existing health conditions and allergies for this user
    await supabaseAdmin.from('dietary_restrictions').delete().eq('user_id', user.id)
    await supabaseAdmin.from('allergies').delete().eq('user_id', user.id)

    // Insert health conditions as dietary restrictions
    if (healthConditions.length > 0) {
        const healthRows = healthConditions.map((condition: string) => ({
            user_id: user.id,
            restriction_type: condition,
        }))
        await supabaseAdmin.from('dietary_restrictions').insert(healthRows)
    }

    // Insert allergies
    if (allergies.length > 0) {
        const allergyRows = allergies.map((allergen: string) => ({
            user_id: user.id,
            allergen: allergen,
            severity: 'moderate',
        }))
        await supabaseAdmin.from('allergies').insert(allergyRows)
    }

    return NextResponse.json({ success: true })
}