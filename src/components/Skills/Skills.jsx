import { skills } from '../../data/resumeData'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">
          <span>#</span> Skills
        </h2>
        <div className="section-divider" />
        <div className="skills__grid">
          {skills.map((skill) => (
            <div key={skill} className="skill-badge">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
