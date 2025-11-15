import React, { useEffect, useRef, useState } from 'react';

const Projects = () => {
  const sectionRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "MIDI Generator Platform",
      type: "Major Project",
      status: "Live",
      description: "Full-stack web application that transforms natural language descriptions into structured MIDI sequences using custom parsing algorithms and AI integration.",
      tech: ["React", "Spring Boot", "PostgreSQL", "RESTful APIs", "Gemini API", "Vite"],
      category: "Full Stack",
      link: "https://midi-generator-seven.vercel.app/",
      image: "🎹",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "LiriLab - Interactive Music Tools",
      type: "Major Project",
      status: "Live",
      description: "Interactive browser-based music learning platform featuring real-time audio processing, music theory lessons, and ear training exercises.",
      tech: ["React", "Tailwind CSS", "Tone.js", "Web Audio API"],
      category: "Frontend",
      link: "https://lyrilab.com/",
      image: "🎵",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        mousePos.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        };
        
        sectionRef.current.style.setProperty('--mouse-x', `${mousePos.current.x}%`);
        sectionRef.current.style.setProperty('--mouse-y', `${mousePos.current.y}%`);
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleProjectClick = (project) => {
    if (project.link && project.link !== "Link Coming Soon") {
      window.open(project.link, '_blank');
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-black py-20"
      style={{
        background: `
          radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(139, 69, 199, 0.2) 0%, 
            rgba(59, 130, 246, 0.15) 25%, 
            rgba(236, 72, 153, 0.15) 50%, 
            rgba(16, 185, 129, 0.1) 75%, 
            transparent 100%),
          linear-gradient(135deg, 
            #0a0a0a 0%, 
            #1a1a2e 25%, 
            #16213e 50%, 
            #0f3460 75%, 
            #000000 100%)
        `
      }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 25s linear infinite'
          }}
        ></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-sm animate-pulse"
            style={{
              width: `${Math.random() * 200 + 40}px`,
              height: `${Math.random() * 200 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['rgba(139, 69, 199, 0.2)', 'rgba(59, 130, 246, 0.2)', 'rgba(236, 72, 153, 0.2)', 'rgba(16, 185, 129, 0.2)'][Math.floor(Math.random() * 4)]
              } 0%, transparent 70%)`,
              animation: `float${i % 3} ${20 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-white/90 text-sm font-medium">My Recent Work</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-6">
            {'PROJECTS'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:translate-y-[-10px] cursor-pointer relative group"
                style={{
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)',
                  backgroundSize: '400% 400%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradientShift 3s ease infinite',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {letter}
              </span>
            ))}
          </h2>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences that blend creativity with functionality. 
            Each project represents a journey of innovation and problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 overflow-hidden ${
                project.link && project.link !== "Link Coming Soon" ? 'cursor-pointer' : ''
              }`}
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.2}s both`
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Project Icon & Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl mb-2">{project.image}</div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      project.status === 'Currently Developing' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-white/50 mt-1">{project.type}</span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all duration-300">
                  {project.title}
                </h3>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 border border-white/20">
                    {project.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 hover:bg-white/10 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  {project.link && project.link !== "Link Coming Soon" ? (
                    <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors duration-300">
                      <span>Visit Site</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-white/40 text-sm">Link Coming Soon</span>
                  )}
                </div>

                {/* Hover Effect Particles */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '1s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Backend & AI Disclaimer Section */}
        <div className="max-w-4xl mx-auto">
          {/* Backend Capability */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl border border-white/10 p-8 mb-8">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
              <h3 className="text-xl font-bold text-white">Full-Stack Ready</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              While these projects showcase my frontend expertise, I'm absolutely ready to work with backend technologies. 
              I can integrate APIs, work with databases, and build complete full-stack applications when needed.
            </p>
          </div>

          {/* AI Disclaimer */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">🎯</div>
              <h3 className="text-xl font-bold text-white">Technical Expertise</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              <strong className="text-white/90">Problem Solver:</strong> I excel at breaking down complex 
                challenges, researching solutions, and implementing robust applications. My strength lies in 
                understanding requirements, architecting solutions, and delivering reliable software.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(15px) rotate(180deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(15px, -15px) rotate(120deg); }
          66% { transform: translate(-15px, 15px) rotate(240deg); }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;