import { NextRequest, NextResponse } from 'next/server'

// Lazy-load Redis so missing env vars don't crash the build/module load
function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  // Dynamic require so it's only resolved at runtime when env vars are present
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Redis } = require('@upstash/redis') as typeof import('@upstash/redis')
  return new Redis({ url, token })
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params
  const redis = getRedis()

  if (!redis) {
    return NextResponse.json({ count: 0, degraded: true })
  }

  try {
    const count = (await redis.get<number>(`likes:${uid}`)) ?? 0
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0, degraded: true })
  }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params
  const redis = getRedis()

  if (!redis) {
    return NextResponse.json({ count: 0, degraded: true })
  }

  try {
    const count = await redis.incr(`likes:${uid}`)
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: 0, degraded: true })
  }
}
