import React, { useEffect, useRef, useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  ExternalLink,
  Heart,
  Code,
  Coffee,
  ArrowUp,
  Clock
} from 'lucide-react';

const Footer = () => {
  const footerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        mousePos.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        };
        
        footerRef.current.style.setProperty('--mouse-x', `${mousePos.current.x}%`);
        footerRef.current.style.setProperty('--mouse-y', `${mousePos.current.y}%`);
      }
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        footer.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/bharath-mnr',
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'hover:from-gray-500 hover:to-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/bharath-b-10a8382b4/',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/bharathmnr',
      color: 'from-sky-500 to-sky-700',
      hoverColor: 'hover:from-sky-400 hover:to-sky-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-400 hover:to-purple-500'
    }
  ];

  const services = [
    { name: 'Web Development', href: '#services' },
    { name: 'Website Updates', href: '#services' },
    { name: 'SEO Optimization', href: '#services' },
    { name: 'Consulting', href: '#services' }
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}

      <footer 
        ref={footerRef}
        className="relative overflow-hidden bg-black"
        style={{
          background: `
            radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
              rgba(139, 69, 199, 0.15) 0%, 
              rgba(59, 130, 246, 0.1) 25%, 
              rgba(236, 72, 153, 0.1) 50%, 
              rgba(16, 185, 129, 0.08) 75%, 
              transparent 100%),
            linear-gradient(180deg, 
              #000000 0%, 
              #0a0a0a 25%, 
              #1a1a2e 50%, 
              #16213e 75%, 
              #0f3460 100%)
          `
        }}
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'gridFloat 25s linear infinite'
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-sm animate-pulse"
              style={{
                width: `${Math.random() * 80 + 15}px`,
                height: `${Math.random() * 80 + 15}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  ['rgba(139, 69, 199, 0.08)', 'rgba(59, 130, 246, 0.08)', 'rgba(236, 72, 153, 0.08)', 'rgba(16, 185, 129, 0.08)'][Math.floor(Math.random() * 4)]
                } 0%, transparent 70%)`,
                animation: `floatParticle${i % 3} ${15 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-4">
                  <span className="text-white">Bharath</span>
                  <span 
                    className="ml-2"
                    style={{
                      background: 'linear-gradient(45deg, #00d4ff, #ff00d4, #00ff88, #ffaa00)',
                      backgroundSize: '300% 300%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'gradientShift 3s ease infinite'
                    }}
                  >
                  </span>
                </h3>
              </div>
              
              <p className="text-white/70 text-lg mb-6 max-w-md">
                Passionate software developer crafting innovative digital experiences. 
                Always exploring new technologies and pushing creative boundaries.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-white/60 hover:text-white/80 transition-colors duration-300">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <a href="mailto:bharathmnr@outlook.com" className="hover:underline">
                    bharathmnr@outlook.com
                  </a>
                </div>
                <div className="flex items-center text-white/60">
                  <MapPin className="w-5 h-5 mr-3 text-green-400" />
                  <span>Munnar, Kerala, India</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Clock className="w-5 h-5 mr-3 text-purple-400" />
                  <span>Available for opportunities</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href={service.href}
                      className="text-white/60 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {service.name}
                      </span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-white/10 pt-12 mb-12">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-semibold text-white mb-4">Let's Connect</h4>
              <p className="text-white/60 max-w-md mx-auto">
                Follow me on social media for updates on my latest projects and tech insights
              </p>
            </div>
            
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 rounded-2xl bg-gradient-to-r ${social.color} ${social.hoverColor} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/10`}
                  >
                    <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center text-white/60 text-sm">
                <span>© 2025 Bharath MNR. Made with</span>
                <Heart className="w-4 h-4 mx-2 text-red-400 animate-pulse" />
                <span>and</span>
                <Coffee className="w-4 h-4 mx-2 text-yellow-600" />
                <span>in Kerala</span>
              </div>

              {/* Tech Stack Badge */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Code className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white/70 text-sm">Built with React & Tailwind</span>
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
          
          @keyframes gridFloat {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
          
          @keyframes floatParticle0 {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
          }
          
          @keyframes floatParticle1 {
            0%, 100% { transform: translateX(0px) rotate(0deg); opacity: 0.4; }
            50% { transform: translateX(20px) rotate(180deg); opacity: 0.7; }
          }
          
          @keyframes floatParticle2 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.6; }
            33% { transform: translate(15px, -15px) rotate(120deg); opacity: 0.8; }
            66% { transform: translate(-15px, 15px) rotate(240deg); opacity: 0.4; }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;