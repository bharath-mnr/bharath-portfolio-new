import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error message when user starts typing
    if (formStatus.type === 'error') {
      setFormStatus({ type: '', message: '' });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please enter your name.'
      });
      return;
    }

    if (!formData.email.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please enter your email address.'
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    if (!formData.message.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please provide details about your inquiry.'
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({
        type: 'success',
        message: 'Thanks for reaching out! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        inquiryType: '',
        company: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'bharathmnr@outlook.com',
      action: () => {
        try {
          window.open('mailto:bharathmnr@outlook.com', '_blank');
        } catch (error) {
          console.log('Unable to open email client');
        }
      },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+91 70342 64195',
      action: () => {
        try {
          const whatsappNumber = "917034264195";
          const whatsappMessage = encodeURIComponent("Hi Bharath! I'd like to connect with you.");
          const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
          window.open(whatsappURL, '_blank');
        } catch (error) {
          console.log('Unable to open WhatsApp');
        }
      },
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Munnar, Kerala, IN',
      action: () => {
        try {
          window.open('https://maps.google.com/?q=Munnar,Kerala,India', '_blank');
        } catch (error) {
          console.log('Unable to open maps');
        }
      },
      color: 'from-purple-500 to-pink-500'
    }
  ];

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
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-sm animate-pulse"
            style={{
              width: `${Math.random() * 120 + 20}px`,
              height: `${Math.random() * 120 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['rgba(139, 69, 199, 0.1)', 'rgba(59, 130, 246, 0.1)', 'rgba(236, 72, 153, 0.1)', 'rgba(16, 185, 129, 0.1)'][Math.floor(Math.random() * 4)]
              } 0%, transparent 70%)`,
              animation: `float${i % 3} ${20 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3" />
              <span className="text-white/90 text-sm font-medium">Open to Opportunities</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-8">
            Let's Connect &{' '}
            <span 
              className="block mt-4"
              style={{
                background: 'linear-gradient(45deg, #00d4ff, #ff00d4, #00ff88, #ffaa00, #aa00ff, #ff4444)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 4s ease infinite'
              }}
            >
              COLLABORATE
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Whether you have a project in mind or an exciting opportunity to discuss, I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-white/80 text-lg mb-8">
                I'm passionate about creating innovative solutions and working with talented teams. 
                Ready to explore new opportunities and meaningful collaborations.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={index}
                      onClick={method.action}
                      className={`group flex items-center p-4 rounded-2xl bg-gradient-to-r ${method.color}/10 border border-white/10 hover:border-white/30 transition-all duration-300 ${method.action ? 'cursor-pointer hover:scale-105' : ''}`}
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white/60 text-sm font-medium">{method.label}</div>
                        <div className="text-white font-semibold">{method.value}</div>
                      </div>
                      {method.action && (
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-6">Let's Talk</h3>
            
            {formStatus.message && (
              <div className={`flex items-center p-4 rounded-2xl mb-6 ${
                formStatus.type === 'success' 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}>
                {formStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-3" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-3" />
                )}
                {formStatus.message}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="job-opportunity">Job Opportunity</option>
                    <option value="freelance-project">Freelance Project</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Company/Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    placeholder="Company name (optional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="Tell me about your opportunity, project details, or what you'd like to discuss..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </div>
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
          100% { transform: translate(80px, 80px); }
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

        select option {
          background-color: #1a1a2e;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Contact;