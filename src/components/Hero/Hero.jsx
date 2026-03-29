import './Hero.css'

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="hero">
      <div className="hero__bg-grid" aria-hidden="true" />
      <div className="container hero__content">
        <p className="hero__greeting">Hi, I&apos;m</p>
        <h1 className="hero__name">Cameron Buchanan</h1>
        <h2 className="hero__title">Software Engineering Student</h2>
        <p className="hero__bio">
          Full-stack developer with experience building transit systems, data pipelines, web
          applications, and AI agents. Passionate about writing clean,
          impactful software.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollTo('#projects')}>
            View Projects
          </button>
          <a className="btn btn--secondary" href="mailto:camcarbuc@gmail.com">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
