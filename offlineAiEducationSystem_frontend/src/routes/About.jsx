import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './About.module.css';
import image from '../assets/image.png';
import tabitha from '../assets/Tabitha.jpg';
import ruth from '../assets/ruth.jpg';
import Margaret from '../assets/Margaret.jpg';

// Your team data
const teamData = [
  {
    id: 1,
    name: "Melvin Tabitha",
    role: "Frontend Dev",
    image: tabitha,
    linkedin: "https://www.linkedin.com/in/melvin-tabitha-5abb782a2/",
    github: "https://github.com/MelvinTabitha738"
  },
  {
    id: 2,
    name: "Margaret Wangui",
    role: "Backend Dev",
    image: Margaret,
    linkedin: "https://www.linkedin.com/in/wangui-margaret-1857762a7/",
    github: "https://github.com/margret255"
  },
  {
    id: 3,
    name: "Ruth Daniels",
    role: "Data Analyst",
    image: ruth,
    linkedin: "https://www.linkedin.com/in/ruthdaniel1705/",
    github: "https://github.com/Lenida-Daniels"
  },
  {
    id: 4,
    name: "Beautah Kip",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    github: "#"
  }
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Responsive slides calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const maxSlide = Math.max(0, teamData.length - slidesToShow);
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slidesToShow]);

  const nextSlide = () => {
    const maxSlide = Math.max(0, teamData.length - slidesToShow);
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const maxSlide = Math.max(0, teamData.length - slidesToShow);
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const maxSlide = Math.max(0, teamData.length - slidesToShow);

  return (
    <>
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <h2 className={styles.title}>About TechLearnAI</h2>
              <p className={styles.subtitle}>
                We believe every learner regardless of background or economic status, deserves access to quality, future-ready education in Artificial Intelligence.
              </p>
              <p className={styles.description}>
                TechLearnAI is a game-changing platform designed to promote equity by delivering effective digital learning experiences without relying on internet connectivity. Tailored for underserved and remote communities, it provides interactive offline content, curated AI curriculum, hands-on coding projects, and personalized mentorship. Beyond academics, we prioritize emotional well-being through integrated mental health support, empowering learners to grow both technically and personally. By bridging the digital and economic divide, we ensure no one is left behind in the global tech revolution.
              </p>
            </div>
            <div className={styles.imageContent}>
              <img 
                src={image} 
                alt="Three professional women walking together in a modern office environment"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>
      
      <div className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.heading}>
            We're on a mission to close the learning access gap for every learner.
          </h1>

          <p className={styles.firstParagraph}>
            TechLearnAI is built to help all learners no matter where they come from, get quality education. We provide full learning materials across different subjects, even without internet. Our offline system is designed to support students in remote or low-income areas by giving them the same chance to learn and grow.
          </p>

          <p className={styles.secondParagraph}>
            Our platform offers a wide range of learning materials, including subjects like mathematics, science, languages, and technology. All content is available offline, so students can continue learning without needing internet access. We provide personalized learning paths that adjust to each student's pace and ability, helping them understand better and feel more confident. With built-in progress tracking and clear learning analytics, students and teachers can easily monitor growth and areas that need more focus. Beyond academics, we care deeply about students' mental and emotional well-being. That's why we include tools and resources that support mental health, encouraging learners to stay motivated, focused, and emotionally strong. At TechLearnAI, we're building a learning experience that is complete, caring, and truly accessible to everyone.
          </p>
        </div>
      </div>

      {/* Modern Team Slider Section */}
      <div className={styles.teamSliderSection}>
        <div className={styles.teamSliderContainer}>
          {/* Header with digital glow effect */}
          <div className={styles.teamHeader}>
            <h2 className={styles.teamTitle}>Meet the Team</h2>
            <div className={styles.accentLine} />
          </div>

          {/* Slider Container */}
          <div 
            className={styles.sliderContainer}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className={`${styles.navButton} ${styles.prevButton} ${currentSlide === 0 ? styles.disabled : ''}`}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className={`${styles.navButton} ${styles.nextButton} ${currentSlide >= maxSlide ? styles.disabled : ''}`}
            >
              <ChevronRight size={24} />
            </button>

            {/* Slides */}
            <div 
              className={styles.slidesWrapper}
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
              }}
            >
              {teamData.map((member) => (
                <div
                  key={member.id}
                  className={styles.teamCard}
                  style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                >
                  {/* Animated background pattern */}
                  <div className={styles.cardAccent} />

                  {/* Image container with digital frame */}
                  <div className={styles.imageContainer}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className={styles.memberImage}
                    />
                    <div className={styles.glowRing} />
                  </div>

                  {/* Name with gradient */}
                  <h3 className={styles.memberName}>
                    {member.name}
                  </h3>

                  {/* Role with accent color */}
                  <p className={styles.memberRole}>
                    {member.role}
                  </p>

                  {/* Social Links */}
                  <div className={styles.socialLinks}>
                    <a
                      href={member.linkedin}
                      className={`${styles.socialLink} ${styles.linkedinLink}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    
                    <a
                      href={member.github}
                      className={`${styles.socialLink} ${styles.githubLink}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className={styles.dotsContainer}>
            {Array.from({ length: maxSlide + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className={styles.autoPlayIndicator}>
            <div className={`${styles.statusDot} ${isAutoPlaying ? styles.playing : styles.paused}`} />
            {isAutoPlaying ? 'Auto-playing' : 'Paused'}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;