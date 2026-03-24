import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import GitHubRepos from './components/GitHubRepos/GitHubRepos'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <GitHubRepos />
      </main>
      <Footer />
    </div>
  )
}
