import { experience } from '../../data/resumeData'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">
          <span>#</span> Experience
        </h2>
        <div className="section-divider" />
        <div className="timeline">
          {experience.map((job, i) => (
            <article key={i} className="timeline__item">
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__role">{job.title}</h3>
                    <p className="timeline__company">{job.company}</p>
                  </div>
                  <span className="timeline__dates">{job.dates}</span>
                </div>
                <ul className="timeline__bullets">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="timeline__bullet">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
