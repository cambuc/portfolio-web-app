import { useState, useEffect } from 'react'
import './GitHubRepos.css'

const GITHUB_USERNAME = 'cambuc'

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  'C#': '#178600',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
}

function RepoCard({ repo }) {
  return (
    <a
      className="repo-card"
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="repo-card__header">
        <svg className="repo-card__icon" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8V1.5Z" />
        </svg>
        <span className="repo-card__name">{repo.name}</span>
        {repo.fork && <span className="repo-card__fork">fork</span>}
      </div>
      <p className="repo-card__description">
        {repo.description || 'No description provided.'}
      </p>
      <div className="repo-card__meta">
        {repo.language && (
          <span className="repo-card__lang">
            <span
              className="repo-card__lang-dot"
              style={{ background: LANG_COLORS[repo.language] || '#8b949e' }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="repo-card__stat">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
            </svg>
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="repo-card__stat">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
            </svg>
            {repo.forks_count}
          </span>
        )}
      </div>
    </a>
  )
}

function SkeletonCard() {
  return (
    <div className="repo-card repo-card--skeleton">
      <div className="skeleton skeleton--line skeleton--short" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line skeleton--medium" />
      <div className="skeleton skeleton--line skeleton--tiny" />
    </div>
  )
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setRepos(data.filter((r) => !r.fork && r.name !== GITHUB_USERNAME).slice(0, 9))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects" className="github-repos">
      <div className="container">
        <h2 className="section-title">
          <span>#</span> Projects
        </h2>
        <div className="section-divider" />
        <p className="github-repos__subtitle">
          Recent repositories from{' '}
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
            @{GITHUB_USERNAME}
          </a>
        </p>

        {error && (
          <div className="github-repos__error">
            <p>Could not load repositories: {error}</p>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
              View on GitHub →
            </a>
          </div>
        )}

        <div className="repos-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
        </div>

        {!loading && !error && (
          <div className="github-repos__cta">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              View all repositories →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
