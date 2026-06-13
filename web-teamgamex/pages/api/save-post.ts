import { getAuth } from "@clerk/nextjs/server";
import { supabase } from "../../lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Identify the User (The Badge)
  const { userId } = getAuth(req);
  const { postId } = req.body;

  // Security Check: Ensure user is logged in
  if (!userId) {
    return res.status(401).json({ error: "Please log in to save activities." });
  }

  // Ensure we have a Post ID to work with
  if (!postId) {
    return res.status(400).json({ error: "Missing Post ID." });
  }

  // --- HANDLE SAVING (POST) ---
  if (req.method === "POST") {
    const { error } = await supabase
      .from("saved_posts")
      .insert([{ 
        user_id: userId, 
        post_id: postId 
      }]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      
      // If the error code is 23505, it truly is a duplicate
      if (error.code === '23505') {
        return res.status(400).json({ error: "Already in your feed." });
      }
      
      // Otherwise, return the actual database error (like a permission/RLS issue)
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Successfully added to your feed!" });
  }

  // --- HANDLE UNSAVING (DELETE) ---
  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("saved_posts")
      .delete()
      .match({ 
        user_id: userId, 
        post_id: postId 
      });

    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Removed from your feed." });
  }

  // Handle unsupported methods
  return res.status(405).json({ error: "Method not allowed" });
}