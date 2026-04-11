import { useEffect, useRef, useState } from 'react';
import '../styles/About.css';

const images = [
  { src: '/my_photo.jpeg',   label: 'Udaipur, Rajasthan' },
  { src: '/assets/image1.png', label: 'Illustrated · Lake Palace' },
  { src: '/image_my.png',    label: 'Night Mode ' },
  { src: '/assets/image2.png', label: 'Coder · Lake Palace' },
];

function About() {
  const [isVisible, setIsVisible]   = useState(false);
  const [current,   setCurrent]     = useState(0);
  const [prev,      setPrev]        = useState<number | null>(null);
  const [fading,    setFading]      = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => { if (aboutRef.current) observer.unobserve(aboutRef.current); };
  }, []);

  /* ── Auto-cycle every 3.5 s ── */
  const goTo = (next: number) => {
    if (fading) return;
    setPrev(current);
    setFading(true);
    setTimeout(() => {
      setCurrent(next);
      setPrev(null);
      setFading(false);
    }, 700); // matches CSS transition
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % images.length);
    }, 3500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, fading]);

  const handleDot = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    goTo(i);
  };

  return (
    <div className={`about ${isVisible ? 'visible' : ''}`} ref={aboutRef}>
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">

          {/* ── Slideshow ── */}
          <div className="about-image">
            <div className="slideshow-wrapper">

              {/* outgoing image fades out */}
              {prev !== null && (
                <img
                  key={`prev-${prev}`}
                  src={images[prev].src}
                  alt="Tushar Parihar"
                  className="slide slide--out"
                />
              )}

              {/* current image fades in */}
              <img
                key={`cur-${current}`}
                src={images[current].src}
                alt="Tushar Parihar"
                className={`slide slide--in ${fading ? 'slide--in-start' : ''}`}
              />

              {/* accent border that morphs */}
              <div className="image-border" />

              {/* caption pill */}
              <div className="slide-caption">{images[current].label}</div>

              {/* dot indicators */}
              <div className="slide-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`slide-dot ${i === current ? 'active' : ''}`}
                    onClick={() => handleDot(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Text ── */}
          <div className="about-text">
            <h3>Hello! I'm Tushar Parihar</h3>
            <p className="about-bio">
              A passionate 3rd-year B.Tech Computer Science student at JK Lakshmipat University, Jaipur.
              With a strong CGPA of 9.180, I'm deeply interested in problem-solving, data-driven systems,
              and building scalable software solutions.
            </p>

            <div className="about-details">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Jaipur, Rajasthan</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🎓</span>
                <div>
                  <h4>Education</h4>
                  <p>B.Tech in Computer Science</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💼</span>
                <div>
                  <h4>Current Role</h4>
                  <p>Teaching Assistant</p>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🎯</span>
                <div>
                  <h4>GATE 2026</h4>
                  <p>Score 460 · AIR 10929</p>
                </div>
              </div>
            </div>

            <p className="about-passion">
              I specialize in building practical solutions through projects involving blockchain technology,
              full-stack web development, and machine learning. My experience includes developing decentralized
              applications like Edulocker, land registry systems, and college LMS platforms. I'm constantly
              learning and seeking opportunities to contribute and grow as a Software Development Engineer.
            </p>

            <div className="about-stats">
              <div className="stat-card">
                <h3>9.180</h3>
                <p>CGPA</p>
              </div>
              <div className="stat-card">
                <h3>4+</h3>
                <p>Projects</p>
              </div>
              <div className="stat-card">
                <h3>460</h3>
                <p>GATE Score</p>
              </div>
              <div className="stat-card">
                <h3>15+</h3>
                <p>Technologies</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;