import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: "Missing required fields",
        message: "Name, email, and message are required"
      });
    }

    // Log the contact form submission (in production, send to email service)
    console.log('Contact form submission:', { name, email, subject, message });
    
    return res.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      id: Date.now()
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(400).json({ 
      error: "Failed to submit contact form",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}