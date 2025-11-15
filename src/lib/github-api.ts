import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface Branch {
  name: string
  commit: {
    sha: string
    message: string
    author: string
    date: string
  }
  protected: boolean
}

export interface Commit {
  sha: string
  message: string
  author: string
  date: string
  url: string
}

export async function fetchBranches(owner: string, repo: string): Promise<Branch[]> {
  try {
    const { data } = await octokit.repos.listBranches({
      owner,
      repo,
      per_page: 100,
    })

    const branchesWithCommits = await Promise.all(
      data.map(async (branch) => {
        try {
          const { data: commit } = await octokit.repos.getCommit({
            owner,
            repo,
            ref: branch.commit.sha,
          })

          return {
            name: branch.name,
            commit: {
              sha: branch.commit.sha,
              message: commit.commit.message,
              author: commit.commit.author?.name || 'Unknown',
              date: commit.commit.author?.date || '',
            },
            protected: branch.protected,
          }
        } catch (error) {
          return {
            name: branch.name,
            commit: {
              sha: branch.commit.sha,
              message: 'Unable to fetch commit',
              author: 'Unknown',
              date: new Date().toISOString(),
            },
            protected: branch.protected,
          }
        }
      })
    )

    return branchesWithCommits
  } catch (error) {
    console.error('Error fetching branches:', error)
    throw new Error('Failed to fetch branches. Please check the repository exists and is accessible.')
  }
}

export async function fetchCommits(owner: string, repo: string, branch: string): Promise<Commit[]> {
  try {
    const { data } = await octokit.repos.listCommits({
      owner,
      repo,
      sha: branch,
      per_page: 30,
    })

    return data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author?.name || 'Unknown',
      date: commit.commit.author?.date || '',
      url: commit.html_url,
    }))
  } catch (error) {
    console.error('Error fetching commits:', error)
    throw new Error('Failed to fetch commits')
  }
}