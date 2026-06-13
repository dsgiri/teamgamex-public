// pages/api/checkout.ts
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Ensure you use the latest stable version
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { priceId, email } = req.body

    try {
      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        line_items: [
          {
            price: priceId, // The ID from your Stripe Dashboard (e.g., price_123...)
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/portal?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/portal/billing`,
        metadata: {
          email: email,
        },
      })

      res.status(200).json({ sessionId: session.id })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}