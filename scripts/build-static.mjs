// Builds a static copy of the public website into ./out for GitHub Pages.
// The admin panel, API and form handling need a server, so this script removes them
// from the working tree first — run it on a throwaway checkout (CI does), not your local copy.
import { execSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

if (!process.env.CI && !process.argv.includes('--force')) {
  console.error('This deletes src/app/(payload) and replaces actions.ts. Run it in CI, or pass --force on a throwaway copy.')
  process.exit(1)
}

rmSync('src/app/(payload)', { recursive: true, force: true })
cpSync('src/app/(frontend)/actions.static.ts', 'src/app/(frontend)/actions.ts')

// Pages for new slugs can't be generated on demand without a server; route config must be a literal
for (const entry of readdirSync('src/app', { recursive: true })) {
  const file = join('src/app', entry)
  if (!/\.tsx?$/.test(file)) continue
  const src = readFileSync(file, 'utf8')
  if (src.includes('export const dynamicParams = true')) writeFileSync(file, src.replace('export const dynamicParams = true', 'export const dynamicParams = false'))
}

execSync('npx next build', { stdio: 'inherit', env: { ...process.env, STATIC_EXPORT: '1' } })

if (!existsSync('out')) throw new Error('Static export did not produce ./out')
// Without this, GitHub Pages ignores the _next folder (Jekyll skips names starting with "_")
writeFileSync('out/.nojekyll', '')
console.log('Static site written to ./out')
