import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, CheckCircle2, Phone, Building, 
  Briefcase, Calculator, Users, Headset, Map,
  Plane, Hotel, SmartphoneNfc, Car, ChevronUp
} from 'lucide-react';

const partners = [
  { 
    name: "Hasnan", 
    logo: <span className="font-heading font-bold text-2xl tracking-tighter"><span className="text-[#D8FF44]">HAS</span>NAN.</span>, 
    link: "https://hasnaniraq.com/#/",
    description: "We started working in 2022. Everything began when the descendants of a fourth-generation grandfather, who owned a caravan of spices, decided to create an Anatolian brand in Mardin and spread it to the whole world. In this story,!"
  },
  { 
    name: "Peak Travel", 
    logo: <span className="font-heading font-medium text-2xl tracking-tight text-white">Peak<span className="text-gray-500 font-normal">Travel</span></span>, 
    link: "#",
    description: "Our travel subsidiary focused on delivering next-generation digital booking and corporate travel management solutions globally."
  },
  { 
    name: "Tulip Booking", 
    logo: <span className="font-heading font-bold text-2xl text-white flex items-center gap-2"><div className="w-5 h-5 rounded-sm bg-[#D8FF44] mb-1"></div>Tulip</span>, 
    link: "#",
    description: "Our proprietary travel application providing seamless hotel, flight, and transfer bookings with advanced operational integration."
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const services = [
    {
      title: "Business Consultancy",
      description: "We support companies with operational planning, system selection, workflow design, and digital transformation guidance.",
      icon: Briefcase
    },
    {
      title: "Accounting Software Setup",
      description: "We help businesses configure and implement accounting platforms, organize charts of accounts, and build reliable financial workflows.",
      icon: Calculator
    },
    {
      title: "Administration & HR",
      description: "We assist with administrative structures, HR systems, employee management processes, and internal documentation.",
      icon: Users
    },
    {
      title: "PBX & Communication Systems",
      description: "We set up PBX, call management, business phone systems, and communication tools that help teams stay connected.",
      icon: Phone
    },
    {
      title: "Sales & Support Channels",
      description: "We implement sales pipelines, customer support channels, CRM tools, ticketing systems, and client communication workflows.",
      icon: Headset
    },
    {
      title: "Travel Technology",
      description: "Through our subsidiary Peak Travel, we develop and support travel technology products such as Tulip Booking.",
      icon: Map
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Prevent redirect
    formData.append('_captcha', 'false');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@corevia-network.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        // 96px is equivalent to h-24 (header height)
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#D8FF44] selection:text-[#0A0A0A]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#D8FF44]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center">
              <a href="#home" onClick={handleAnchorClick}>
                <img 
                  src={`${import.meta.env.BASE_URL}assets/corevia/corevia-network-logo.svg`}
                  alt="Corevia Network" 
                  className="h-10 md:h-12 w-auto brightness-0 invert"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `${import.meta.env.BASE_URL}assets/corevia/corevia-network-logo.png`;
                  }}
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleAnchorClick}
                  className="text-sm font-medium text-gray-300 hover:text-[#D8FF44] transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#D8FF44] transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-[#D8FF44] focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0A0A0A] border-b border-[#D8FF44]/20 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#0A0A0A] hover:bg-[#D8FF44] transition-colors"
                    onClick={handleAnchorClick}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#D8FF44]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-[#173FFF]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-1 bg-[#D8FF44] mb-8"
            ></motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
            >
              Business systems, operations, and technology solutions for modern companies.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl"
            >
              Corevia Network helps companies build the operational foundation they need to grow. From accounting software and HR administration to PBX communication systems and sales support channels, we design and implement the tools that keep businesses organized, connected, and scalable.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a 
                href="#services" 
                onClick={handleAnchorClick}
                whileTap={{ scale: 0.95 }}
                className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-[#D8FF44] text-[#0A0A0A] font-bold text-lg hover:bg-[#E4FF66] transition-all duration-300 shadow-[0_0_15px_rgba(216,255,68,0.2)] hover:shadow-[0_0_30px_rgba(216,255,68,0.5)] md:hover:scale-105"
              >
                Explore Our Services
              </motion.a>
              <motion.a 
                href="#contact" 
                onClick={handleAnchorClick}
                whileTap={{ scale: 0.95 }}
                className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-transparent border-2 border-[#4A4A4A] text-white font-bold text-lg hover:border-[#D8FF44] hover:text-[#D8FF44] transition-all duration-300 md:hover:scale-105"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Marquee Section */}
      <section id="partners" className="py-24 bg-[#0A0A0A] border-t border-[#4A4A4A]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1 bg-[#D8FF44]"></div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white tracking-tight">Our Partners</h2>
              <div className="w-8 h-1 bg-[#D8FF44]"></div>
            </div>
            <p className="text-gray-400 max-w-2xl text-lg">
              Collaborating with industry leaders and visionaries to structure the operational foundations of modern companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.a 
                key={index}
                href={partner.link}
                target={partner.link !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`group block bg-[#161616] border border-[#3A3A3A] rounded-2xl p-8 hover:border-[#D8FF44]/70 transition-all duration-300 ${partner.link === "#" ? "cursor-default" : "cursor-pointer hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(216,255,68,0.15)]"} relative overflow-hidden`}
                whileTap={partner.link !== "#" ? { scale: 0.98 } : {}}
              >
                {/* Glow effect perpetually visible but subtle */}
                <motion.div 
                  className="absolute -top-12 -right-12 p-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                >
                  <div className="w-32 h-32 bg-[#D8FF44]/10 rounded-full blur-3xl"></div>
                </motion.div>

                <div className="mb-6 flex items-center justify-between relative z-10">
                  <div className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                    {partner.logo}
                  </div>
                  {partner.link !== "#" && (
                    <ArrowRight className="text-[#4A4A4A] group-hover:text-[#D8FF44] transition-colors duration-300 w-5 h-5 -rotate-45 group-hover:rotate-0" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{partner.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {partner.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#111111] relative border-t-2 border-[#D8FF44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-1 bg-[#D8FF44]"></div>
                <span className="text-[#D8FF44] font-semibold tracking-wider uppercase text-sm">What We Do</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h2>
              <p className="text-xl text-gray-400">
                We help companies implement the systems, processes, and tools needed to operate professionally and efficiently.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#161616] border border-[#D8FF44]/20 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(216,255,68,0.2)] hover:border-[#D8FF44]/80 transition-all duration-300 group relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="absolute top-0 right-0 w-40 h-40 bg-[#D8FF44]/10 rounded-bl-full -z-0 blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                />
                
                <div className="w-16 h-16 bg-[#1A1A1A] rounded-xl flex items-center justify-center mb-6 border border-[#D8FF44]/30 shadow-[0_0_15px_rgba(216,255,68,0.1)] group-hover:border-[#D8FF44]/80 group-hover:bg-[#D8FF44]/20 transition-all duration-300 relative z-10 group-hover:shadow-[0_0_20px_rgba(216,255,68,0.4)]">
                  <service.icon className="w-8 h-8 text-[#D8FF44]/80 group-hover:text-[#D8FF44] transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-[#D8FF44] transition-colors relative z-10">{service.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed relative z-10">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tulip Booking Showcase */}
      <section className="py-24 bg-[#0A0A0A] relative overflow-hidden border-t border-b border-[#4A4A4A]/30">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#173FFF] via-[#0A0A0A] to-[#0A0A0A]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8 bg-[#1A1A1A] w-fit p-4 pr-8 rounded-2xl border border-[#4A4A4A]/50 shadow-lg">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/tulip-booking/tulip-booking-logo.svg`}
                  alt="Tulip Booking" 
                  className="h-10 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `${import.meta.env.BASE_URL}assets/tulip-booking/tulip-booking-logo.png`;
                  }}
                />
                <div className="h-8 w-px bg-[#4A4A4A]"></div>
                <div>
                    <span className="text-white font-bold leading-none block font-heading text-lg">Tulip Booking</span>
                    <span className="text-[#D8FF44] font-medium text-xs leading-none block mt-1">by Peak Travel</span>
                </div>
              </div>
              
              <h2 className="font-heading text-4xl font-bold text-white mb-6 leading-tight">Essential travel services<br />in one mobile experience.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-2 border-[#D8FF44] pl-6">
                A mobile travel app developed by Corevia Network. Users can access flights, hotels, eSIM services, transfers, and other travel solutions through a simple and convenient app designed for modern travelers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="https://apps.apple.com/us/app/tulip-booking/id6759516330" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-black hover:bg-[#D8FF44] hover:shadow-[0_0_20px_rgba(216,255,68,0.3)] transition-all duration-300 md:hover:scale-[1.03]"
                >
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold text-gray-600">Download on the</span>
                    <span className="text-base font-bold">App Store</span>
                  </div>
                </motion.a>
                <motion.a 
                  href="https://play.google.com/store/apps/details?id=com.theesim.app&hl=en-US" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-black hover:bg-[#D8FF44] hover:shadow-[0_0_20px_rgba(216,255,68,0.3)] transition-all duration-300 md:hover:scale-[1.03]"
                >
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold text-gray-600">GET IT ON</span>
                    <span className="text-base font-bold">Google Play</span>
                  </div>
                </motion.a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-[#1A1A1A] border border-[#4A4A4A] overflow-hidden flex items-center justify-center shadow-[0_0_50px_-12px_rgba(216,255,68,0.15)] relative group hover:border-[#D8FF44]/50 transition-colors duration-500">
                <motion.div 
                  className="absolute inset-0 opacity-50 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(216,255,68,0.2)_360deg)]"></div>
                </motion.div>
                <div className="absolute inset-[2px] bg-[#1A1A1A] rounded-2xl z-0"></div>
                
                <div className="grid grid-cols-2 gap-6 p-8 w-full h-full relative z-10">
                  <motion.div whileTap={{ scale: 0.95 }} className="bg-[#222] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#D8FF44]/20 shadow-[0_0_15px_rgba(216,255,68,0.05)] hover:border-[#D8FF44] hover:bg-[#D8FF44]/10 hover:shadow-[0_0_20px_rgba(216,255,68,0.2)] transition-all duration-300 group/item relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D8FF44]/5 to-transparent opacity-50"></div>
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                      <Hotel className="w-12 h-12 text-[#D8FF44]/70 group-hover/item:text-[#D8FF44] group-hover/item:drop-shadow-[0_0_10px_rgba(216,255,68,0.6)] transition-all duration-300 relative z-10" />
                    </motion.div>
                    <span className="text-sm font-semibold text-gray-200 group-hover/item:text-white transition-colors tracking-wide uppercase relative z-10">Hotels</span>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }} className="bg-[#222] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#D8FF44]/20 shadow-[0_0_15px_rgba(216,255,68,0.05)] hover:border-[#D8FF44] hover:bg-[#D8FF44]/10 hover:shadow-[0_0_20px_rgba(216,255,68,0.2)] transition-all duration-300 group/item relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D8FF44]/5 to-transparent opacity-50"></div>
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}>
                      <Plane className="w-12 h-12 text-[#D8FF44]/70 group-hover/item:text-[#D8FF44] group-hover/item:drop-shadow-[0_0_10px_rgba(216,255,68,0.6)] transition-all duration-300 relative z-10" />
                    </motion.div>
                    <span className="text-sm font-semibold text-gray-200 group-hover/item:text-white transition-colors tracking-wide uppercase relative z-10">Flights</span>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }} className="bg-[#222] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#D8FF44]/20 shadow-[0_0_15px_rgba(216,255,68,0.05)] hover:border-[#D8FF44] hover:bg-[#D8FF44]/10 hover:shadow-[0_0_20px_rgba(216,255,68,0.2)] transition-all duration-300 group/item relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D8FF44]/5 to-transparent opacity-50"></div>
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}>
                      <SmartphoneNfc className="w-12 h-12 text-[#D8FF44]/70 group-hover/item:text-[#D8FF44] group-hover/item:drop-shadow-[0_0_10px_rgba(216,255,68,0.6)] transition-all duration-300 relative z-10" />
                    </motion.div>
                    <span className="text-sm font-semibold text-gray-200 group-hover/item:text-white transition-colors tracking-wide uppercase relative z-10">eSIM</span>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }} className="bg-[#222] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#D8FF44]/20 shadow-[0_0_15px_rgba(216,255,68,0.05)] hover:border-[#D8FF44] hover:bg-[#D8FF44]/10 hover:shadow-[0_0_20px_rgba(216,255,68,0.2)] transition-all duration-300 group/item relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D8FF44]/5 to-transparent opacity-50"></div>
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 3 }}>
                      <Car className="w-12 h-12 text-[#D8FF44]/70 group-hover/item:text-[#D8FF44] group-hover/item:drop-shadow-[0_0_10px_rgba(216,255,68,0.6)] transition-all duration-300 relative z-10" />
                    </motion.div>
                    <span className="text-sm font-semibold text-gray-200 group-hover/item:text-white transition-colors tracking-wide uppercase relative z-10">Transfers</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-1 bg-[#D8FF44]"></div>
              <span className="text-[#D8FF44] font-semibold tracking-wider uppercase text-sm">Who We Are</span>
              <div className="w-8 h-1 bg-[#D8FF44]"></div>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">About Corevia Network</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="text-gray-400 space-y-6 text-lg leading-relaxed bg-[#161616] p-8 md:p-10 rounded-3xl border border-[#2A2A2A] hover:border-[#D8FF44]/30 transition-all duration-500 shadow-xl"
            >
              <div className="w-14 h-14 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <Building className="w-7 h-7 text-[#D8FF44]" />
              </div>
              <p>
                Corevia Network is built to help companies operate with structure, clarity, and reliable systems. We combine consultancy, business software implementation, administration, HR support, communication systems, and sales support tools into one practical service model.
              </p>
              <p>
                Corevia Network also develops and manages technology projects, including Tulip Booking for Peak Travel.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="text-gray-400 space-y-6 text-lg leading-relaxed bg-[#161616] p-8 md:p-10 rounded-3xl border border-[#2A2A2A] hover:border-[#D8FF44]/30 transition-all duration-500 shadow-xl"
            >
              <div className="w-14 h-14 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 className="w-7 h-7 text-[#D8FF44]" />
              </div>
              <p>
                Our work focuses on helping companies move away from scattered manual processes and toward organized, scalable digital operations. Whether a company needs accounting software, HR workflows, PBX systems, CRM setup, or customer support channels, Corevia Network provides the planning and implementation needed to make those systems work together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0A0A0A] relative border-t border-[#4A4A4A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-1 bg-[#D8FF44]"></div>
                <span className="text-[#D8FF44] font-semibold tracking-wider uppercase text-sm">Get In Touch</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h2>
              <p className="text-xl text-gray-400 mb-10 line-clamp-3">
                Ready to set up better systems for your company? Contact Corevia Network to discuss your business needs.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 text-gray-300 group">
                  <div className="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#4A4A4A] group-hover:border-[#D8FF44] group-hover:bg-[#D8FF44]/10 transition-colors">
                    <Building className="w-6 h-6 text-[#D8FF44]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Company</p>
                    <p className="text-xl font-medium text-white">Corevia Network</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1A1A1A] p-8 md:p-10 rounded-3xl border border-[#4A4A4A]/50 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
            >
              {formStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 min-h-[400px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-[#D8FF44] mb-6" />
                  </motion.div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-4">Message Sent</h3>
                  <p className="text-gray-400 text-lg">Thank you for reaching out. A member of our team will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName"
                        name="name"
                        required
                        className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-2 focus:ring-[#D8FF44]/30 transition-all duration-300" 
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        id="companyName"
                        name="company"
                        required
                        className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-2 focus:ring-[#D8FF44]/30 transition-all duration-300" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-2 focus:ring-[#D8FF44]/30 transition-all duration-300" 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-2 focus:ring-[#D8FF44]/30 transition-all duration-300" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-2 focus:ring-[#D8FF44]/30 transition-all duration-300 resize-none" 
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    type="submit"
                    whileTap={{ scale: formStatus === 'submitting' ? 1 : 0.95 }}
                    disabled={formStatus === 'submitting'}
                    className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl bg-[#D8FF44] text-[#0A0A0A] font-bold text-lg hover:bg-[#E4FF66] hover:scale-105 hover:shadow-[0_0_20px_rgba(216,255,68,0.4)] transition-all duration-300 mt-4 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        Sending... <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div>
                      </span>
                    ) : (
                      <>
                        Submit Message <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-sm mt-4 text-center">There was an error sending your message. Please try again.</p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-[#4A4A4A]/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <img 
                src={`${import.meta.env.BASE_URL}assets/corevia/corevia-network-logo.svg`}
                alt="Corevia Network" 
                className="h-10 md:h-12 w-auto mb-6 brightness-0 invert"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `${import.meta.env.BASE_URL}assets/corevia/corevia-network-logo.png`;
                }}
              />
              <p className="text-gray-400 max-w-sm text-lg">
                Business systems, operations, and technology solutions.
              </p>
            </div>
            
            <div className="flex flex-col md:items-end justify-start">
              <nav className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-6 md:mb-0">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-400 hover:text-[#D8FF44] transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-[#4A4A4A]/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Corevia Network. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                <span className="text-[#4A4A4A] hidden md:inline">|</span>
                <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
            
            <div className="flex gap-6 items-center">
              <a 
                href="https://apps.apple.com/us/app/tulip-booking/id6759516330" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2"
              >
                Tulip on App Store
              </a>
              <span className="text-[#4A4A4A]">|</span>
              <a 
                href="https://play.google.com/store/apps/details?id=com.theesim.app&hl=en-US" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2"
              >
                Tulip on Google Play
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#D8FF44] text-[#0A0A0A] shadow-[0_0_20px_rgba(216,255,68,0.3)] hover:scale-110 hover:bg-[#E4FF66] transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
