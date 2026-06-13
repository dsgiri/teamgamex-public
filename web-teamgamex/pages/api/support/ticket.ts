import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // 1. Identity Gate
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized Infrastructure Access' });

  const { category, message, email } = req.body;

  try {
    // 2. Log Ticket in Supabase
    const { data, error } = await supabaseAdmin
      .from('support_tickets')
      .insert([
        { user_id: userId, category, message, email, status: 'open' }
      ])
      .select()
      .single();

    if (error) throw error;

    // 3. Send Confirmation Email to Activity Administrator
    await resend.emails.send({
      from: 'TeamGameX Support <support@teamgamex.app>',
      to: email,
      subject: `Ticket Received: [#${data.id.slice(0, 8)}]`,
      html: `
        <div style="font-family: sans-serif; padding: 40px; color: #0f172a;">
          <h1 style="letter-spacing: -0.05em; font-weight: 900;">TeamGameX.</h1>
          <p style="text-transform: uppercase; font-size: 10px; font-weight: 900; letter-spacing: 0.3em; color: #64748b;">Support Infrastructure</p>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
          <p>Hello Activity Administrator,</p>
          <p>Your technical ticket regarding <strong>${category}</strong> has been successfully opened.</p>
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p style="font-size: 12px; font-weight: bold; margin-bottom: 5px; color: #94a3b8;">MESSAGE SUMMARY:</p>
            <p style="margin: 0; font-size: 14px;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #64748b;">Our engineering team typically responds within 4 hours during operational cycles.</p>
        </div>
      `
    });

    return res.status(200).json({ success: true, ticketId: data.id });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}