import { NextResponse } from 'next/server'
import { getObjects } from '@/lib/server/store'

export async function GET() {
  const objects = await getObjects()
  return NextResponse.json({ objects })
}
