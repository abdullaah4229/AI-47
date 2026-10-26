'use client'

import { useEffect, useState } from 'react'

/** Invisible anti-spam fields: a honeypot people never fill in, and the time the form was opened. */
export function SpamFields() {
  const [t, setT] = useState('')
  useEffect(() => setT(String(Date.now())), [])
  return (
    <>
      <input type="hidden" name="startedAt" value={t} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
    </>
  )
}
