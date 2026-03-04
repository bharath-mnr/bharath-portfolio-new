import React, { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: '🎨',
      color: 'from-blue-500 to-purple-600',
      skills: [
        { name: 'React.js', icon: '⚛️' },
        { name: 'Tailwind CSS', icon: '🌊' },
        { name: 'JavaScript (ES6+)', icon: '⚡' },
        { name: 'HTML5 & CSS3', icon: '🏗️' },
        { name: 'Responsive Design', icon: '📱' },
        { name: 'SEO Optimization', icon: '🔍' },
        { name: 'Web Performance', icon: '🚀' },
        { name: 'UI/UX Design', icon: '🎯' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: '⚙️',
      color: 'from-green-500 to-teal-600',
      skills: [
        { name: 'Java', icon: '☕' },
        { name: 'Spring Boot', icon: '🍃' },
        { name: 'MySQL', icon: '🗄️' },
        { name: 'REST APIs', icon: '🔗' },
        { name: 'Database Design', icon: '📊' },
        { name: 'Server Management', icon: '🖥️' },
        { name: 'API Integration', icon: '🔌' }
      ]
    },
    algorithms: {
      title: 'Data Structures & Algorithms',
      icon: '🧮',
      color: 'from-orange-500 to-red-600',
      skills: [
        { name: 'Array & Strings', icon: '📝' },
        { name: 'Linked Lists', icon: '🔗' },
        { name: 'Dynamic Programming', icon: '💡' },
        { name: 'Greedy Algorithms', icon: '🎯' },
        { name: 'Sorting Algorithms', icon: '🔄' },
        { name: 'Binary Search', icon: '🔍' },
        { name: 'Hash Tables', icon: '#️⃣' },
        { name: 'Mathematical Algorithms', icon: '🧮' }
      ]
    },
    soft: {
      title: 'Professional Skills',
      icon: '🤝',
      color: 'from-pink-500 to-rose-600',
      skills: [
        { name: 'Communication', icon: '💬' },
        { name: 'Problem-Solving', icon: '🧩' },
        { name: 'Time Management', icon: '⏰' },
        { name: 'Adaptability', icon: '🔄' },
        { name: 'Critical Thinking', icon: '🧠' },
        { name: 'Project Management', icon: '📋' },
        { name: 'Team Collaboration', icon: '👥' },
        { name: 'Leadership', icon: '👑' }
      ]
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        mousePos.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        };
        
        skillsRef.current.style.setProperty('--mouse-x', `${mousePos.current.x}%`);
        skillsRef.current.style.setProperty('--mouse-y', `${mousePos.current.y}%`);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = skillsRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      observer.observe(section);
      
      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
        observer.unobserve(section);
      };
    }
  }, []);

  const SkillBar = ({ skill, index, isActive }) => (
    <div 
      className={`group mb-6 transition-all duration-500 ${
        isActive ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
            {skill.icon}
          </span>
          <span className="text-white font-medium text-lg">{skill.name}</span>
        </div>
      </div>
      
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full transition-all duration-1000 ease-out w-full`}
          style={{ 
            transitionDelay: `${index * 150}ms`
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
        
        {/* Animated dots */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div 
      ref={skillsRef}
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
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-xl animate-pulse"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['rgba(139, 69, 199, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(16, 185, 129, 0.3)'][Math.floor(Math.random() * 4)]
              } 0%, transparent 70%)`,
              animation: `float${i % 3} ${20 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Skills &
            </span>
            <br />
            <span className="text-white">Capabilities</span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences with a comprehensive toolkit of modern technologies,
            algorithms, and professional expertise.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                activeCategory === key
                  ? `bg-gradient-to-r ${category.color} text-white shadow-2xl`
                  : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-md border border-white/20'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <span>{category.title}</span>
              </div>
              
              {activeCategory === key && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills List */}
          <div className="space-y-8">
            <div className={`p-8 rounded-3xl bg-gradient-to-br ${skillCategories[activeCategory].color} bg-opacity-10 backdrop-blur-md border border-white/20`}>
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skillCategories[activeCategory].color} flex items-center justify-center text-2xl`}>
                  {skillCategories[activeCategory].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {skillCategories[activeCategory].title}
                  </h3>
                  <p className="text-white/70">
                    {skillCategories[activeCategory].skills.length} Technologies
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <SkillBar 
                    key={skill.name} 
                    skill={skill} 
                    index={index}
                    isActive={isVisible}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Skills Visualization */}
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-spin-slow">
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color}`} />
              </div>
              
              {/* Middle Ring */}
              <div className="absolute inset-8 rounded-full border-2 border-white/30 animate-reverse-spin">
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color}`} />
              </div>
              
              {/* Inner Circle */}
              <div className={`absolute inset-16 rounded-full bg-gradient-to-br ${skillCategories[activeCategory].color} bg-opacity-20 backdrop-blur-xl border border-white/30 flex items-center justify-center`}>
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">
                    {skillCategories[activeCategory].icon}
                  </div>
                  <div className="text-white font-bold text-lg">
                    Expert
                  </div>
                  <div className="text-white/70 text-sm">Level</div>
                </div>
              </div>

              {/* Floating Skills */}
              {skillCategories[activeCategory].skills.slice(0, 6).map((skill, index) => (
                <div
                  key={skill.name}
                  className="absolute w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                  style={{
                    left: `${50 + 35 * Math.cos((index * 60 * Math.PI) / 180)}%`,
                    top: `${50 + 35 * Math.sin((index * 60 * Math.PI) / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                    animation: `float${index % 3} ${10 + index}s ease-in-out infinite`
                  }}
                >
                  {skill.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float0 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translate(-50%, -50%) translateX(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateX(20px) rotate(180deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(-50%, -50%) translate(20px, -20px) rotate(120deg); }
          66% { transform: translate(-50%, -50%) translate(-20px, 20px) rotate(240deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-reverse-spin {
          animation: reverse-spin 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Skills;