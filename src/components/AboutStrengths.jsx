import React, { useEffect, useRef, useState } from 'react';
import { Code, Zap, Brain, Github, ExternalLink, CheckCircle, Star, Lightbulb } from 'lucide-react';

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
      title: "Java Mastery",
      description: "100% proficiency in Java with deep understanding of core concepts and advanced features"
    },
    {
      icon: Brain,
      title: "Strategic Learning",
      description: "AI-enhanced learning approach focusing on essential concepts rather than rote memorization"
    },
    {
      icon: Zap,
      title: "Rapid Development",
      description: "Built this entire portfolio in just 3-5 hours, showcasing efficient development skills"
    },
    {
      icon: Lightbulb,
      title: "Smart Focus",
      description: "Master folder structures and pro techniques to compete at high levels efficiently"
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
              <Star className="w-4 h-4 text-orange-400 mr-3 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Core Strengths</span>
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
            My approach to development is strategic and efficient - focusing on mastering the essentials 
            while leveraging AI to accelerate learning and problem-solving.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Side - Main Description */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Brain className="w-8 h-8 text-orange-400 mr-3" />
                My Learning Philosophy
              </h3>
              
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  I believe in <span className="text-orange-400 font-semibold">strategic mastery</span> over 
                  memorization. With <span className="text-blue-400 font-semibold">100% proficiency in Java</span> and 
                  intermediate-level problem-solving skills, I've built a solid foundation that I continuously expand.
                </p>
                
                <p>
                  My approach leverages <span className="text-purple-400 font-semibold">AI as a learning accelerator</span> - 
                  I focus on understanding essential concepts deeply rather than memorizing syntax. This allows me to 
                  adapt quickly to new technologies and frameworks.
                </p>
                
                <p>
                  For example, in React, I master <span className="text-green-400 font-semibold">folder structures 
                  and professional development techniques</span> that enable me to compete at advanced levels efficiently. 
                  Quality over quantity is my mantra.
                </p>
                
                <p>
                  <span className="text-cyan-400 font-semibold">Learning new technologies is natural to me</span> - 
                  I can easily catch up with any technology when needed. The current job market is challenging, 
                  and like many developers, I've experienced confusion about which technologies to master beyond 
                  my solid foundation in <span className="text-orange-400 font-semibold">Java, OOP, and DSA</span>.
                </p>
                
                <p>
                  However, I'm confident that <span className="text-purple-400 font-semibold">given the right opportunity, 
                  I will learn super fast</span> and adapt to any tech stack or project requirements. 
                  My learning methodology ensures rapid skill acquisition when focused on real-world applications.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-2xl border border-orange-500/20">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-orange-400 mr-3" />
                  <span className="text-white font-semibold text-lg">Speed & Efficiency</span>
                </div>
                <p className="text-white/80">
                  This entire portfolio was built in just <span className="text-orange-400 font-bold">3-5 hours</span>, 
                  demonstrating my ability to deliver high-quality results rapidly through strategic development practices.
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
                    <div className="text-white/60 text-sm">See the complete codebase and development process</div>
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
              <div className="text-2xl font-bold text-white mb-2">Strategic Developer</div>
              <div className="text-white/70">
                Efficiency through intelligent learning and AI-enhanced development
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