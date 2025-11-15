'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export function SearchRepo() {
  const [input, setInput] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Parse various GitHub URL formats
    let owner = ''
    let repo = ''

    // Remove github.com prefix if present
    const cleanInput = input.replace(/https?:\/\/(www\.)?github\.com\//gi, '')
    
    // Split by slash
    const parts = cleanInput.split('/').filter(Boolean)
    
    if (parts.length >= 2) {
      owner = parts[0]
      repo = parts[1]
      router.push(`/repo/${owner}/${repo}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter repository (e.g., facebook/react or github.com/facebook/react)"
          className="w-full pl-12 pr-4 py-4 text-lg border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Enter a GitHub repository in the format: owner/repo
      </p>
    </form>
  )
}