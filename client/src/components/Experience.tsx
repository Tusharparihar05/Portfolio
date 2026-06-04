import { useEffect, useRef, useState, useCallback } from 'react';
import { GraduationCap, Briefcase, Award, X, ExternalLink, ChevronRight } from 'lucide-react';
import '../styles/Experience.css';

interface TimelineItem {
  type: 'education' | 'experience' | 'achievement';
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string[];
  icon: 'education' | 'experience' | 'achievement';
}

interface CertificationCard {
  id: string;
  emoji: string;
  avatar: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  color: string;
  fileType: 'pdf' | 'image';
  filePath: string;
  verifyUrl?: string;
}

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<CertificationCard | null>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const timeline: TimelineItem[] = [
    {
      type: 'education',
      title: 'Bachelor of Technology in Computer Science',
      organization: 'JK Lakshmipat University',
      location: 'Jaipur, Rajasthan',
      date: 'Expected 07/2027',
      description: [
        'CGPA: 9.180 (Honours List)',
        'Favourite Subjects: Data Structures, Algorithms, and Blockchain',
       
      ],
      icon: 'education'
    },
    {
      type: 'experience',
      title: 'Teaching Assistant',
      organization: 'JK Lakshmipat University',
      location: 'Jaipur, Rajasthan',
      date: '01/26 - 05/26',
      description: [
        'Provide support in design and analysis of algorithms course',
        'Evaluate student performance and provide constructive feedback',
        'Foster a collaborative learning environment'
      ],
      icon: 'experience'
    },
    {
      type: 'education',
      title: '12th Science',
      organization: 'Shivprakash Memorial School',
      location: 'Silvassa',
      date: '05/2023',
      description: [
        'Percentage: 73%',
        'Strong foundation in Mathematics, Physics, and Computer Science'
      ],
      icon: 'education'
    },
    {
      type: 'achievement',
      title: 'GATE 2026 Qualified',
      organization: 'IIT Guwahati / NCB-GATE',
      location: 'All India',
      date: 'Feb 2026',
      description: [
        'GATE Score: 460 | AIR: 10929 in CS & IT',
        'Marks: 39.37 / 100 out of 211,020 candidates',
        'Score Card valid up to 31st March 2029'
      ],
      icon: 'achievement'
    }
  ];

  // Certification cards — update filePath to match your public/ folder paths
  const certifications: CertificationCard[] = [
    {
      id: 'java-prog',
      emoji: '☕',
      avatar: 'java',
      title: 'Programming using Java',
      issuer: 'Infosys Springboard',
      date: 'Sep 2025',
      badge: 'Course Completion',
      color: '#f89820',
      fileType: 'pdf',
      filePath: '/java_certification_1.pdf',
    },
    {
      id: 'java-found',
      emoji: '🏅',
      avatar: 'java2',
      title: 'Java Foundation Certification',
      issuer: 'Infosys Springboard',
      date: 'Oct 2025',
      badge: 'Achievement',
      color: '#0077b6',
      fileType: 'pdf',
      filePath: '/java_certification_2.pdf',
    },
    {
      id: 'redhat',
      emoji: '🐧',
      avatar: 'linux',
      title: 'Red Hat System Administration I',
      issuer: 'Red Hat Academy',
      date: 'Apr 2025',
      badge: 'RH124 · Ver 9.3',
      color: '#ee0000',
      fileType: 'pdf',
      filePath: '/RedHatSystemAdministrationIRH124-RHA-Ver.9.3_Badge20250419-27-7z3x0f.pdf',
      verifyUrl: 'https://www.credly.com/go/tztAakDN',
    },
    {
      id: 'gate',
      emoji: '🎓',
      avatar: 'gate',
      title: 'GATE 2026 Score Card',
      issuer: 'IIT Guwahati · NCB-GATE',
      date: 'Feb 2026',
      badge: 'AIR 10929 · Score 460',
      color: '#7c3aed',
      fileType: 'pdf',
      filePath: '/Tushar_ScoreCard.pdf',
    },
    {
      id: 'leetcode-50',
      emoji: '🔥',
      avatar: 'leetcode',
      title: 'LeetCode 50 Days Badge 2026',
      issuer: 'LeetCode',
      date: '2026',
      badge: '50+ Days Streak',
      color: '#ffa116',
      fileType: 'image',
      filePath: '/50 days Batch.png',
    },
    {
      id: 'leetcode-dcc',
      emoji: '📅',
      avatar: 'dcc',
      title: 'Daily Coding Challenge — March 2026',
      issuer: 'LeetCode',
      date: 'Mar 2026',
      badge: 'DCC March',
      color: '#22c55e',
      fileType: 'image',
      filePath: '/March DCC.png',
    },
    {
      id: 'leetcode-dcc-apr',
      emoji: '📅',
      avatar: 'dcc',
      title: 'Daily Coding Challenge — April 2026',
      issuer: 'LeetCode',
      date: 'Apr 2026',
      badge: 'DCC April',
      color: '#3b82f6',
      fileType: 'image',
      filePath: '/April DCC.png',
    },
    {
      id: 'leetcode-dcc-may',
      emoji: '📅',
      avatar: 'dcc',
      title: 'Daily Coding Challenge — May 2026',
      issuer: 'LeetCode',
      date: 'May 2026',
      badge: 'DCC May',
      color: '#f59e0b',
      fileType: 'image',
      filePath: '/May DCC.png',
    },
    {
      id: 'leetcode-100',
      emoji: '💯',
      avatar: 'leetcode',
      title: 'LeetCode 100 Days Badge 2026',
      issuer: 'LeetCode',
      date: '2026',
      badge: '100+ Days Streak',
      color: '#ef4444',
      fileType: 'image',
      filePath: '/100 days Batch.png',
    },
  ];

  // Section visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (experienceRef.current) observer.observe(experienceRef.current);
    return () => { if (experienceRef.current) observer.unobserve(experienceRef.current); };
  }, []);

  // Progressive timeline scroll tracking
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    const updateProgress = () => {
      const rect = tl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // How far the user has scrolled through the timeline
      const scrolled = viewportHeight - rect.top;
      const total = rect.height;
      const progress = Math.min(Math.max(scrolled / total, 0), 1) * 100;
      tl.style.setProperty('--timeline-progress', `${progress}%`);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress(); // initial
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // Per-item reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    timelineItemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const openModal = (cert: CertificationCard) => {
    setActiveCert(cert);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveCert(null), 300);
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'education': return <GraduationCap size={22} />;
      case 'experience': return <Briefcase size={22} />;
      case 'achievement': return <Award size={22} />;
      default: return <GraduationCap size={22} />;
    }
  };

  // SVG Avatars for each cert type
  const getAvatar = (type: string, color: string) => {
    switch (type) {
      case 'java':
      case 'java2':
        return (
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="cert-avatar-svg">
            <circle cx="40" cy="40" r="38" fill={color + '22'} stroke={color} strokeWidth="2"/>
            <text x="40" y="28" textAnchor="middle" fontSize="11" fill={color} fontWeight="700" fontFamily="monospace">INFOSYS</text>
            <rect x="20" y="33" width="40" height="3" rx="1.5" fill={color + '55'}/>
            <text x="40" y="52" textAnchor="middle" fontSize="22" fill={color}>☕</text>
            <text x="40" y="66" textAnchor="middle" fontSize="9" fill={color + 'cc'} fontFamily="monospace">SPRINGBOARD</text>
          </svg>
        );
      case 'linux':
        return (
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="cert-avatar-svg">
            <circle cx="40" cy="40" r="38" fill="#ee000015" stroke="#ee0000" strokeWidth="2"/>
            {/* Fedora-hat shape */}
            <ellipse cx="40" cy="55" rx="22" ry="6" fill="#ee0000" opacity="0.7"/>
            <ellipse cx="40" cy="49" rx="14" ry="12" fill="#cc0000"/>
            {/* Red Hat logo circle */}
            <circle cx="40" cy="46" r="9" fill="#ee0000"/>
            <text x="40" y="50" textAnchor="middle" fontSize="10" fill="white" fontWeight="900">RH</text>
            <text x="40" y="70" textAnchor="middle" fontSize="8" fill="#ee0000cc" fontFamily="monospace">RED HAT</text>
          </svg>
        );
      case 'gate':
        return (
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="cert-avatar-svg">
            <circle cx="40" cy="40" r="38" fill="#7c3aed15" stroke="#7c3aed" strokeWidth="2"/>
            {/* Graduation cap */}
            <polygon points="40,18 62,28 40,38 18,28" fill="#7c3aed" opacity="0.9"/>
            <rect x="56" y="28" width="3" height="14" rx="1.5" fill="#7c3aed"/>
            <ellipse cx="57.5" cy="43" rx="4" ry="3" fill="#a78bfa"/>
            <rect x="34" y="38" width="12" height="10" rx="2" fill="#7c3aed" opacity="0.7"/>
            <text x="40" y="64" textAnchor="middle" fontSize="9" fill="#a78bfa" fontWeight="700" fontFamily="monospace">GATE 2026</text>
            <text x="40" y="73" textAnchor="middle" fontSize="7.5" fill="#7c3aedaa" fontFamily="monospace">IIT GUWAHATI</text>
          </svg>
        );
      case 'leetcode':
        return (
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="cert-avatar-svg">
            <circle cx="40" cy="40" r="38" fill={color + '15'} stroke={color} strokeWidth="2"/>
            {/* Flame */}
            <path d="M40 20 C36 28 30 32 32 42 C34 50 40 54 40 54 C40 54 46 50 48 42 C50 32 44 28 40 20Z" fill={color} opacity="0.9"/>
            <path d="M40 32 C38 36 36 38 37 43 C38 47 40 49 40 49 C40 49 42 47 43 43 C44 38 42 36 40 32Z" fill="#fff" opacity="0.5"/>
            <text x="40" y="67" textAnchor="middle" fontSize="9" fill={color} fontWeight="700" fontFamily="monospace">LEETCODE</text>
            <text x="40" y="76" textAnchor="middle" fontSize="7.5" fill={color + 'aa'} fontFamily="monospace">STREAK 🔥</text>
          </svg>
        );
      case 'dcc':
        return (
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="cert-avatar-svg">
            <circle cx="40" cy="40" r="38" fill={color + '15'} stroke={color} strokeWidth="2"/>
            {/* Hexagon badge */}
            <polygon points="40,20 55,29 55,47 40,56 25,47 25,29" fill={color} opacity="0.8"/>
            <polygon points="40,25 51,31 51,45 40,51 29,45 29,31" fill={color} opacity="0.35"/>
            <text x="40" y="38" textAnchor="middle" fontSize="8" fill="white" fontWeight="700" fontFamily="monospace">DCC</text>
            <text x="40" y="48" textAnchor="middle" fontSize="7" fill="white" opacity="0.85" fontFamily="monospace">2026</text>
            <text x="40" y="68" textAnchor="middle" fontSize="8" fill={color} fontWeight="700" fontFamily="monospace">LEETCODE</text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="cert-avatar-svg">
            <circle cx="40" cy="40" r="38" fill={color + '22'} stroke={color} strokeWidth="2"/>
            <text x="40" y="48" textAnchor="middle" fontSize="32">🏆</text>
          </svg>
        );
    }
  };

  return (
    <div className={`experience ${isVisible ? 'visible' : ''}`} ref={experienceRef}>
      <div className="experience-container">
        <h2 className="section-title">Education & Experience</h2>
        <p className="experience-subtitle">My journey so far</p>

        <div className="timeline" ref={timelineRef}>
          {timeline.map((item, index) => (
            <div
              key={index}
              ref={(el) => { timelineItemsRef.current[index] = el; }}
              className={`timeline-item ${item.type}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-icon">{getIcon(item.icon)}</div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-title">{item.title}</h3>
                  <span className="timeline-date">{item.date}</span>
                </div>
                <div className="timeline-organization">
                  <strong>{item.organization}</strong>
                  <span className="timeline-location">{item.location}</span>
                </div>
                <ul className="timeline-description">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ── Certifications Grid ── */}
        <div className="certifications">
          <h3 className="certifications-title">Certifications & Achievements</h3>
          <p className="certifications-sub">Click any card to view the certificate</p>

          <div className="certifications-grid">
            {certifications.map((cert, i) => (
              <button
                key={cert.id}
                className="certification-card"
                style={{ animationDelay: `${i * 0.1}s`, '--cert-color': cert.color } as React.CSSProperties}
                onClick={() => openModal(cert)}
                aria-label={`View ${cert.title} certificate`}
              >
                {/* Glow blob */}
                <div className="cert-glow" style={{ background: cert.color }} />

                {/* Avatar */}
                <div className="cert-avatar">
                  {getAvatar(cert.avatar, cert.color)}
                </div>

                <div className="cert-body">
                  <div className="cert-badge" style={{ background: cert.color + '22', color: cert.color, borderColor: cert.color + '55' }}>
                    {cert.badge}
                  </div>
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-date">{cert.date}</p>
                </div>

                <div className="cert-cta" style={{ color: cert.color }}>
                  <span>View Certificate</span>
                  <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {modalOpen && activeCert && (
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div className="cert-modal" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="cert-modal-header" style={{ borderBottom: `2px solid ${activeCert.color}33` }}>
              <div className="cert-modal-title-group">
                <div className="cert-modal-avatar">
                  {getAvatar(activeCert.avatar, activeCert.color)}
                </div>
                <div>
                  <h3 style={{ color: activeCert.color }}>{activeCert.title}</h3>
                  <p>{activeCert.issuer} · {activeCert.date}</p>
                </div>
              </div>
              <div className="cert-modal-actions">
                {activeCert.verifyUrl && (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-btn"
                    style={{ borderColor: activeCert.color, color: activeCert.color }}
                  >
                    <ExternalLink size={14} /> Verify
                  </a>
                )}
                <button className="cert-modal-close" onClick={closeModal} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="cert-modal-body">
              {activeCert.fileType === 'pdf' ? (
                <iframe
                  src={activeCert.filePath}
                  title={activeCert.title}
                  className="cert-iframe"
                />
              ) : (
                <img
                  src={activeCert.filePath}
                  alt={activeCert.title}
                  className="cert-img"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Experience;