import React, { useEffect, useRef, useState } from 'react';

const Disclaimers = () => {
  const sectionRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('companies');

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
            backgroundSize: '80px 80px',
            animation: 'gridMove 30s linear infinite'
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-sm animate-pulse"
            style={{
              width: `${Math.random() * 150 + 30}px`,
              height: `${Math.random() * 150 + 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['rgba(139, 69, 199, 0.15)', 'rgba(59, 130, 246, 0.15)', 'rgba(236, 72, 153, 0.15)', 'rgba(16, 185, 129, 0.15)'][Math.floor(Math.random() * 4)]
              } 0%, transparent 70%)`,
              animation: `float${i % 3} ${25 + Math.random() * 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-white/90 text-sm font-medium">Honest Transparency</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
            Every collaboration requires a{' '}
            <span 
              className="block mt-4"
              style={{
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 4s ease infinite'
              }}
            >
              HONEST APPROACH
            </span>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'companies'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                For Companies
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'clients'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                For Clients
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'companies' && (
            <div className="animate-slideIn">
              {/* Big Statement */}
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
                  <span className="text-white/30">I AM IN</span>
                  <span 
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                    style={{ animation: 'pulse 2s infinite' }}
                  >
                    2025
                  </span>
                </h3>
              </div>

              {/* Disclaimer Card */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 hover:border-white/30 transition-all duration-500">
                <div className="flex items-start mb-6">
                  <div className="text-4xl mr-4">🧠</div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Modern Development Reality
                    </h4>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"></div>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  I don't store every piece of code in my memory, and I don't blindly write 
                  entire applications from scratch without assistance. 
                </p>
                
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  <strong className="text-white">I leverage AI as my coding partner.</strong> This isn't a weakness—it's 
                  how modern development works. The skill lies in knowing how to effectively collaborate 
                  with AI, validate outputs, debug issues, and deliver production-ready solutions.
                </p>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-white/90 font-medium">
                    What matters: I deliver working, scalable, and maintainable code that solves 
                    real problems. The tools I use to get there are part of staying competitive 
                    in today's tech landscape.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="animate-slideIn">
              {/* Big Statement */}
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
                  <span className="text-white/30">BEFORE YOU</span>
                  <span 
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                    style={{ animation: 'pulse 2s infinite' }}
                  >
                    INVEST
                  </span>
                </h3>
              </div>

              {/* Disclaimer Card */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 hover:border-white/30 transition-all duration-500">
                <div className="flex items-start mb-6">
                  <div className="text-4xl mr-4">⚠️</div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      SEO & Rankings Reality Check
                    </h4>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6"></div>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  Even if I create a wonderful website, implement perfect SEO, and you invest 
                  in paid promotions—<strong className="text-white">I cannot guarantee your site will rank #1 on Google</strong> 
                  unless someone searches exactly for your brand name.
                </p>
                
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  Google's algorithm considers hundreds of factors including domain age, backlinks, 
                  content authority, user behavior, and competition. A new website competing against 
                  established players takes time and consistent effort.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/20">
                    <h5 className="text-white font-bold mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      What I Promise
                    </h5>
                    <ul className="text-white/80 space-y-2">
                      <li>• SEO-optimized structure</li>
                      <li>• Fast loading speeds</li>
                      <li>• Mobile-responsive design</li>
                      <li>• Clean, professional code</li>
                      <li>• Analytics setup</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
                    <h5 className="text-white font-bold mb-3 flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      What I Can't Promise
                    </h5>
                    <ul className="text-white/80 space-y-2">
                      <li>• Instant #1 rankings</li>
                      <li>• Guaranteed traffic</li>
                      <li>• Beating established competitors</li>
                      <li>• Overnight success</li>
                      <li>• Algorithm immunity</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mt-6">
                  <p className="text-white/90 font-medium">
                    Success online requires a long-term strategy combining great design, quality content, 
                    consistent marketing, and patience. I'll build you the foundation—but ranking success 
                    depends on many factors beyond just the website.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Transparency builds trust. Let's work together with realistic expectations 
            and achieve real, sustainable results.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
        
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(10px) rotate(180deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(120deg); }
          66% { transform: translate(-10px, 10px) rotate(240deg); }
        }

        @keyframes slideIn {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Disclaimers;