import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Play, X, Zap, Shield, Brain, Database } from 'lucide-react';
import '../styles/Projects.css';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink?: string;
  videoUrl?: string;
  demoLink?: string;    // external demo link (e.g. LinkedIn post) — opens new tab
  category: string;
  image: string;
  status?: 'deployed' | 'academic';
  highlights?: string[];
}

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'MediChain — Blockchain Healthcare',
      description:
        'A full-stack decentralized healthcare platform combining Web2 infrastructure with Ethereum blockchain. Features tamper-proof medical records with keccak256 hash anchoring, ERC-721 appointment NFTs, AI-powered report analysis using Groq LLaMA 3.3 70B in 20+ languages, real-time patient queue management, Razorpay/UPI payments, emergency SOS with GPS, and doctor license verification via NMC/ABDM HPR sandbox.',
      techStack: ['React', 'Ethereum', 'Solidity', 'Node.js', 'MongoDB', 'Hardhat', 'IPFS', 'Groq AI', 'Razorpay'],
      githubLink: 'https://github.com/Tusharparihar05/hospital-blockchain-project',
      liveLink: 'https://hospital-blockchain-project.vercel.app/',
      demoLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7466854006531846144/',
      category: 'Blockchain',
      image: '/assets/hospital.svg',
      status: 'deployed',
      highlights: ['4 Smart Contracts', 'ERC-721 NFTs', 'AI Report Analysis', 'Live on Vercel'],
    },
    {
      title: 'VidyaBot — AI Learning Portal',
      description:
        'An AI-powered concept learning portal for students from Class 9 to BTech CSE. Ask any question and instantly receive three parallel outputs: Markdown explanation with KaTeX math and Chart.js visualizations, custom HTML5 Canvas whiteboard animations with zone-based no-overlap layout, and HeyGen AI avatar videos with lip-synced voice. Built with NVIDIA NIM (LLaMA 2 70B), three-layer Redis → MongoDB caching, per-user rate limiting, and Manim video rendering via a Python/FastAPI microservice.',
      techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'NVIDIA NIM', 'Docker', 'FastAPI', 'Manim'],
      githubLink: 'https://github.com/Tusharparihar05/VidyaBot-AI-Powered-Concept-Learning-Portal',
      demoLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7466376431300706304/',
      category: 'AI & Full Stack',
      image: '/assets/vidhya_bot.png',
      status: 'academic',
      highlights: ['3 Output Formats', 'NVIDIA LLM', 'Canvas Animations', 'Docker Compose'],
    },
    {
      title: 'Blockchain Land Registry',
      description:
        'A decentralized land registry system built on Polygon blockchain. Features core modules: land registration with GPS + IPFS document hashing, smart contract escrow for instant atomic ownership transfers, immutable chain of title history, and on-chain dispute resolution. Integrates OpenStreetMap for location fetching and features a Marketplace with search functionality to find and list nearby lands.',
      techStack: ['React', 'Polygon', 'Solidity', 'Web3.js', 'IPFS', 'Hardhat', 'OpenStreetMap', 'OpenZeppelin'],
      githubLink: 'https://github.com/Tusharparihar05/land-registry-web3',
      category: 'Blockchain',
      image: '/assets/land-registry.svg',
      highlights: ['Marketplace & Search', 'Polygon Blockchain', 'OpenStreetMap', 'Smart Contract Escrow'],
    },
    {
      title: 'Edulocker',
      description:
        'A decentralized application (DApp) for tamper-proof academic document storage and verification using Ethereum, IPFS, Solidity, and React. Ensures document authenticity and eliminates fraud through on-chain hash anchoring and decentralized file storage.',
      techStack: ['React', 'Ethereum', 'Solidity', 'IPFS'],
      githubLink: 'https://github.com/Tusharparihar05/edulocker',
      videoUrl: '/assets/edulocker-demo.mp4',
      category: 'Blockchain',
      image: '/assets/edulocker.svg',
      liveLink: 'https://tusharedulocker.vercel.app/',
      status: 'deployed',
      highlights: ['On-chain Hashing', 'IPFS Storage', 'Deployed on Vercel'],
    },
    {
      title: 'LMS System',
      description:
        'A role-based Learning Management System with an Academic Performance Evaluator. Manages students, courses, quizzes, and study materials. Offers admin, faculty, and student dashboards with automated grading, performance analytics, and comprehensive course management.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
      githubLink: 'https://github.com/sarthakpdt/LMS-System-Minor-Project',
      videoUrl: '/assets/lms.mp4',
      category: 'Full Stack',
      image: '/assets/lms.svg',
      status: 'academic',
      highlights: ['Role-Based Access', 'Auto Grading', 'Performance Analytics'],
    },
  ];

  const categories = ['All', 'Blockchain', 'Full Stack', 'AI & Full Stack'];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (projectsRef.current) observer.observe(projectsRef.current);
    return () => {
      if (projectsRef.current) observer.unobserve(projectsRef.current);
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoModal(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const getInitials = (title: string) =>
    title
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const getHighlightIcon = (highlight: string) => {
    const lower = highlight.toLowerCase();
    if (lower.includes('smart contract') || lower.includes('blockchain') || lower.includes('polygon'))
      return <Shield size={12} />;
    if (lower.includes('ai') || lower.includes('llm') || lower.includes('nvidia') || lower.includes('canvas'))
      return <Brain size={12} />;
    if (lower.includes('docker') || lower.includes('redis') || lower.includes('mongodb') || lower.includes('ipfs'))
      return <Database size={12} />;
    return <Zap size={12} />;
  };

  return (
    <>
      <div className={`projects ${isVisible ? 'visible' : ''}`} ref={projectsRef}>
        <div className="projects-container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Engineering innovative solutions with blockchain, AI, and full-stack technologies — each project built to solve real-world problems
          </p>

          <div className="project-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-card-inner">
                  <div
                    className="project-image-wrapper"
                    data-initials={getInitials(project.title)}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="project-image"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        img.parentElement?.classList.add('no-image');
                      }}
                    />
                    {project.status && (
                      <span className={`project-status-badge ${project.status}`}>
                        {project.status === 'deployed' ? '● Live' : '◆ Academic'}
                      </span>
                    )}
                  </div>

                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-category">{project.category}</span>
                  </div>

                  <p className="project-description">{project.description}</p>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="project-highlights">
                      {project.highlights.map((highlight) => (
                        <span key={highlight} className="project-highlight">
                          {getHighlightIcon(highlight)}
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-tech">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    {/* GitHub — always shown */}
                    <a
                      href={project.githubLink}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>

                    {/* Video demo — plays local mp4 in modal */}
                    {project.videoUrl && (
                      <button
                        className="project-link project-link-btn"
                        onClick={() => setVideoModal(project.videoUrl!)}
                      >
                        <Play size={16} />
                        <span>Demo</span>
                      </button>
                    )}

                    {/* External demo link — opens in new tab (e.g. LinkedIn post) */}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        className="project-link project-link-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play size={16} />
                        <span>Demo</span>
                      </a>
                    )}

                    {/* Live deployed link — opens new tab */}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        className="project-link live-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Video Modal — plays local mp4 file ── */}
      {videoModal && (
        <div className="video-modal-overlay" onClick={() => setVideoModal(null)}>
          <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal-close"
              onClick={() => setVideoModal(null)}
            >
              <X size={22} />
            </button>
            <video
              className="video-modal-player"
              src={videoModal}
              controls
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}

export default Projects;