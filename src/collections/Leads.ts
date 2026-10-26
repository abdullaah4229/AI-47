import type { CollectionConfig, PayloadHandler } from 'payload'

const csv = (v: unknown) => {
  const s = v === null || v === undefined ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

const COLUMNS = ['createdAt', 'source', 'status', 'name', 'email', 'company', 'phone', 'industry', 'service', 'challenge', 'message', 'assessmentScore', 'assessmentLevel'] as const

/** GET /api/leads/export — download all leads as a CSV file (logged-in admins only). */
const exportCsv: PayloadHandler = async (req) => {
  if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const res = await req.payload.find({ collection: 'leads', limit: 10000, sort: '-createdAt', depth: 0 })
  const rows = [COLUMNS.join(','), ...res.docs.map((d) => COLUMNS.map((c) => csv((d as unknown as Record<string, unknown>)[c])).join(','))]
  return new Response(rows.join('\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="ai742-leads-${new Date().toISOString().slice(0, 10)}.csv"` },
  })
}

/** Contact-form and assessment submissions. Created only by the website's server code, never directly by visitors. */
export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'source', 'status', 'createdAt'],
    group: 'Leads',
    description: 'Download everything as a spreadsheet: /api/leads/export',
  },
  defaultSort: '-createdAt',
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  endpoints: [{ path: '/export', method: 'get', handler: exportCsv }],
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'status', type: 'select', defaultValue: 'new', options: ['new', 'contacted', 'qualified', 'won', 'lost'].map((v) => ({ label: v[0].toUpperCase() + v.slice(1), value: v })) },
        { name: 'source', type: 'select', defaultValue: 'contact', admin: { readOnly: true }, options: [{ label: 'Contact form', value: 'contact' }, { label: 'AI readiness assessment', value: 'assessment' }] },
      ],
    },
    { type: 'row', fields: [{ name: 'name', type: 'text', required: true }, { name: 'email', type: 'email', required: true }] },
    { type: 'row', fields: [{ name: 'company', type: 'text' }, { name: 'phone', type: 'text' }] },
    { type: 'row', fields: [{ name: 'industry', type: 'text' }, { name: 'service', type: 'text', label: 'Service interested in' }] },
    { name: 'challenge', type: 'text', label: 'Business challenge' },
    { name: 'message', type: 'textarea' },
    { type: 'row', fields: [{ name: 'assessmentScore', type: 'number', admin: { readOnly: true } }, { name: 'assessmentLevel', type: 'text', admin: { readOnly: true } }] },
    { name: 'assessmentAnswers', type: 'json', admin: { readOnly: true } },
    { name: 'notes', type: 'textarea', label: 'Internal notes', admin: { description: 'Private — never shown on the website.' } },
  ],
}
