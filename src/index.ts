import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

app.get('/api/health_check', (c) => {
  return c.text('OK')
})

app.get('/api/json_response', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

const lineWebhookSchema = z.object({
  destination: z.string(),
  events: z
    .object({
      // https://developers.line.biz/ja/reference/messaging-api/#common-properties
      type: z.enum(['follow', 'unfollow', 'message']),
      mode: z.enum(['active', 'standby']),
      timestamp: z.number(),
      source: z.object({
        type: z.enum(['user']),
        userId: z.string(),
      }),
      webhookEventId: z.string(),
      deliveryContext: z.object({
        isRedelivery: z.boolean(),
      }),
      replyToken: z.string().optional(),
      message: z
        .object({
          type: z.enum(['text']),
          id: z.string(),
          quoteToken: z.string(), // https://developers.line.biz/ja/docs/messaging-api/get-quote-tokens/#what-is-quote-token
          text: z.string(),
        })
        .optional(),
    })
    .array(),
})

const lineReplyMessageSchema = z.object({
  replyToken: z.string(),
  messages: z
    .object({
      type: z.enum(['text']),
      text: z.string(),
    })
    .array(),
})

type LineReplyMessage = z.infer<typeof lineReplyMessageSchema>

app.post('/api/line/webhook', async (c) => {
  const contentType = c.req.header('Content-Type')
  if (!contentType?.includes('application/json')) {
    c.status(400)
    return c.text('Bad Request(1)')
  }
  const requestJSON = await c.req.json()
  console.log('[Request]:', requestJSON)
  const { data, error } = lineWebhookSchema.safeParse(requestJSON)
  if (!data || error) {
    if (error instanceof z.ZodError) {
      console.error(`${c.req.method} ${c.req.url} [Request Error]:`, error.toString())
    }
    c.status(400)
    return c.text('Bad Request(2)')
  }
  if (data.events.length > 0) {
    const [event] = data.events
    const { type, replyToken } = event
    let replyMessage: LineReplyMessage | null = null
    switch (type) {
      case 'follow':
        replyMessage = createLINEMessageRequest(replyToken, 'LINEボットです。これからよろしくね！')
        break
      case 'unfollow':
        break
      case 'message':
        replyMessage = createLINEMessageRequest(replyToken, '今日はいい天気だね！')
        break
    }
    if (replyMessage) {
      const url = 'https://api.line.me/v2/bot/message/reply'
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.LINE_MESSAGING_API_TOKEN}`,
        },
        body: JSON.stringify(replyMessage),
      })
      if (res.status !== 200) {
        console.error(`POST ${url} (${res.status}):`, {
          request: replyMessage,
          response: await res.text(),
        })
      }
    }
  } else {
    console.log('Verify webhook')
  }
  return c.text('OK')
})

function createLINEMessageRequest(
  replyToken: string | undefined,
  message: string,
): LineReplyMessage {
  return {
    replyToken: replyToken || '',
    messages: [
      {
        type: 'text',
        text: message,
      },
    ],
  }
}

export default app
