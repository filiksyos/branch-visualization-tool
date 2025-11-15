'use client'

import { formatDistanceToNow, format } from 'date-fns'
import type { Commit } from '@/lib/github-api'
import { GitCommit, ExternalLink } from 'lucide-react'

interface CommitTimelineProps {
  commits: Commit[]
  branchName: string
}

export function CommitTimeline({ commits, branchName }: CommitTimelineProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">
        Commit History - {branchName}
      </h3>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {commits.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">
            No commits found
          </p>
        ) : (
          commits.map((commit, index) => (
            <div key={commit.sha} className="relative pl-6 pb-4">
              {/* Timeline line */}
              {index !== commits.length - 1 && (
                <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-border" />
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
              
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {commit.message.split('\n')[0]}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(commit.date), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <GitCommit className="h-3 w-3 text-muted-foreground" />
                  <code className="text-muted-foreground">{commit.sha.substring(0, 7)}</code>
                  <span className="text-muted-foreground">
                    {format(new Date(commit.date), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}