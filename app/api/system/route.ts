import { NextResponse } from 'next/server'
import { getSystem } from '@/lib/server/store'

export async function GET() {
  const system = await getSystem()
  return NextResponse.json({ system })
}
