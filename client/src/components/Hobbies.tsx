import { useEffect, useRef, useState } from 'react';
import '../styles/Hobbies.css';

interface Hobby {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  images: { src: string; caption: string }[];
  videos?: { src: string; caption: string }[];
  tags: string[];
}

const hobbies: Hobby[] = [
  {
    id: 'cricket',
    emoji: '🏏',
    title: 'Cricket',
    subtitle: 'Bat. Ball. Passion.',
    description:
      'Cricket is more than a game for me — it\'s where I unwind, strategise, and compete. Whether it\'s a weekend match with friends or watching a live Test, the sport keeps me grounded and energised.',
    color: '#22c55e',
    images: [
      { src: '/hobbies/cricket_1.jpg', caption: 'Weekend match' },
      { src: '/hobbies/cricket_2.jpeg', caption: 'With the squad' },
    ],
    tags: ['Team sport', 'Strategy', 'Weekend warrior'],
  },
  {
    id: 'sports',
    emoji: '⚽',
    title: 'Sports & Fitness',
    subtitle: 'Stay active, stay sharp.',
    description:
      'Beyond cricket I enjoy football, badminton, and the occasional run. Staying physically active directly fuels my focus and productivity at the desk.',
    color: '#f59e0b',
    images: [
      { src: '/hobbies/sports_1.jpg', caption: 'Football with friends' },
      { src: '/hobbies/sports_2.jpeg', caption: 'Badminton evening' },
    ],
    tags: ['Football', 'Badminton', 'Running'],
  },
  {
    id: 'travel',
    emoji: '✈️',
    title: 'Travelling',
    subtitle: 'Every road is a new story.',
    description:
      'Exploring new cities, cultures, and landscapes resets my perspective. From the ghats of Rajasthan to mountain highways, every trip teaches me something a textbook never could.',
    color: '#00d4ff',
    images: [
      { src: '/hobbies/my_photo.jpeg', caption: 'FatehSagar Lake' },
      { src: '/hobbies/travel_2.jpeg', caption: 'On the road' },
    ],
    videos: [
      { src: '/hobbies/travel_video.mp4', caption: 'Road trip vibes 🎥' },
    ],
    tags: ['Road trips', 'Culture', 'Adventure'],
  },
  {
    id: 'movies',
    emoji: '🎬',
    title: 'Movies & Web Series',
    subtitle: 'Lights, camera, binge.',
    description:
      'I love getting lost in a great story — from sci-fi thrillers to Bollywood blockbusters. Movies inspire my creative thinking and give me fresh ideas to bring into my projects.',
    color: '#a855f7',
    images: [
      { src: '/hobbies/movies_1.jpg', caption: 'Movie night setup' },
      { src: '/hobbies/movies_2.jpg', caption: 'Chill evening' },
    ],
    tags: ['Sci-fi', 'Thriller', 'Bollywood'],
  },
  {
    id: 'friends',
    emoji: '👥',
    title: 'Friends & Hangouts',
    subtitle: 'Better together.',
    description:
      'Time with friends is non-negotiable. Whether it\'s late-night chai sessions, game nights, or just chilling at someone\'s place — these moments are what make life worth living.',
    color: '#f43f5e',
    images: [
      { src: '/hobbies/friends_1.jpg', caption: 'Squad time' },
      { src: '/hobbies/friends_2.jpg', caption: 'Chai & laughs' },
    ],
    videos: [
      { src: '/hobbies/friends_video.mp4', caption: 'Good times 🎥' },
    ],
    tags: ['Game nights', 'Chai sessions', 'Road trips'],
  },
];

function Hobbies() {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive]       = useState<string>(hobbies[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const activeHobby = hobbies.find(h => h.id === active)!;

  return (
    <div className={`hobbies ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      {/* animated background blobs */}
      <div className="hobbies-blob hobbies-blob--1" style={{ background: activeHobby.color }} />
      <div className="hobbies-blob hobbies-blob--2" style={{ background: activeHobby.color }} />

      <div className="hobbies-container">
        <h2 className="section-title">Hobbies & Interests</h2>
        <p className="hobbies-subtitle">Life beyond the screen</p>

        {/* ── Hobby pill tabs ── */}
        <div className="hobby-tabs">
          {hobbies.map((h, i) => (
            <button
              key={h.id}
              className={`hobby-tab ${active === h.id ? 'active' : ''}`}
              style={{
                '--tab-color': h.color,
                animationDelay: `${i * 0.1}s`,
              } as React.CSSProperties}
              onClick={() => setActive(h.id)}
            >
              <span className="hobby-tab-emoji">{h.emoji}</span>
              <span className="hobby-tab-label">{h.title}</span>
            </button>
          ))}
        </div>

        {/* ── Active hobby detail ── */}
        <div className="hobby-detail" key={active}>
          {/* Left: info */}
          <div className="hobby-info">
            <div className="hobby-header">
              <div
                className="hobby-big-emoji"
                style={{ background: activeHobby.color + '22', border: `2px solid ${activeHobby.color}44` }}
              >
                {activeHobby.emoji}
              </div>
              <div>
                <h3 className="hobby-title" style={{ color: activeHobby.color }}>{activeHobby.title}</h3>
                <p className="hobby-subtitle-text">{activeHobby.subtitle}</p>
              </div>
            </div>

            <p className="hobby-desc">{activeHobby.description}</p>

            <div className="hobby-tags">
              {activeHobby.tags.map(t => (
                <span
                  key={t}
                  className="hobby-tag"
                  style={{ background: activeHobby.color + '18', color: activeHobby.color, borderColor: activeHobby.color + '44' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* fun stat strip */}
            <div className="hobby-stat-strip" style={{ borderColor: activeHobby.color + '33' }}>
              <div className="hobby-stat">
                <span className="hobby-stat-num" style={{ color: activeHobby.color }}>∞</span>
                <span className="hobby-stat-label">Memories</span>
              </div>
              <div className="hobby-stat-div" style={{ background: activeHobby.color + '33' }} />
              <div className="hobby-stat">
                <span className="hobby-stat-num" style={{ color: activeHobby.color }}>100%</span>
                <span className="hobby-stat-label">Passion</span>
              </div>
              <div className="hobby-stat-div" style={{ background: activeHobby.color + '33' }} />
              <div className="hobby-stat">
                <span className="hobby-stat-num" style={{ color: activeHobby.color }}>Always</span>
                <span className="hobby-stat-label">Mood</span>
              </div>
            </div>
          </div>

          {/* Right: image + video grid */}
          <div className="hobby-images">
            {/* Images */}
            {activeHobby.images.map((img, i) => (
              <div
                key={i}
                className="hobby-img-card"
                style={{ animationDelay: `${i * 0.15}s`, '--img-color': activeHobby.color } as React.CSSProperties}
              >
                <div className="hobby-img-wrap">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="hobby-img"
                    onError={e => {
                      const t = e.currentTarget as HTMLImageElement;
                      t.style.display = 'none';
                      const parent = t.parentElement!;
                      parent.classList.add('hobby-img-placeholder');
                      parent.setAttribute('data-emoji', activeHobby.emoji);
                    }}
                  />
                  <div className="hobby-img-overlay" style={{ background: `linear-gradient(to top, ${activeHobby.color}cc, transparent)` }} />
                </div>
                <p className="hobby-img-caption">{img.caption}</p>
              </div>
            ))}

            {/* Videos */}
            {activeHobby.videos && activeHobby.videos.map((vid, i) => (
              <div
                key={`vid-${i}`}
                className="hobby-img-card"
                style={{ animationDelay: `${(activeHobby.images.length + i) * 0.15}s`, '--img-color': activeHobby.color } as React.CSSProperties}
              >
                <div className="hobby-img-wrap hobby-video-wrap">
                  <video
                    src={vid.src}
                    className="hobby-img"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="hobby-img-overlay" style={{ background: `linear-gradient(to top, ${activeHobby.color}cc, transparent)` }} />
                  <div className="hobby-video-badge" style={{ background: activeHobby.color }}>
                    ▶ Video
                  </div>
                </div>
                <p className="hobby-img-caption">{vid.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom interest chips ── */}
        <div className="interest-chips">
          {[
            { icon: '🏏', label: 'Cricket' },
            { icon: '🎬', label: 'Movies' },
            { icon: '✈️', label: 'Travel' },
            { icon: '👥', label: 'Friends' },
            { icon: '⚽', label: 'Football' },
            { icon: '🏸', label: 'Badminton' },
            { icon: '🍿', label: 'Web Series' },
            { icon: '🚗', label: 'Road Trips' },
            { icon: '☕', label: 'Chai Time' },
            { icon: '🎮', label: 'Gaming' },
          ].map((chip, i) => (
            <div key={chip.label} className="interest-chip" style={{ animationDelay: `${i * 0.06}s` }}>
              <span>{chip.icon}</span> {chip.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hobbies;