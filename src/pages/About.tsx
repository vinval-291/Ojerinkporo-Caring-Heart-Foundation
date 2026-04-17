import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Target, Eye, ShieldCheck, Users, Heart, Zap, Share2, Facebook, Twitter, Linkedin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const values = [
  { title: 'Compassion', icon: Heart, desc: 'Acting with empathy and kindness in all we do.' },
  { title: 'Integrity', icon: ShieldCheck, desc: 'Maintaining transparency and honesty in our impact.' },
  { title: 'Empowerment', icon: Zap, desc: 'Equipping individuals with tools for self-sufficiency.' },
  { title: 'Community', icon: Users, desc: 'Building strong networks of support and growth.' },
];

const galleryImages = [
  { url: "https://i.postimg.cc/gkLdxPvn/arrival-1.jpg", caption: "Inauguration Ceremony Arrival" },
  { url: "https://i.postimg.cc/nLWfFRC0/speaker-1.jpg", caption: "Keynote Address" },
  { url: "https://i.postimg.cc/Bbkj2cY1/presentation-1.jpg", caption: "Empowerment Cheque Presentation" },
  { url: "https://i.postimg.cc/9X7wjsrL/equipment-1.jpg", caption: "Entrepreneurship Support" },
  { url: "https://i.postimg.cc/bwbzBjJ4/arrival-10.jpg", caption: "Distinguished Guests" },
  { url: "https://i.postimg.cc/X7KWfkzN/speaker-10.jpg", caption: "Personnel Recognition" },
];

export default function About() {
  const shareUrl = window.location.href;
  const shareText = "Learn about Ojerinkporo Caring Hearts Foundation and our mission to nurture hope.";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-brand-navy py-16 md:py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=2070&auto=format&fit=crop" 
            alt="Impact" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container-max relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Driven by Compassion. <br />
            <span className="text-brand-accent">Defined by Impact.</span>
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our journey is one of hope, resilience, and the unwavering belief that together, we can change the world.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy">Who We Are</h2>
            <div className="space-y-6 text-brand-text-light text-lg leading-relaxed">
              <p>
                Ojerinkporo Caring Hearts Foundation is a nonprofit organization dedicated to empowering and supporting underserved communities. With a deep commitment to making a positive difference, we focus on providing educational scholarships to students, granting resources and skill training to widows, and delivering essential aid to families facing hardship. Our foundation believes in the power of compassionate action and sustainable impact, aiming to break cycles of poverty and offer pathways to brighter, self-sufficient futures.
              </p>
              <p>
                Through our scholarship program, we enable young students to continue their education, opening doors to opportunity and hope. For widows and single mothers, we provide support and tools such as grinding machines, clothing, and other necessities, helping them build resilience and independence. Additionally, our community outreach efforts extend vital resources like food, clothing, and medical support to individuals and families most in need.
              </p>
              <p>
                Guided by the principles of empathy, integrity, and respect, Ojerinkporo Caring Hearts Foundation brings together dedicated volunteers, donors, and partners to create meaningful, lasting change. By addressing both immediate needs and long-term development, we strive to uplift lives and foster a sense of hope in every community we serve.
              </p>
              <div className="pt-6 flex items-center gap-4">
                <span className="text-sm font-bold text-brand-navy uppercase tracking-widest">Share our story:</span>
                <div className="flex gap-2">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-bg rounded-lg text-brand-navy hover:bg-brand-royal hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-bg rounded-lg text-brand-navy hover:bg-brand-royal hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-bg rounded-lg text-brand-navy hover:bg-brand-royal hover:text-white transition-all"><Linkedin className="w-5 h-5" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 mt-12">
              <img src="https://picsum.photos/seed/about1/400/500" className="rounded-3xl shadow-lg w-full h-[300px] object-cover" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/about2/400/300" className="rounded-3xl shadow-lg w-full h-[200px] object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-6">
              <img src="https://picsum.photos/seed/about3/400/300" className="rounded-3xl shadow-lg w-full h-[200px] object-cover" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/about4/400/500" className="rounded-3xl shadow-lg w-full h-[300px] object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-brand-bg">
        <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="bg-brand-royal/10 p-6 rounded-3xl mb-8">
              <Target className="w-12 h-12 text-brand-royal" />
            </div>
            <h3 className="text-3xl font-bold text-brand-navy mb-6">Our Mission</h3>
            <p className="text-brand-text-light text-lg leading-relaxed">
              To nurture hope and empower lives through sustainable change, education, and community support.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="bg-brand-green/10 p-6 rounded-3xl mb-8">
              <Eye className="w-12 h-12 text-brand-green" />
            </div>
            <h3 className="text-3xl font-bold text-brand-navy mb-6">Our Vision</h3>
            <p className="text-brand-text-light text-lg leading-relaxed">
              A world where everyone has the opportunity to thrive, regardless of their background or circumstances.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-4">Impact Gallery</h2>
            <p className="text-brand-text-light">A visual journey through our programs and the lives we've touched.</p>
          </div>
          <div className="relative group/carousel">
            {/* Navigation Arrows (Mobile Only) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 flex justify-between pointer-events-none px-2 md:hidden">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg text-brand-navy pointer-events-auto hover:bg-brand-accent hover:text-white transition-all active:scale-95"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg text-brand-navy pointer-events-auto hover:bg-brand-accent hover:text-white transition-all active:scale-95"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory pb-8 md:pb-0"
            >
              {galleryImages.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="min-w-[85%] sm:min-w-[48%] md:min-w-0 snap-center group relative rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={img.url} 
                      alt={img.caption} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <p className="text-white font-bold text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.caption}</p>
                    <div className="w-12 h-1 bg-brand-accent mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Swipe Indicator */}
            <div className="md:hidden flex justify-center gap-1 mt-4">
               <span className="text-[10px] text-brand-royal uppercase tracking-widest font-bold animate-pulse">Swipe to explore →</span>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:bg-brand-royal transition-all group"
            >
              View Full Gallery <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-brand-bg">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-4">Our Core Values</h2>
            <p className="text-brand-text-light">The pillars that guide our mission every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 text-center space-y-4 hover:shadow-md transition-shadow">
                <div className="bg-brand-bg w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <val.icon className="w-8 h-8 text-brand-navy" />
                </div>
                <h4 className="text-xl font-bold text-brand-navy">{val.title}</h4>
                <p className="text-brand-text-light text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-navy text-white text-center">
        <div className="container-max max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Support Our Work</h2>
          <p className="text-xl text-gray-400">
            Join us in our mission to create lasting change. Your contribution, no matter the size, makes a real difference.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-brand-accent hover:bg-brand-accent/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-all">
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
