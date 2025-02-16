import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) {
      return NextResponse.json(
        { user: null, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256']
    })

    if (!payload.sub || !payload.exp) {
      return NextResponse.json(
        { user: null, error: 'Invalid token structure' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: payload.sub,
        email: payload.email,
        expiresAt: new Date(payload.exp * 1000).toISOString()
      }
    })

  } catch (error) {
    console.error('Session verification failed:', error)
    
    return NextResponse.json(
      { 
        user: null, 
        error: error instanceof Error 
          ? error.message 
          : 'Invalid session'
      },
      { status: 401 }
    )
  }
}

export const OPTIONS = () => {
  const response = new Response(null, {
    status: 204,
  })
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  
  return response
}