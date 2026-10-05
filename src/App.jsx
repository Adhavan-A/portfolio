import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width, height
    let particles = []
    let mouse = { x: null, y: null, radius: 80 }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x
      mouse.y = e.y
    })

    window.addEventListener('mouseout', () => {
      mouse.x = null
      mouse.y = null
    })

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 30) + 1
        this.opacity = Math.random() * 0.5 + 0.3
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
      update() {
        if (mouse.x != null) {
          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          let forceDirectionX = dx / distance
          let forceDirectionY = dy / distance
          let maxDistance = mouse.radius
          let force = (maxDistance - distance) / maxDistance
          let directionX = forceDirectionX * force * this.density
          let directionY = forceDirectionY * force * this.density

          if (distance < mouse.radius) {
            this.x -= directionX * 0.5
            this.y -= directionY * 0.5
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX
              this.x -= dx / 10
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY
              this.y -= dy / 10
            }
          }
        }
        this.draw()
      }
    }

    const init = () => {
      particles = []
      let numberOfParticles = (width * height) / 1500 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }
    init()

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
      }
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="app-container">
      <canvas ref={canvasRef} id="star-canvas"></canvas>
      
      <nav className="navbar">
        <div className="logo">Adhavan A.Dev</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="content-overlay">
        {/* Hero Section */}
        <header className="hero">
          <h1>Adhavan A</h1>
          <h2>Full Stack Developer & B.Tech IT Student</h2>
          <p>Motivated B.Tech Information Technology student with strong knowledge of Java, Python, HTML, CSS, JavaScript, SQL and web development concepts. Seeking a Full Stack Developer role to apply technical skills and grow in a professional software development environment.</p>
          <div className="btn-group">
            <a href="/Adhavan_Resume.pdf" download="Adhavan_Resume.pdf" className="btn btn-primary">
              Download My Resume
            </a>
            <a href="#contact" className="btn">Get In Touch</a>
          </div>
        </header>

        {/* About Section */}
        <section id="about">
          <h2 className="section-title">About Me</h2>
          <p style={{textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', color: '#e2e8f0'}}>
            Familiar with React.js, REST APIs, database management, and Data Structures & Algorithms. Hands-on experience through academic projects, internships and technical workshops. A quick learner with strong problem-solving skills and a passion for developing scalable full-stack applications.
          </p>
          <div className="section-divider"></div>
        </section>

        {/* Technical Skills Section */}
        <section id="skills">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Languages</h3>
              <ul><li>Python</li><li>Java</li><li>JavaScript</li></ul>
            </div>
            <div className="skill-card">
              <h3>Frontend</h3>
              <ul><li>HTML</li><li>CSS</li><li>React.js</li></ul>
            </div>
            <div className="skill-card">
              <h3>Databases</h3>
              <ul><li>MySQL</li><li>SQL</li></ul>
            </div>
            <div className="skill-card">
              <h3>Tools</h3>
              <ul><li>VS Code</li><li>GitHub</li><li>PyCharm</li></ul>
            </div>
            <div className="skill-card">
              <h3>Core Concepts</h3>
              <ul><li>Software Programming</li><li>Software Design</li><li>Data Structures & Algorithms</li></ul>
            </div>
          </div>
          <div className="section-divider"></div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <h2 className="section-title">Internship & Experience</h2>
          <div className="card">
            <h3>Business & Data Analytics</h3>
            <div className="subtitle">YBI Foundation</div>
            <div className="date">Mar 2025 – Apr 2025</div>
            <ul>
              <li>Analyzed complex datasets using statistical methods, executing optimized SQL queries and data-manipulation scripts in Python.</li>
              <li>Collaborated with cross-functional team members to gather technical requirements and design clear, data-driven visual reports.</li>
              <li>Participated in peer reviews to verify code accuracy, efficiency and data consistency.</li>
            </ul>
          </div>
          <div className="card">
            <h3>IoT & Embedded Systems Workshop</h3>
            <div className="subtitle">Zeekers Technology</div>
            <div className="date">Apr 2025</div>
            <ul>
              <li>Gained practical exposure to microcontroller programming (Arduino/NodeMCU) and sensor interfacing using Embedded C.</li>
              <li>Applied cloud-based data transmission frameworks to real-world software applications, driving the development of the Fall Alert project.</li>
            </ul>
          </div>
          <div className="section-divider"></div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="section-title">Featured Projects</h2>
          <div className="card">
            <h3>AI-Based Deep Fake Analysis for Multiple Sectors</h3>
            <ul>
              <li>Architected a multi-modal web platform using Python and Flask to analyze and verify the authenticity of text, image and video content within a single integrated pipeline.</li>
              <li>Combined a transformer-based RoBERTa model with GPT-2 Perplexity scoring to evaluate semantic structure and detect AI-generated text.</li>
              <li>Deployed a SigLIP Vision Transformer to isolate hidden visual artifacts, facial inconsistencies and texture anomalies in manipulated imagery.</li>
              <li>Integrated OpenCV to build an automated video framework that extracts sequential frames, processes them through the visual engine and aggregates results into a final probability score.</li>
            </ul>
            <div className="tech-stack">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Flask</span>
              <span className="tech-tag">HTML</span>
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">OpenCV</span>
              <span className="tech-tag">RoBERTa</span>
              <span className="tech-tag">SigLIP</span>
            </div>
          </div>
          <div className="card">
            <h3>IoT-Based Fall Alert Device <span style={{fontSize: '0.8rem', background: 'rgba(167, 139, 250, 0.2)', padding: '2px 8px', borderRadius: '10px', marginLeft: '10px', color: '#a78bfa'}}>Lead Developer</span></h3>
            <ul>
              <li>Designed, tested and deployed a hardware-software system using motion sensors and accelerometers to detect human falls in real time.</li>
              <li>Integrated cloud transmission architecture to automatically dispatch emergency alert notifications to designated contacts.</li>
              <li>Applied problem-solving and debugging skills to optimize sensor responsiveness and resolve system communication issues.</li>
            </ul>
            <div className="tech-stack">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Microcontrollers & Hardware</span>
              <span className="tech-tag">Fall Sensors</span>
            </div>
          </div>
          <div className="section-divider"></div>
        </section>

        {/* Education Section */}
        <section id="education">
          <h2 className="section-title">Education & Certifications</h2>
          <div className="edu-grid">
            <div className="edu-card">
              <h3>Bachelor of Technology in IT</h3>
              <div className="subtitle">Hindustan College of Engineering and Technology</div>
              <div className="date">2022 – Apr 2026 | CGPA: 7.5</div>
            </div>
            <div className="edu-card">
              <h3>Certifications</h3>
              <ul style={{marginTop: '10px'}}>
                <li style={{marginBottom: '8px', color: '#cbd5e1'}}>• Python Program – CSC Computer Education</li>
                <li style={{marginBottom: '8px', color: '#cbd5e1'}}>• Java Program – CSC Computer Education</li>
                <li style={{color: '#cbd5e1'}}>• Business and Data Analytics – YBI Foundation</li>
              </ul>
            </div>
          </div>
          <div className="section-divider"></div>
        </section>

        {/* Soft Skills Section */}
        <section id="soft-skills">
          <h2 className="section-title">Soft Skills & Additional</h2>
          <div className="soft-skills-grid">
            <div className="soft-skill-card">
              <h3>Adaptability</h3>
              <p style={{color: '#cbd5e1'}}>Adaptability & Flexibility</p>
            </div>
            <div className="soft-skill-card">
              <h3>Teamwork</h3>
              <p style={{color: '#cbd5e1'}}>Collaborative Teamwork</p>
            </div>
            <div className="soft-skill-card">
              <h3>Problem Solving</h3>
              <p style={{color: '#cbd5e1'}}>Analytical Problem-Solving</p>
            </div>
            <div className="soft-skill-card">
              <h3>Reasoning</h3>
              <p style={{color: '#cbd5e1'}}>Strong Logical Reasoning</p>
            </div>
            <div className="soft-skill-card">
              <h3>Languages</h3>
              <p style={{color: '#cbd5e1'}}>Tamil, English</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer MOVED OUTSIDE content-overlay for Full Width */}
      <footer className="footer-section" id="contact">
        <div className="footer-content-wrapper">
          <h2 className="footer-heading">Let's Work Together</h2>
          <p className="footer-subtitle">I am currently seeking a Full Stack Developer role. Feel free to reach out!</p>
          
          <div className="contact-row">
            <a href="mailto:adhavan09.in@gmail.com" className="contact-item">
              <span className="contact-icon">📧</span>
              <span>adhavan09.in@gmail.com</span>
            </a>
            
            <a href="tel:878496935" className="contact-item">
              <span>878496935</span>
            </a>
            
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Bengaluru, India</span>
            </div>
            
            <a href="https://linkedin.com/in/adhavan-a-70a437344" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon">💼</span>
              <span>LinkedIn</span>
            </a>
            
            <a href="https://github.com/Adhavan-A" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon">👤</span>
              <span>GitHub</span>
            </a>
          </div>

          <div className="footer-copyright">
            © 2026 Adhavan A. Built with React.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App