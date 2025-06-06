import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const heroRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! 👋 You make wonderful websites!", sender: 'user', time: '11:35' },
    { id: 2, text: "Thank you! 😊", sender: 'bharath', time: '11:35' },
    { id: 3, text: "Can you make one for me?", sender: 'user', time: '11:36' },
    { id: 4, text: "Sure! I'd love to help you create something amazing ✨", sender: 'bharath', time: '11:36' },
    { id: 5, text: "Let's discuss your project!", sender: 'bharath', time: '11:37', isButton: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        mousePos.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        };
        
        heroRef.current.style.setProperty('--mouse-x', `${mousePos.current.x}%`);
        heroRef.current.style.setProperty('--mouse-y', `${mousePos.current.y}%`);
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    // Show chat widget after 2 seconds on all devices (changed from desktop only)
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      };
      
      setMessages([...messages, newMessage]);
      
      // Send message to WhatsApp
      const whatsappNumber = "917034264195"; // Your WhatsApp number
      const whatsappMessage = encodeURIComponent(`Hi Bharath! ${inputMessage}`);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappURL, '_blank');
      
      setInputMessage('');
      setIsTyping(true);
      
      // Simulate Bharath typing and responding
      setTimeout(() => {
        setIsTyping(false);
        const response = {
          id: messages.length + 2,
          text: "Thanks for reaching out! 📱 I've received your message on WhatsApp and will respond there!",
          sender: 'bharath',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleButtonClick = (message) => {
    if (message.isButton) {
      // Direct WhatsApp contact for the button click
      const whatsappNumber = "917034264195";
      const whatsappMessage = encodeURIComponent("Hi Bharath! I'd like to discuss my project with you!");
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      window.open(whatsappURL, '_blank');
    }
  };

  return (
    <div 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-black"
      style={{
        background: `
          radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
            rgba(139, 69, 199, 0.3) 0%, 
            rgba(59, 130, 246, 0.2) 25%, 
            rgba(236, 72, 153, 0.2) 50%, 
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
      <div className="absolute inset-0 opacity-20">
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
        ></div>
      </div>

      {/* Floating Orbs with Advanced Animations */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-sm animate-pulse"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['rgba(139, 69, 199, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(16, 185, 129, 0.3)'][Math.floor(Math.random() * 4)]
              } 0%, transparent 70%)`,
              animation: `float${i % 3} ${15 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Cards */}
      <div className="absolute top-20 right-20 w-32 h-20 bg-white bg-opacity-5 backdrop-blur-md rounded-2xl border border-white border-opacity-10 animate-bounce"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-40 bg-white bg-opacity-5 backdrop-blur-md rounded-full border border-white border-opacity-10 animate-ping"></div>

      {/* WhatsApp-style Chat Widget - Now works on all devices */}
      {showChat && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-80 sm:max-w-sm animate-slideInUp">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-green-500 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-sm font-bold">
                  B
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Bharath</div>
                  <div className="text-green-100 text-xs">Online</div>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-green-600 rounded-full p-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 bg-gray-50 max-h-80 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`mb-3 ${message.sender === 'bharath' ? 'text-left' : 'text-right'}`}>
                  <div 
                    className={`inline-block max-w-xs rounded-lg px-3 py-2 text-sm ${
                      message.sender === 'bharath' 
                        ? message.isButton 
                          ? 'bg-purple-500 text-white cursor-pointer hover:bg-purple-600 transition-colors'
                          : 'bg-white text-gray-800 shadow-sm'
                        : 'bg-green-500 text-white'
                    }`}
                    onClick={() => handleButtonClick(message)}
                  >
                    {message.text}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'bharath' ? 'text-left' : 'text-right'}`}>
                    {message.time}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="mb-3 text-left">
                  <div className="inline-block max-w-xs rounded-lg px-3 py-2 text-sm bg-white text-gray-800 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input - Fixed functionality */}
            <div className="p-3 bg-white border-t flex items-center">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..." 
                className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:border-green-500"
              />
              <button 
                onClick={handleSendMessage}
                className="ml-2 bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 text-center">
        
        {/* Glowing Badge */}
        <div className="mb-8 group">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 group-hover:scale-105">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-white/90 text-sm font-medium">Available for work</span>
          </div>
        </div>

        {/* Dynamic Name with Gradient Text and Letter Animations */}
        <div className="mb-6 relative">
          <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none tracking-tighter">
            {'BHARATH'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:translate-y-[-20px] cursor-pointer relative group"
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
                
                {/* Individual letter glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div 
                    className="absolute inset-0 blur-lg"
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
                  </div>
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${10 + Math.random() * 80}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
              </span>
            ))}
          </h1>
          
          {/* Glowing underline */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        </div>

        {/* Subtitle with Typewriter Effect */}
        <div className="mb-8 max-w-4xl">
          <p className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-4 font-light">
            Creative Developer & Digital Architect
          </p>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Transforming ideas into immersive digital experiences through innovative code, 
            stunning design, and cutting-edge technology.
          </p>
        </div>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center">
              Explore My Universe
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          
          <button 
            onClick={() => {
              const whatsappNumber = "917034264195";
              const whatsappMessage = encodeURIComponent("Hi Bharath! I'd like to connect with you!");
              const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
              window.open(whatsappURL, '_blank');
            }}
            className="group px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center">
              Let's Connect
              <div className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </span>
          </button>
        </div>

        {/* Animated Social Icons */}
        <div className="flex space-x-8">
          {[
            { 
              icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", 
              name: "LinkedIn",
              url: "https://www.linkedin.com/in/bharath-b-10a8382b4/"
            },
            { 
              icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", 
              name: "GitHub",
              url: "https://github.com/bharath-mnr"
            },
            { 
              icon: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.303 0 9.6 4.297 9.6 9.6s-4.297 9.6-9.6 9.6S2.4 17.303 2.4 12 6.697 2.4 12 2.4zM7.68 6.144L6.144 7.68 10.464 12l-4.32 4.32 1.536 1.536L12 13.536l4.32 4.32 1.536-1.536L13.536 12l4.32-4.32L16.32 6.144 12 10.464 7.68 6.144z", 
              name: "LeetCode",
              url: "https://leetcode.com/u/bharathmnr06/"
            }
          ].map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs mb-2 tracking-wider">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(20px) rotate(180deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;