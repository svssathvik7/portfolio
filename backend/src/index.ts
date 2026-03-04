import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

app.get('/', (c) => c.json({ ok: true, service: 'portfolio-backend' }))

const port = Number(process.env.PORT || 8787)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Hono server running on http://localhost:${info.port}`)
})
