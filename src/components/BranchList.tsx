'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import type { Branch } from '@/lib/github-api'
import { GitBranch, Lock, User, Clock } from 'lucide-react'

interface BranchListProps {
  branches: Branch[]
  selectedBranch: Branch | null
  onBranchSelect: (branch: Branch) => void
}

export function BranchList({ branches, selectedBranch, onBranchSelect }: BranchListProps) {
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date')

  const sortedBranches = [...branches].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }
    return new Date(b.commit.date).getTime() - new Date(a.commit.date).getTime()
  })

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Branches</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'date')}
          className="text-sm border rounded px-2 py-1 bg-background"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {sortedBranches.map((branch) => (
          <div
            key={branch.name}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedBranch?.name === branch.name
                ? 'bg-primary/10 border-primary'
                : 'hover:bg-muted'
            }`}
            onClick={() => onBranchSelect(branch)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <GitBranch className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium truncate">{branch.name}</span>
                {branch.protected && <Lock className="h-3 w-3 text-yellow-500 flex-shrink-0" />}
              </div>
            </div>
            
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="truncate">{branch.commit.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(branch.commit.date), { addSuffix: true })}
                </span>
              </div>
              <p className="truncate text-muted-foreground mt-1">
                {branch.commit.message.split('\n')[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}