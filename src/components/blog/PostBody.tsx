import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { nodeText, slugifyHeading } from '@/lib/blog'

/** Renders post content. H2/H3 get ids for the "On this page" menu; quotes become pull quotes. */
export function PostBody({ data }: { data: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const seen = new Map<string, number>()
  const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const tag = ['h2', 'h3', 'h4'].includes(node.tag) ? node.tag : 'h2'
      if (tag === 'h4') return <h4>{children}</h4>
      let id = slugifyHeading(nodeText(node))
      const c = seen.get(id) ?? 0
      seen.set(id, c + 1)
      if (c) id = `${id}-${c + 1}`
      return tag === 'h2' ? <h2 id={id}>{children}</h2> : <h3 id={id}>{children}</h3>
    },
    quote: ({ node, nodesToJSX }) => <blockquote className="pull-quote">{nodesToJSX({ nodes: node.children })}</blockquote>,
  })
  return <RichText data={data} converters={converters} className="prose" />
}
