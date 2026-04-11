import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Play, X } from 'lucide-react';
import '../styles/Projects.css';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink?: string;    // deployed URL → opens new tab
  videoUrl?: string;    // local video path like '/assets/edulocker-demo.mp4'
  category: string;
  image: string;
}

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'Edulocker',
      description:
        'A decentralized application (DApp) for tamper-proof academic document storage and verification using Ethereum, IPFS, Solidity, and React. Ensures document authenticity and eliminates fraud.',
      techStack: ['React', 'Ethereum', 'Solidity', 'IPFS'],
      githubLink: 'https://github.com/Tusharparihar05/edulocker',
      videoUrl: '/assets/edulocker-demo.mp4',   // ← put edulocker-demo.mp4 in public/assets/
      category: 'Blockchain',
      image: '/assets/edulocker.svg',
       liveLink: 'https://tusharedulocker.vercel.app/'
    },
    {
      title: 'Land Registry Web3',
      description:
        "A decentralized land registry system built on Polygon blockchain, inspired by IBM's Ghana blockchain land registry project. Eliminates paper-based title deeds, fraud, and slow verification by recording land ownership permanently on-chain with IPFS and IBM Watson integration.",
      techStack: ['React', 'Polygon', 'Solidity', 'Web3.js', 'IPFS'],
      githubLink: 'https://github.com/Tusharparihar05/land-registry-web3',
       // ← put land-registry-demo.mp4 in public/assets/
      category: 'Blockchain',
      image: '/assets/land-registry.svg',
    },
    {
      title: 'Hospital Blockchain',
      description:
        'Blockchain-based hospital management system with secure patient records and appointment tokens. Ensures data privacy and seamless healthcare management using smart contracts.',
      techStack: ['React', 'Ethereum', 'Solidity', 'Node.js'],
      githubLink: 'https://github.com/Tusharparihar05/hospital-blockchain-project',
       // ← put hospital-demo.mp4 in public/assets/
      category: 'Blockchain',
      image: '/assets/hospital.svg',
    },
    {
      title: 'LMS System',
      description:
        'A role-based Learning Management System with an Academic Performance Evaluator. Manages students, courses, quizzes, and study materials. Offers admin, faculty, and student dashboards with automated grading and performance analytics.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
      githubLink: 'https://github.com/sarthakpdt/LMS-System-Minor-Project',
        videoUrl: '/assets/lms.mp4',
      category: 'Full Stack',
      image: '/assets/lms.svg',
    },
   
  ];

  const categories = ['All', 'Blockchain', 'Full Stack'];

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

  return (
    <>
      <div className={`projects ${isVisible ? 'visible' : ''}`} ref={projectsRef}>
        <div className="projects-container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Building innovative solutions with cutting-edge technologies
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
                style={{ animationDelay: `${index * 0.08}s` }}
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
                  </div>

                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-category">{project.category}</span>
                  </div>

                  <p className="project-description">{project.description}</p>

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
                      <Github size={18} />
                      <span>View Code</span>
                    </a>

                    {/* Video demo — plays local mp4 in modal */}
                    {project.videoUrl && (
                      <button
                        className="project-link project-link-btn"
                        onClick={() => setVideoModal(project.videoUrl!)}
                      >
                        <Play size={18} />
                        <span>Watch Demo</span>
                      </button>
                    )}

                    {/* Live deployed link — opens new tab */}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
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