import { useEffect, useRef, useState } from 'react';
import '../styles/Skills.css';

interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
  color: string;
}

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  // ── NEW: separate state to trigger bar animation after mount ──
  const [barsAnimated, setBarsAnimated] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    // Frontend
    { name: 'React',       level: 85, icon: '⚛️', category: 'Frontend',    color: '#61dafb' },
    { name: 'JavaScript',  level: 90, icon: '📜', category: 'Frontend',    color: '#f7df1e' },
    { name: 'HTML/CSS',    level: 95, icon: '🎨', category: 'Frontend',    color: '#e44d26' },
    // Backend
    { name: 'Node.js',     level: 80, icon: '🟢', category: 'Backend',     color: '#68a063' },
    { name: 'Express.js',  level: 75, icon: '🚂', category: 'Backend',     color: '#888888' },
    { name: 'MongoDB',     level: 70, icon: '🍃', category: 'Backend',     color: '#4db33d' },
    // Programming
    { name: 'Python',      level: 85, icon: '🐍', category: 'Programming', color: '#3776ab' },
    { name: 'Java',        level: 82, icon: '☕', category: 'Programming', color: '#f89820' },
    { name: 'C/C++',       level: 85, icon: '⚙️', category: 'Programming', color: '#00599c' },
    { name: 'Solidity',    level: 72, icon: '🔷', category: 'Programming', color: '#627eea' },
    { name: 'VHDL',        level: 65, icon: '🔌', category: 'Programming', color: '#a855f7' },
    // Tools & Platforms
    { name: 'Git',              level: 90, icon: '📦', category: 'Tools', color: '#f05032' },
    { name: 'Linux',            level: 80, icon: '🐧', category: 'Tools', color: '#fcc624' },
    { name: 'Red Hat',          level: 75, icon: '🎩', category: 'Tools', color: '#ee0000' },
    { name: 'Ganache',          level: 70, icon: '🍫', category: 'Tools', color: '#e4a663' },
    { name: 'Ethereum',         level: 72, icon: '💎', category: 'Tools', color: '#627eea' },
    { name: 'Machine Learning', level: 70, icon: '🤖', category: 'Tools', color: '#00d4ff' },
    { name: 'Blockchain',       level: 75, icon: '⛓️', category: 'Tools', color: '#f7931a' },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Programming', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Small delay so the section becomes visible first, then bars animate
          setTimeout(() => setBarsAnimated(true), 200);
        }
      },
      { threshold: 0.1 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => { if (skillsRef.current) observer.unobserve(skillsRef.current); };
  }, []);

  // Re-trigger bar animation when category changes
  useEffect(() => {
    if (isVisible) {
      setBarsAnimated(false);
      const t = setTimeout(() => setBarsAnimated(true), 100);
      return () => clearTimeout(t);
    }
  }, [activeCategory]);

  const getLevelLabel = (level: number) =>
    level >= 88 ? 'Expert'
    : level >= 77 ? 'Advanced'
    : level >= 65 ? 'Intermediate'
    : 'Familiar';

  return (
    <div className={`skills ${isVisible ? 'visible' : ''}`} ref={skillsRef}>
      <div className="skills-container">

        {/* ── Header ── */}
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="skills-subtitle">Technologies I work with</p>

        {/* ── Main layout: avatar | skills ── */}
        <div className="skills-layout">

          {/* ── Left: Avatar Panel ── */}
          <div className="skills-avatar-panel">
            <div className="avatar-frame">
              <img
                src="/image_my1.png"
                alt="Tushar Parihar"
                className="avatar-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="float-badge float-badge--top-left">⚛️ React</div>
              <div className="float-badge float-badge--top-right">⛓️ Blockchain</div>
              <div className="float-badge float-badge--bottom-left">🐧 Linux</div>
              <div className="float-badge float-badge--bottom-right">🤖 ML</div>
            </div>

            <div className="avatar-stats">
              <div className="avatar-stat">
                <span className="avatar-stat-num">18</span>
                <span className="avatar-stat-label">Skills</span>
              </div>
              <div className="avatar-stat-divider" />
              <div className="avatar-stat">
                <span className="avatar-stat-num">5+</span>
                <span className="avatar-stat-label">Certs</span>
              </div>
              <div className="avatar-stat-divider" />
              <div className="avatar-stat">
                <span className="avatar-stat-num">9.18</span>
                <span className="avatar-stat-label">CGPA</span>
              </div>
            </div>
          </div>

          {/* ── Right: Skills Panel ── */}
          <div className="skills-right">
            {/* Category filter */}
            <div className="category-filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills grid */}
            <div className="skills-grid">
              {filteredSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`skill-card ${hoveredSkill === skill.name ? 'hovered' : ''}`}
                  style={{
                    animationDelay: `${index * 0.07}s`,
                    '--skill-color': skill.color,
                  } as React.CSSProperties}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="skill-glow" style={{ background: skill.color }} />

                  <div className="skill-top">
                    <span className="skill-icon">{skill.icon}</span>
                    <span
                      className="skill-level-badge"
                      style={{
                        color: skill.color,
                        borderColor: skill.color + '44',
                        background: skill.color + '15',
                      }}
                    >
                      {getLevelLabel(skill.level)}
                    </span>
                  </div>

                  <h3 className="skill-name">{skill.name}</h3>

                  {/* ── FIXED progress bar ── */}
                  <div className="skill-progress">
                    <div
                      className="skill-progress-bar"
                      style={{
                        width: barsAnimated ? `${skill.level}%` : '0%',
                        background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                        transition: `width 1.2s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.05}s`,
                      }}
                    />
                  </div>

                  <div className="skill-meta">
                    <span className="skill-category-tag">{skill.category}</span>
                    <span className="skill-pct" style={{ color: skill.color }}>{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Summary cards ── */}
        <div className="skills-summary">
          {[
            { icon: '💡', title: 'Problem Solving',  desc: 'Strong foundation in Data Structures & Algorithms', color: '#00d4ff' },
            { icon: '🚀', title: 'Full Stack Dev',   desc: 'End-to-end web application development',           color: '#a855f7' },
            { icon: '⛓️', title: 'Blockchain',        desc: 'Solidity, Ethereum, Ganache & dApp development',   color: '#f7931a' },
            { icon: '🐧', title: 'Linux & DevOps',   desc: 'Red Hat certified system administration',           color: '#ee0000' },
          ].map((s, i) => (
            <div
              key={s.title}
              className="summary-card"
              style={{ animationDelay: `${0.2 + i * 0.15}s`, '--sum-color': s.color } as React.CSSProperties}
            >
              <div
                className="summary-icon-wrap"
                style={{ background: s.color + '18', border: `1px solid ${s.color}33` }}
              >
                <span className="summary-icon">{s.icon}</span>
              </div>
              <h4 style={{ color: s.color }}>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;