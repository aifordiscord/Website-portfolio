import { VercelRequest, VercelResponse } from '@vercel/node';

// Helper function to determine activity level
function getActivityLevel(updatedAt: string): string {
  const now = new Date();
  const lastUpdate = new Date(updatedAt);
  const daysSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysSinceUpdate <= 7) return 'very-active';
  if (daysSinceUpdate <= 30) return 'active';
  if (daysSinceUpdate <= 90) return 'moderate';
  return 'inactive';
}

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
    
    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50&type=owner`, {
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

    const reposData = await response.json();
    
    // Enhanced filtering and processing
    const filteredRepos = reposData
      .filter((repo: any) => !repo.fork && !repo.archived && repo.stargazers_count >= 0)
      .sort((a: any, b: any) => {
        // Sort by stars first, then by recent activity
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, 20)
      .map((repo: any) => ({
        ...repo,
        computed_metrics: {
          popularity_score: repo.stargazers_count * 3 + repo.forks_count * 2 + (repo.watchers_count || 0),
          activity_level: getActivityLevel(repo.updated_at),
          tech_stack: repo.topics || [],
          last_commit: repo.updated_at
        }
      }));
    
    const totalStats = {
      total_repos: filteredRepos.length,
      total_stars: filteredRepos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0),
      total_forks: filteredRepos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0),
      languages: [...new Set(filteredRepos.map((repo: any) => repo.language).filter(Boolean))],
      last_updated: new Date().toISOString()
    };
    
    return res.json({
      repositories: filteredRepos,
      stats: totalStats
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return res.status(500).json({ 
      error: "Failed to fetch GitHub repositories",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}