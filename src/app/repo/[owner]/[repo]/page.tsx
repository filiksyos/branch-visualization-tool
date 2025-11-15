'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { BranchGraph } from '@/components/BranchGraph'
import { BranchList } from '@/components/BranchList'
import { CommitTimeline } from '@/components/CommitTimeline'
import { BranchStats } from '@/components/BranchStats'
import { fetchBranches, fetchCommits, type Branch, type Commit } from '@/lib/github-api'
import { Loader2 } from 'lucide-react'

export default function RepoPage() {
  const params = useParams()
  const owner = params.owner as string
  const repo = params.repo as string

  const [branches, setBranches] = useState<Branch[]>([])
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const branchesData = await fetchBranches(owner, repo)
        setBranches(branchesData)
        
        // Select default branch (usually main or master)
        const defaultBranch = branchesData.find(b => b.name === 'main' || b.name === 'master') || branchesData[0]
        if (defaultBranch) {
          setSelectedBranch(defaultBranch)
          const commitsData = await fetchCommits(owner, repo, defaultBranch.name)
          setCommits(commitsData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load repository data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [owner, repo])

  const handleBranchSelect = async (branch: Branch) => {
    setSelectedBranch(branch)
    try {
      const commitsData = await fetchCommits(owner, repo, branch.name)
      setCommits(commitsData)
    } catch (err) {
      console.error('Failed to load commits:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">
          {owner}/{repo}
        </h2>
        <p className="text-muted-foreground">
          {branches.length} branch{branches.length !== 1 ? 'es' : ''} found
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <BranchGraph 
            branches={branches}
            selectedBranch={selectedBranch}
            onBranchSelect={handleBranchSelect}
          />
          
          <BranchList 
            branches={branches}
            selectedBranch={selectedBranch}
            onBranchSelect={handleBranchSelect}
          />
        </div>

        <div className="space-y-8">
          <BranchStats 
            branches={branches}
            selectedBranch={selectedBranch}
          />
          
          <CommitTimeline 
            commits={commits}
            branchName={selectedBranch?.name || ''}
          />
        </div>
      </div>
    </div>
  )
}