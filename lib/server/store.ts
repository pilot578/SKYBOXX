import 'server-only'

import {
  NODES,
  OBJECTS,
  SYSTEM,
  type ObjectData,
  type StorageNodeData,
} from '@/lib/skybox-data'

/**
 * Server-side data layer for SKYBOX. This is the single source of truth the
 * API route handlers and server components read from. It is intentionally
 * seeded from the static dataset so the front-end features and animations stay
 * identical, while all reads now flow through a real backend that can later be
 * swapped for a database without touching any UI component.
 */

export type SystemStats = typeof SYSTEM
export type SkyboxEvent = { t: string; msg: string; code: string }

const EVENTS: SkyboxEvent[] = [
  { t: '14:02:11', msg: 'REPLICA-03 verified on N07', code: 'SHA-256' },
  { t: '14:01:54', msg: 'N05 sync window opened', code: 'SYNC' },
  { t: '14:01:20', msg: 'Rebalance cycle complete · Δ 2.1%', code: 'RBL-12' },
  { t: '14:00:47', msg: 'Integrity sweep 100% · 0 corrupt', code: 'INT-88' },
]

export async function getSystem(): Promise<SystemStats> {
  return SYSTEM
}

export async function getNodes(): Promise<StorageNodeData[]> {
  return NODES
}

export async function getNode(id: string): Promise<StorageNodeData | undefined> {
  return NODES.find((n) => n.id.toLowerCase() === id.toLowerCase())
}

export async function getObjects(): Promise<ObjectData[]> {
  return OBJECTS
}

export async function getEvents(): Promise<SkyboxEvent[]> {
  return EVENTS
}
