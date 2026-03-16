import React, { useRef, useEffect } from 'react';
import { 
  Mail, ArrowRight, Briefcase, Code, User, Phone, LineChart, Megaphone, Bot, Linkedin, Github, MapPin, PenTool, Download, ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { LocationTag } from './components/ui/location-tag';
import { FadeIn, WordReveal, AnimatedNumber, AmbientBackground } from './components/ui/animations';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom Scroll Snapping for Mouse Wheels
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isAnimating = false;

    const handleWheel = (e: WheelEvent) => {
      // Only handle vertical scrolls
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      
      // Prevent default to hijack the scroll
      e.preventDefault();

      if (isAnimating) return;

      const delta = e.deltaY;
      // Threshold to ignore tiny accidental scrolls
      if (Math.abs(delta) < 10) return;

      isAnimating = true;
      const direction = delta > 0 ? 1 : -1;
      const sectionHeight = container.offsetHeight;
      const currentScroll = container.scrollTop;
      
      // Calculate current index and target index
      const currentIndex = Math.round(currentScroll / sectionHeight);
      const sections = container.querySelectorAll('section');
      const targetIndex = Math.max(0, Math.min(currentIndex + direction, sections.length - 1));

      container.scrollTo({
        top: targetIndex * sectionHeight,
        behavior: 'smooth'
      });

      // Lock for a duration to allow the smooth scroll to complete
      setTimeout(() => {
        isAnimating = false;
      }, 800);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="font-display bg-[#E0E0E0] text-[#111] h-[100dvh] w-full overflow-hidden relative">
      
      <AmbientBackground />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
        <FadeIn direction="down" delay={0.1} viewport={{ once: true }} className="pointer-events-auto flex items-center gap-2">
          <span className="font-semibold tracking-tight text-lg">Julius S.</span>
        </FadeIn>
        
        <FadeIn direction="down" delay={0.2} viewport={{ once: true }} className="hidden lg:flex items-center gap-6 pointer-events-auto">
          {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-black/40 hover:text-black transition-colors"
            >
              {item}
            </a>
          ))}
        </FadeIn>

        <FadeIn direction="down" delay={0.3} viewport={{ once: true }} className="pointer-events-auto flex items-center gap-3">
          <LocationTag city="Tempe" country="AZ" timezone="MST" theme="light" />
          <div className="flex items-center gap-2 ml-4">
            <a href="https://linkedin.com/in/julius-schaefer-8358702b5/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Linkedin size={14} />
            </a>
            <a href="mailto:julius@schaeferfamily.ch" className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
              <Mail size={14} />
            </a>
          </div>
        </FadeIn>
      </header>

      {/* CSS Scroll Snap Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth relative z-10"
      >
        {/* Panel 1: Hero */}
        <section id="home" className="min-h-[100dvh] w-full snap-start snap-always flex flex-col justify-center px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-8">
              <FadeIn delay={0.2}>
                <img 
                  src="/profile.jpg" 
                  alt="Julius Schaefer" 
                  className="w-16 h-16 rounded-full object-cover shadow-sm border border-black/5" 
                />
              </FadeIn>
              <FadeIn delay={0.3} direction="left">
                <div className="flex items-center gap-2 px-4 py-2 bg-transparent rounded-full border border-black/10">
                  <span className="text-sm font-medium text-black/60 uppercase tracking-widest text-[10px]">Student / Developer</span>
                </div>
              </FadeIn>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[1.05] mb-8">
              <FadeIn delay={0.4}><span className="text-black/40 block mb-2">Computer Science @ ASU</span></FadeIn>
              <WordReveal text="Julius Schaefer" delay={0.5} className="text-black font-semibold" />
            </h1>

            <FadeIn delay={0.7} className="text-lg sm:text-xl text-black/60 max-w-2xl leading-relaxed mb-10">
              Bringing a multifaceted perspective from hands-on projects spanning app development, asset management, digital marketing, and design.
            </FadeIn>

            <FadeIn delay={0.8} className="flex flex-wrap items-center gap-4">
              <motion.a 
                href="#projects" 
                initial="initial"
                whileHover="hover"
                className="relative pl-6 pr-2 py-2 bg-[#81D093] text-black rounded-full font-medium overflow-hidden flex items-center gap-4 shadow-sm group"
              >
                <motion.div 
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 12 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-[6px] top-1/2 -translate-y-1/2 w-9 h-9 bg-black rounded-full z-0"
                />
                <motion.span 
                  variants={{
                    initial: { color: "#000" },
                    hover: { color: "#fff" }
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  View Work
                </motion.span>
                <motion.span 
                  variants={{
                    initial: { rotate: 0 },
                    hover: { rotate: 45 }
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 bg-transparent text-white rounded-full p-2 flex items-center justify-center"
                >
                  <ArrowUpRight size={18} />
                </motion.span>
              </motion.a>
              <a href="https://linkedin.com/in/julius-schaefer-8358702b5/" target="_blank" rel="noreferrer" className="px-6 py-3.5 rounded-full font-medium border border-black/20 hover:bg-black hover:text-white transition-colors flex items-center gap-2">
                <Linkedin size={18} /> LinkedIn
              </a>
            </FadeIn>
          </div>
        </section>

        {/* Panel 2: About */}
        <section id="about" className="min-h-[100dvh] w-full snap-start snap-always flex flex-col justify-center px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-12">
              <FadeIn delay={0.1}><span className="text-black/40 block mb-2">My focus is simple</span></FadeIn>
              <WordReveal text="Learn & Create" delay={0.2} className="text-black font-semibold" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ASU Card */}
              <FadeIn delay={0.3} className="col-span-1 md:col-span-2 bg-[#F4F4F5] rounded-[2rem] p-8 lg:p-10 border border-black/5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-[#E0E0E0] text-black rounded-2xl flex items-center justify-center">
                      <Briefcase size={24} />
                    </div>
                    <AnimatedNumber value={4} decimals={2} suffix=" GPA" delay={0.5} className="px-4 py-1.5 bg-[#81D093]/20 text-green-800 rounded-full text-sm font-medium" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Arizona State University</h3>
                  <p className="text-black/60">B.S., Computer Science • Expected May 2029</p>
                </div>
              </FadeIn>

              {/* High School Card */}
              <FadeIn delay={0.4} className="col-span-1 bg-[#F4F4F5] rounded-[2rem] p-8 lg:p-10 border border-black/5 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Kantonsschule Alpenquai</h3>
                  <p className="text-black/60 mb-8 text-sm">Lucerne, Switzerland • Arts, Design & Business</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <AnimatedNumber value={4.93} decimals={2} delay={0.6} className="text-4xl font-semibold" />
                    <span className="text-black/40 font-medium">Grade</span>
                  </div>
                  <p className="text-black/40 text-xs mt-2">Graduated Aug 2024</p>
                </div>
              </FadeIn>

              {/* Skills Card */}
              <FadeIn delay={0.5} className="col-span-1 md:col-span-3 bg-[#111] text-white rounded-[2rem] p-8 lg:p-12 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3"><Code size={24} className="text-white/50" /> Programming</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2 font-medium text-white/80"><span>Swift</span></div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden"><motion.div initial={{width:0}} whileInView={{width:'92%'}} transition={{duration:1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6}} viewport={{once: true}} className="h-full bg-[#81D093] rounded-full" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2 font-medium text-white/80"><span>Java</span></div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden"><motion.div initial={{width:0}} whileInView={{width:'72%'}} transition={{duration:1.5, ease: [0.16, 1, 0.3, 1], delay: 0.7}} viewport={{once: true}} className="h-full bg-[#81D093] rounded-full" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2 font-medium text-white/80"><span>Python</span></div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden"><motion.div initial={{width:0}} whileInView={{width:'35%'}} transition={{duration:1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8}} viewport={{once: true}} className="h-full bg-[#81D093] rounded-full" /></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3"><PenTool size={24} className="text-white/50" /> Design & Tools</h3>
                    <div className="flex flex-wrap gap-3">
                      {['Flutter Flow', 'macOS', 'TradingView', 'Adobe Photoshop', 'Adobe InDesign', 'Canva', 'Logo Design', 'Apple App Design'].map((skill, i) => (
                        <FadeIn key={skill} delay={0.6 + (i * 0.05)} direction="up">
                          <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/10 inline-block">
                            {skill}
                          </span>
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Panel 3: Experience */}
        <section id="experience" className="min-h-[100dvh] w-full snap-start snap-always flex flex-col justify-center px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-12">
              <FadeIn delay={0.1}><span className="text-black/40 block mb-2">Proven track record</span></FadeIn>
              <WordReveal text="Professional Experience" delay={0.2} className="text-black font-semibold" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience 1 */}
              <FadeIn delay={0.3} className="bg-[#F4F4F5] rounded-[2rem] p-8 lg:p-10 border border-black/5 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#E0E0E0] text-black rounded-2xl flex items-center justify-center shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Asset Management Intern</h3>
                    <p className="text-black/60 text-sm">Merill Funds • Valletta, Malta</p>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60 mb-4">Feb 2025 – Apr 2025 • 50 hrs/week</span>
                </div>
                <ul className="space-y-3 text-black/70 text-sm leading-relaxed">
                  <li className="flex gap-3"><ArrowRight size={16} className="shrink-0 text-black/20 mt-0.5" /> Built AI automation tool, saving the marketing team significant monthly analysis hours.</li>
                  <li className="flex gap-3"><ArrowRight size={16} className="shrink-0 text-black/20 mt-0.5" /> Drove LinkedIn and content strategies, boosting engagement and CTR by +40%, doubling viewing duration, and raising subscriber CTR 4x.</li>
                </ul>
              </FadeIn>

              {/* Experience 2 */}
              <FadeIn delay={0.4} className="bg-[#F4F4F5] rounded-[2rem] p-8 lg:p-10 border border-black/5 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#E0E0E0] text-black rounded-2xl flex items-center justify-center shrink-0">
                    <Megaphone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Co-founder</h3>
                    <p className="text-black/60 text-sm">Digital Marketing Venture • Cologne, Germany</p>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60 mb-4">Summer 2022 – Fall 2023</span>
                </div>
                <ul className="space-y-3 text-black/70 text-sm leading-relaxed">
                  <li className="flex gap-3"><ArrowRight size={16} className="shrink-0 text-black/20 mt-0.5" /> Leveraged expertise from a 40-hour Google marketing certification.</li>
                  <li className="flex gap-3"><ArrowRight size={16} className="shrink-0 text-black/20 mt-0.5" /> Developed hands-on experience in sales through cold calling and client outreach.</li>
                  <li className="flex gap-3"><ArrowRight size={16} className="shrink-0 text-black/20 mt-0.5" /> Applied design skills to build the website, craft the logo, and design persuasive PowerPoint sales presentations.</li>
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Panel 4: Projects */}
        <section id="projects" className="min-h-[100dvh] w-full snap-start snap-always flex flex-col justify-center px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-12">
              <FadeIn delay={0.1}><span className="text-black/40 block mb-2">Building to solve</span></FadeIn>
              <WordReveal text="Selected Projects" delay={0.2} className="text-black font-semibold" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project 1 */}
              <FadeIn delay={0.3} className="bg-[#F4F4F5] rounded-[2rem] p-4 border border-black/5 shadow-sm flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
                  <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop" alt="Trading" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-sm">
                    <LineChart size={18} />
                  </div>
                </div>
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#81D093] transition-colors">Algorithmic Trading</h3>
                  <p className="text-black/60 text-sm leading-relaxed mb-6 flex-1">
                    Successfully passed a firm's due diligence evaluation. Secured a <AnimatedNumber value={10000} prefix="$" delay={0.5} className="font-semibold text-black" /> trading account and achieved over <AnimatedNumber value={100} suffix="%" delay={0.6} className="font-semibold text-black" /> return in a paper trading account by analyzing leveraged FX and crypto markets.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60">Python</span>
                    <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60">TradingView</span>
                  </div>
                </div>
              </FadeIn>

              {/* Project 2 */}
              <FadeIn delay={0.4} className="bg-[#F4F4F5] rounded-[2rem] p-4 border border-black/5 shadow-sm flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
                  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop" alt="AI Automation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-sm">
                    <Bot size={18} />
                  </div>
                </div>
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#81D093] transition-colors">Marketing AI Tool</h3>
                  <p className="text-black/60 text-sm leading-relaxed mb-6 flex-1">
                    Built an AI automation tool during my internship at Merill Funds, saving the marketing team significant monthly analysis hours and streamlining content strategy workflows.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60">Python</span>
                    <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60">AI/ML</span>
                  </div>
                </div>
              </FadeIn>

              {/* Project 3 */}
              <FadeIn delay={0.5} className="bg-[#F4F4F5] rounded-[2rem] p-4 border border-black/5 shadow-sm flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
                  <img src="https://images.unsplash.com/photo-1622228516086-4b82c613e54b?q=80&w=1000&auto=format&fit=crop" alt="Padel Club" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-sm">
                    <User size={18} />
                  </div>
                </div>
                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#81D093] transition-colors">Padel Club Founder</h3>
                  <p className="text-black/60 text-sm leading-relaxed mb-6 flex-1">
                    Founded and established a new sports club in Switzerland to build a community around the growing sport of Padel. Led weekly practices and recruited new members.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60">Leadership</span>
                    <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/60">Community</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Panel 5: Contact */}
        <section id="contact" className="min-h-[100dvh] w-full snap-start snap-always flex flex-col justify-center px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto w-full text-center">
            <FadeIn delay={0.1} className="max-w-4xl mx-auto bg-[#F4F4F5] rounded-[3rem] p-12 md:p-20 border border-black/5 shadow-sm">
              <h2 className="text-4xl sm:text-6xl font-medium tracking-tight mb-6">
                <FadeIn delay={0.2}><span className="text-black/40 block mb-2">Ready to work?</span></FadeIn>
                <WordReveal text="Let's connect." delay={0.3} className="text-black font-semibold justify-center" />
              </h2>
              <FadeIn delay={0.5} className="text-lg text-black/60 mb-10 max-w-xl mx-auto">
                Currently open for new opportunities, collaborations, or just a chat about tech, trading, and design.
              </FadeIn>
              
              <FadeIn delay={0.6} className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <motion.a 
                  href="mailto:julius@schaeferfamily.ch" 
                  initial="initial"
                  whileHover="hover"
                  className="relative pl-6 pr-2 py-2 bg-[#81D093] text-black rounded-full font-medium overflow-hidden flex items-center gap-4 shadow-sm group"
                >
                  <motion.div 
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 12 }
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-[6px] top-1/2 -translate-y-1/2 w-9 h-9 bg-black rounded-full z-0"
                  />
                  <motion.span 
                    variants={{
                      initial: { color: "#000" },
                      hover: { color: "#fff" }
                    }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                  >
                    Email Me
                  </motion.span>
                  <motion.span 
                    variants={{
                      initial: { rotate: 0 },
                      hover: { rotate: 45 }
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 bg-transparent text-white rounded-full p-2 flex items-center justify-center"
                  >
                    <ArrowUpRight size={18} />
                  </motion.span>
                </motion.a>
                <a href="#" className="px-6 py-3.5 bg-transparent text-black rounded-full font-medium border border-black/20 hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Download size={18} /> Resume
                </a>
              </FadeIn>
              
              <FadeIn delay={0.7} className="flex flex-wrap justify-center gap-8 pt-8 border-t border-black/5">
                <a href="tel:4807432950" className="text-sm font-medium text-black/60 hover:text-black transition-colors flex items-center gap-2">
                  <Phone size={16} /> 480 743-29 50
                </a>
                <a href="https://linkedin.com/in/julius-schaefer-8358702b5/" target="_blank" rel="noreferrer" className="text-sm font-medium text-black/60 hover:text-black transition-colors flex items-center gap-2">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="#" className="text-sm font-medium text-black/60 hover:text-black transition-colors flex items-center gap-2">
                  <Github size={16} /> GitHub
                </a>
              </FadeIn>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}
