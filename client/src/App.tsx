import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';
import './styles/App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-logo">Tushar Parihar</div>
        <ul className="nav-links">
          <li className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</li>
          <li className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</li>
          <li className={activeSection === 'skills' ? 'active' : ''} onClick={() => scrollToSection('skills')}>Skills</li>
          <li className={activeSection === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</li>
          <li className={activeSection === 'experience' ? 'active' : ''} onClick={() => scrollToSection('experience')}>Experience</li>
          <li className={activeSection === 'hobbies' ? 'active' : ''} onClick={() => scrollToSection('hobbies')}>Hobbies</li>
          <li className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>

      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <section id="hobbies"><Hobbies /></section>
        <section id="contact"><Contact /></section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Tushar Parihar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
