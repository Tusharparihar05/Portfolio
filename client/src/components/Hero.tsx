import { useEffect, useState } from 'react';
import '../styles/Hero.css';
import { CV_PDF_URL, CV_DOCX_URL } from '../services/api';

function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showDropdown, setShowDropdown] = useState(false);

  const roles = [
    'Full Stack Developer',
    'MERN Stack Developer',
    'Blockchain Developer',
    'Problem Solver'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.cv-dropdown-wrapper')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="hero">
      <div className="hero-bg">
        <div className="floating-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <p className="greeting">Hello, I'm</p>
          <h1 className="name">Tushar Parihar</h1>
          <div className="typewriter-container">
            <span className="typewriter-text">{text}</span>
            <span className="cursor">|</span>
          </div>
          <p className="description">
            3rd-year B.Tech Computer Science student passionate about building
            scalable solutions and blockchain systems. Currently preparing for GATE 2027.
          </p>

          <div className="hero-buttons">
            {/* ── CV Download Dropdown ── */}
            <div className="cv-dropdown-wrapper">
              <button
                className="btn-primary"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Download Resume ▾
              </button>

              {showDropdown && (
                <div className="cv-dropdown">
                  <a
                    href={CV_PDF_URL}
                    download="Tushar_Parihar_Resume.pdf"
                    className="cv-dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <span className="cv-icon">📄</span>
                    <div>
                      <strong>PDF Format</strong>
                      <p>Best for viewing & printing</p>
                    </div>
                  </a>
                  <a
                    href={CV_DOCX_URL}
                    download="Tushar_Parihar_Resume.docx"
                    className="cv-dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <span className="cv-icon">📝</span>
                    <div>
                      <strong>Word Format</strong>
                      <p>Best for editing</p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <button
              className="btn-secondary"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>

        <div className="hero-avatar">
          <div className="avatar-container">
            <img src="/image_my.png" alt="Tushar Parihar" />
            <div className="avatar-glow"></div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll Down</p>
      </div>
    </div>
  );
}

export default Hero;