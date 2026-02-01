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
    const { dietTypes, ingredientsToAvoid } = await request.json()

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Delete existing dietary restrictions for this user (keep allergies intact)
    await supabaseAdmin
        .from('dietary_restrictions')
        .delete()
        .eq('user_id', user.id)

    // Insert diet types
    if (dietTypes.length > 0) {
        const dietRows = dietTypes.map((diet: string) => ({
            user_id: user.id,
            restriction_type: diet,
        }))
        await supabaseAdmin.from('dietary_restrictions').insert(dietRows)
    }

    // Insert ingredients to avoid
    if (ingredientsToAvoid.length > 0) {
        const ingredientRows = ingredientsToAvoid.map((ingredient: string) => ({
            user_id: user.id,
            restriction_type: `avoid_${ingredient}`,
        }))
        await supabaseAdmin.from('dietary_restrictions').insert(ingredientRows)
    }

    return NextResponse.json({ success: true })
}