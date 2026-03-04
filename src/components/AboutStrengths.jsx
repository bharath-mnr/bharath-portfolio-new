import React, { useEffect, useRef, useState } from 'react';
import { Code, Zap, Brain, Github, ExternalLink, CheckCircle, Star, Database, Server, Globe } from 'lucide-react';

const AboutStrengths = () => {
  const sectionRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGithubClick = () => {
    window.open('https://github.com/bharath-mnr/bharath-portfolio-new', '_blank');
  };

  const strengths = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Strong proficiency in Java, Spring Boot for backend and React for frontend development"
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Experience with SQL database design, optimization, and efficient data management"
    },
    {
      icon: Server,
      title: "Modern Deployment",
      description: "Skilled in containerization with Docker and cloud deployment using Vercel"
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Strong foundation in Data Structures & Algorithms with practical implementation experience"
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-black py-20"
      style={{
        background: `
          radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(249, 115, 22, 0.15) 0%, 
            rgba(59, 130, 246, 0.12) 25%, 
            rgba(139, 69, 199, 0.12) 50%, 
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
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridPulse 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-orange-500/10 font-mono text-xs select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `codeFloat ${15 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {['<div>', 'function()', '{ }', 'import', 'const', 'return', '=> {', '}</>', 'class', 'public'][Math.floor(Math.random() * 10)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500">
              <Star className="w-4 h-4 text-orange-400 mr-3" />
              <span className="text-white/90 text-sm font-medium">Technical Expertise</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
            About{' '}
            <span 
              className="inline-block"
              style={{
                background: 'linear-gradient(45deg, #f97316, #8b5cf6, #06b6d4, #10b981)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 3s ease infinite'
              }}
            >
              ME
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Passionate full-stack developer with strong technical foundations and a focus on 
            building scalable, efficient applications using modern technologies.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Side - Main Description */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Code className="w-8 h-8 text-orange-400 mr-3" />
                My Development Journey
              </h3>
              
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  I have built a <span className="text-orange-400 font-semibold">strong foundation in Java</span> with 
                  deep understanding of Object-Oriented Programming principles and core language features. My backend 
                  expertise extends to <span className="text-blue-400 font-semibold">Spring Boot</span> for creating 
                  robust REST APIs and scalable applications.
                </p>
                
                <p>
                  On the frontend, I work with <span className="text-purple-400 font-semibold">React and modern JavaScript</span>, 
                  creating responsive, interactive user interfaces. I'm proficient with 
                  <span className="text-green-400 font-semibold"> Tailwind CSS</span> for efficient styling and 
                  follow best practices for component architecture and state management.
                </p>
                
                <p>
                  My technical skills include <span className="text-cyan-400 font-semibold">database design with SQL</span>, 
                  containerization using <span className="text-orange-400 font-semibold">Docker</span>, and deployment 
                  strategies with modern platforms like Vercel. I have a solid understanding of 
                  <span className="text-purple-400 font-semibold"> Data Structures and Algorithms</span>, which helps 
                  me write efficient, optimized code.
                </p>
                
                <p>
                  I'm committed to <span className="text-blue-400 font-semibold">continuous learning</span> and staying 
                  current with industry trends. Whether working on backend architecture, frontend interfaces, or 
                  full-stack projects, I focus on delivering clean, maintainable code and effective solutions.
                </p>
                
                <p>
                  <span className="text-green-400 font-semibold">I'm eager to contribute</span> to challenging projects 
                  and grow within a collaborative team environment. My goal is to leverage my technical skills to 
                  build impactful applications that solve real-world problems.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl border border-orange-500/20">
                <div className="flex items-center mb-4">
                  <Globe className="w-6 h-6 text-orange-400 mr-3" />
                  <span className="text-white font-semibold text-lg">Full Stack Capabilities</span>
                </div>
                <p className="text-white/80">
                  Experienced in <span className="text-orange-400 font-bold">end-to-end development</span> - 
                  from database design and backend APIs to responsive frontend interfaces and deployment strategies.
                </p>
              </div>
            </div>

            {/* GitHub Showcase */}
            <div 
              onClick={handleGithubClick}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">Portfolio Repository</div>
                    <div className="text-white/60 text-sm">Explore my code and development approach</div>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>

          {/* Right Side - Strengths Cards */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {strengths.map((strength, index) => {
              const IconComponent = strength.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105"
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className="flex items-start">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                        {strength.title}
                      </h4>
                      <p className="text-white/70 leading-relaxed">
                        {strength.description}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              );
            })}
            
            {/* Additional Highlight */}
            <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 text-center">
              <div className="text-2xl font-bold text-white mb-2">Ready to Contribute</div>
              <div className="text-white/70">
                Seeking opportunities to apply my skills in challenging projects
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gridPulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        
        @keyframes codeFloat {
          0% { 
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutStrengths;