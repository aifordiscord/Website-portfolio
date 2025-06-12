import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username } = req.query;
    
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    // Set cache headers for GitHub API responses
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'Portfolio-Website/1.0',
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ 
          error: "GitHub user not found",
          message: `User ${username} does not exist`
        });
      }
      if (response.status === 403) {
        return res.status(429).json({ 
          error: "GitHub API rate limit exceeded",
          message: "Please try again later or provide a GitHub token"
        });
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const userData = await response.json();
    
    // Add computed stats
    const enhancedData = {
      ...userData,
      computed_stats: {
        total_stars: 0, // Will be calculated from repos
        activity_score: Math.min(100, userData.public_repos * 2 + userData.followers),
        last_updated: new Date().toISOString()
      }
    };
    
    return res.json(enhancedData);
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return res.status(500).json({ 
      error: "Failed to fetch GitHub user data",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}