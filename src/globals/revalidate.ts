import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/** Refresh every public page after settings or content change in the admin panel. */
export const revalidateSite = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside Next.js (e.g. CLI scripts) — nothing to refresh.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateSite()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateSite()
  return doc
}
