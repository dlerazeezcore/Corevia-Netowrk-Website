import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, CheckCircle2, Phone, Building, 
  Briefcase, Calculator, Users, Headset, Map,
  Plane, Hotel, SmartphoneNfc, Car
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

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
      icon: <Briefcase className="w-6 h-6 text-[#D8FF44]" />
    },
    {
      title: "Accounting Software Setup",
      description: "We help businesses configure and implement accounting platforms, organize charts of accounts, and build reliable financial workflows.",
      icon: <Calculator className="w-6 h-6 text-[#D8FF44]" />
    },
    {
      title: "Administration & HR",
      description: "We assist with administrative structures, HR systems, employee management processes, and internal documentation.",
      icon: <Users className="w-6 h-6 text-[#D8FF44]" />
    },
    {
      title: "PBX & Communication Systems",
      description: "We set up PBX, call management, business phone systems, and communication tools that help teams stay connected.",
      icon: <Phone className="w-6 h-6 text-[#D8FF44]" />
    },
    {
      title: "Sales & Support Channels",
      description: "We implement sales pipelines, customer support channels, CRM tools, ticketing systems, and client communication workflows.",
      icon: <Headset className="w-6 h-6 text-[#D8FF44]" />
    },
    {
      title: "Travel Technology",
      description: "Through our subsidiary Peak Travel, we develop and support travel technology products such as Tulip Booking.",
      icon: <Map className="w-6 h-6 text-[#D8FF44]" />
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#D8FF44] selection:text-[#0A0A0A]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#D8FF44]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center">
              <a href="#home">
                <img 
                  src="/assets/corevia/corevia-network-logo.svg" 
                  alt="Corevia Network" 
                  className="h-10 md:h-12 w-auto brightness-0 invert"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/assets/corevia/corevia-network-logo.png";
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
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#D8FF44]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-[#173FFF]/10 blur-[120px] rounded-full pointer-events-none" />
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
              <a 
                href="#services" 
                className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-[#D8FF44] text-[#0A0A0A] font-bold text-lg hover:bg-[#D3FF2B] transition-transform hover:scale-105 shadow-[0_0_20px_rgba(216,255,68,0.3)]"
              >
                Explore Our Services
              </a>
              <a 
                href="#contact" 
                className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-transparent border-2 border-[#4A4A4A] text-white font-bold text-lg hover:border-[#D8FF44] hover:text-[#D8FF44] transition-colors"
              >
                Contact Us
              </a>
            </motion.div>
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
                className="bg-[#1A1A1A] border border-[#4A4A4A]/50 rounded-2xl p-8 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(216,255,68,0.2)] hover:border-[#D8FF44] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8FF44]/5 rounded-bl-[100px] -z-0 transition-transform duration-500 group-hover:scale-110"></div>
                
                <div className="w-14 h-14 bg-[#222] rounded-xl flex items-center justify-center mb-6 border border-[#333] group-hover:border-[#D8FF44]/50 group-hover:bg-[#D8FF44]/10 transition-colors relative z-10">
                  {service.icon}
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-[#D8FF44] transition-colors relative z-10">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed relative z-10">
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
                  src="/assets/tulip-booking/tulip-booking-logo.svg" 
                  alt="Tulip Booking" 
                  className="h-10 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/assets/tulip-booking/tulip-booking-logo.png";
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
                <a 
                  href="https://apps.apple.com/us/app/tulip-booking/id6759516330" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-black hover:bg-[#D8FF44] transition-colors"
                >
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold text-gray-600">Download on the</span>
                    <span className="text-base font-bold">App Store</span>
                  </div>
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.theesim.app&hl=en-US" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-black hover:bg-[#D8FF44] transition-colors"
                >
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold text-gray-600">GET IT ON</span>
                    <span className="text-base font-bold">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-[#1A1A1A] border border-[#4A4A4A] overflow-hidden flex items-center justify-center shadow-[0_0_50px_-12px_rgba(216,255,68,0.1)] relative group hover:border-[#D8FF44]/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#173FFF]/10 via-transparent to-[#D8FF44]/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="grid grid-cols-2 gap-6 p-8 w-full h-full relative z-10">
                  <div className="bg-[#222] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#333] hover:border-[#D8FF44] hover:bg-[#D8FF44]/5 transition-all duration-300 group/item">
                    <Hotel className="w-12 h-12 text-gray-400 group-hover/item:text-[#D8FF44] transition-colors" />
                    <span className="text-sm font-semibold text-gray-400 group-hover/item:text-white transition-colors tracking-wide uppercase">Hotels</span>
                  </div>
                  <div className="bg-[#222] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#333] hover:border-[#D8FF44] hover:bg-[#D8FF44]/5 transition-all duration-300 group/item">
                    <Plane className="w-12 h-12 text-gray-400 group-hover/item:text-[#D8FF44] transition-colors" />
                    <span className="text-sm font-semibold text-gray-400 group-hover/item:text-white transition-colors tracking-wide uppercase">Flights</span>
                  </div>
                  <div className="bg-[#222] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#333] hover:border-[#D8FF44] hover:bg-[#D8FF44]/5 transition-all duration-300 group/item">
                    <SmartphoneNfc className="w-12 h-12 text-gray-400 group-hover/item:text-[#D8FF44] transition-colors" />
                    <span className="text-sm font-semibold text-gray-400 group-hover/item:text-white transition-colors tracking-wide uppercase">eSIM</span>
                  </div>
                  <div className="bg-[#222] rounded-2xl flex flex-col items-center justify-center gap-4 border border-[#333] hover:border-[#D8FF44] hover:bg-[#D8FF44]/5 transition-all duration-300 group/item">
                    <Car className="w-12 h-12 text-gray-400 group-hover/item:text-[#D8FF44] transition-colors" />
                    <span className="text-sm font-semibold text-gray-400 group-hover/item:text-white transition-colors tracking-wide uppercase">Transfers</span>
                  </div>
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
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto relative">
            {/* Center decorative line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4A4A4A] to-transparent transform -translate-x-1/2"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-gray-400 space-y-6 text-lg leading-relaxed md:pr-8"
            >
              <div className="w-12 h-12 bg-[#1A1A1A] border border-[#4A4A4A] rounded-xl flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-[#D8FF44]" />
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-400 space-y-6 text-lg leading-relaxed md:pl-8"
            >
              <div className="w-12 h-12 bg-[#1A1A1A] border border-[#4A4A4A] rounded-xl flex items-center justify-center mb-6 md:ml-auto">
                <CheckCircle2 className="w-6 h-6 text-[#D8FF44]" />
              </div>
              <p className="md:text-right">
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
                        required
                        className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-1 focus:ring-[#D8FF44] transition-colors" 
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        id="companyName" 
                        required
                        className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-1 focus:ring-[#D8FF44] transition-colors" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-1 focus:ring-[#D8FF44] transition-colors" 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-1 focus:ring-[#D8FF44] transition-colors" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      required
                      className="w-full bg-[#0A0A0A] border border-[#4A4A4A] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D8FF44] focus:ring-1 focus:ring-[#D8FF44] transition-colors resize-none" 
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl bg-[#D8FF44] text-[#0A0A0A] font-bold text-lg hover:bg-[#D3FF2B] transition-colors mt-4"
                  >
                    Submit Message <ArrowRight className="w-5 h-5" />
                  </button>
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
                src="/assets/corevia/corevia-network-logo.svg" 
                alt="Corevia Network" 
                className="h-10 md:h-12 w-auto mb-6 brightness-0 invert"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/corevia/corevia-network-logo.png";
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
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Corevia Network. All rights reserved.
            </p>
            
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
    </div>
  );
}
