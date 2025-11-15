'use client'

import type { Branch } from '@/lib/github-api'
import { GitBranch, Lock, Clock, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface BranchStatsProps {
  branches: Branch[]
  selectedBranch: Branch | null
}

export function BranchStats({ branches, selectedBranch }: BranchStatsProps) {
  const totalBranches = branches.length
  const protectedBranches = branches.filter((b) => b.protected).length
  
  // Get unique authors
  const uniqueAuthors = new Set(branches.map((b) => b.commit.author))
  const totalContributors = uniqueAuthors.size

  // Find most recent branch
  const sortedByDate = [...branches].sort(
    (a, b) => new Date(b.commit.date).getTime() - new Date(a.commit.date).getTime()
  )
  const mostRecentBranch = sortedByDate[0]

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Branch Statistics</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <GitBranch className="h-4 w-4" />
            <span className="text-sm">Total Branches</span>
          </div>
          <p className="text-2xl font-bold">{totalBranches}</p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Protected</span>
          </div>
          <p className="text-2xl font-bold">{protectedBranches}</p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <User className="h-4 w-4" />
            <span className="text-sm">Contributors</span>
          </div>
          <p className="text-2xl font-bold">{totalContributors}</p>
        </div>

        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Last Activity</span>
          </div>
          <p className="text-sm font-semibold">
            {formatDistanceToNow(new Date(mostRecentBranch?.commit.date || new Date()), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      {selectedBranch && (
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold mb-3">Selected Branch: {selectedBranch.name}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium">
                {selectedBranch.protected ? (
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Lock className="h-3 w-3" /> Protected
                  </span>
                ) : (
                  'Active'
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Commit:</span>
              <span className="font-medium">
                {formatDistanceToNow(new Date(selectedBranch.commit.date), { addSuffix: true })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Author:</span>
              <span className="font-medium truncate ml-2">{selectedBranch.commit.author}</span>
            </div>
            <div className="pt-2">
              <span className="text-muted-foreground block mb-1">Latest commit:</span>
              <p className="text-xs bg-muted p-2 rounded">
                {selectedBranch.commit.message.split('\n')[0]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}