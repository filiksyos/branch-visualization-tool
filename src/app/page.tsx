import { SearchRepo } from '@/components/SearchRepo'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">
            Visualize GitHub Branches
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore branch relationships, commit history, and statistics for any GitHub repository
          </p>
        </div>
        
        <div className="pt-8">
          <SearchRepo />
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-2xl mb-2">🌳</div>
            <h3 className="font-semibold mb-2">Branch Graph</h3>
            <p className="text-sm text-muted-foreground">
              Interactive visualization showing branch relationships and hierarchy
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold mb-2">Statistics</h3>
            <p className="text-sm text-muted-foreground">
              Detailed metrics on branch activity, commits, and contributors
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="text-2xl mb-2">⏱️</div>
            <h3 className="font-semibold mb-2">Timeline</h3>
            <p className="text-sm text-muted-foreground">
              Visualize commit history and activity patterns over time
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}