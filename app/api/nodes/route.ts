import { NextResponse } from 'next/server'
import { getNodes } from '@/lib/server/store'

export async function GET() {
  const nodes = await getNodes()
  return NextResponse.json({ nodes })
}
