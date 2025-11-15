'use client'

import { motion } from 'framer-motion'
import type { Branch } from '@/lib/github-api'

interface BranchGraphProps {
  branches: Branch[]
  selectedBranch: Branch | null
  onBranchSelect: (branch: Branch) => void
}

export function BranchGraph({ branches, selectedBranch, onBranchSelect }: BranchGraphProps) {
  const width = 600
  const height = Math.max(400, branches.length * 60)
  const padding = 40

  // Simple vertical layout for branches
  const branchPositions = branches.map((branch, index) => ({
    branch,
    x: padding,
    y: padding + (index * (height - padding * 2)) / Math.max(branches.length - 1, 1),
  }))

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Branch Relationship Graph</h3>
      <div className="overflow-x-auto">
        <svg width={width} height={height} className="w-full">
          {/* Draw connecting lines */}
          {branchPositions.map((pos, index) => {
            if (index === 0) return null
            const prevPos = branchPositions[0] // Connect all to main/first branch
            return (
              <motion.line
                key={`line-${pos.branch.name}`}
                x1={prevPos.x + 60}
                y1={prevPos.y}
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground opacity-30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            )
          })}

          {/* Draw branch nodes */}
          {branchPositions.map((pos, index) => (
            <g key={pos.branch.name}>
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="8"
                className={`cursor-pointer ${
                  selectedBranch?.name === pos.branch.name
                    ? 'fill-primary'
                    : 'fill-secondary'
                }`}
                onClick={() => onBranchSelect(pos.branch)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.2 }}
              />
              <text
                x={pos.x + 20}
                y={pos.y + 5}
                className={`text-sm cursor-pointer ${
                  selectedBranch?.name === pos.branch.name
                    ? 'fill-primary font-semibold'
                    : 'fill-foreground'
                }`}
                onClick={() => onBranchSelect(pos.branch)}
              >
                {pos.branch.name}
              </text>
              {pos.branch.protected && (
                <text
                  x={pos.x + 20 + pos.branch.name.length * 7}
                  y={pos.y + 5}
                  className="text-xs fill-yellow-500"
                >
                  🔒
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}