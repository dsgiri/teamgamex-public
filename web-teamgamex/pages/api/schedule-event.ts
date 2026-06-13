import { getAuth } from "@clerk/nextjs/server";
import { supabase } from "../../lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Identify the Manager (Clerk Authentication)
  const { userId } = getAuth(req);
  
  // Destructure the payload, including our new calendar_id
  const { postId, eventDate, notes, calendar_id } = req.body;

  // Security Check: Deny if not logged in
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: Please log in to manage your calendar." });
  }

  // Data Validation: Ensure we have the minimum requirements
  if (!postId || !eventDate) {
    return res.status(400).json({ error: "Missing required fields: postId and eventDate must be provided." });
  }

  // --- HANDLE SCHEDULING (POST) ---
  if (req.method === "POST") {
    const { data, error } = await supabase
      .from("event_calendar")
      .insert([
        { 
          user_id: userId, 
          post_id: postId, 
          event_date: eventDate, // Expected format: YYYY-MM-DDTHH:mm
          notes: notes || "",
          calendar_id: calendar_id || 0 // Defaulting to 0 for our "Global" calendar
        }
      ])
      .select();

    if (error) {
      console.error("Supabase Database Error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ 
      message: "Activity successfully scheduled to the default calendar.",
      data: data 
    });
  }

  // Handle unsupported methods (like GET or DELETE at this endpoint)
  return res.status(405).json({ error: "Method not allowed" });
}