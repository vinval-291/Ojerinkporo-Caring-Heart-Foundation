import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Users, GraduationCap, HeartHandshake, Briefcase, Quote, Heart, Share2, Facebook, Twitter, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Counter } from '@/src/components/Counter';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    image: "https://i.postimg.cc/76JtcRvj/Hero-1.png",
    title: "Nurturing Hope.",
    subtitle: "Empowering Lives.",
    text: "Creating sustainable change through education, empowerment, and community support.",
    accent: "Humanity"
  },
  {
    image: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=2070&auto=format&fit=crop",
    title: "The Gift of Giving.",
    subtitle: "A Future for All.",
    text: "Your support provides the tools for underserved communities to thrive and grow.",
    accent: "Giving"
  },
  {
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2070&auto=format&fit=crop",
    title: "Compassionate Care.",
    subtitle: "Dignity Restored.",
    text: "Restoring hope to widows and vulnerable families through dedicated outreach.",
    accent: "Care"
  },
  {
    image: "https://i.postimg.cc/zBH2MQmM/hero-2.png",
    title: "Stronger Together.",
    subtitle: "Community Impact.",
    text: "Building a resilient network of support where every individual has a voice.",
    accent: "Collaboration"
  }
];

const impactMetrics = [
  { label: 'Lives Impacted', value: 10000, suffix: '+' },
  { label: 'Scholarships Awarded', value: 500, suffix: '+' },
  { label: 'Families Supported', value: 2500, suffix: '+' },
  { label: 'Active Volunteers', value: 150, suffix: '+' },
];

const programs = [
  {
    title: "Widows’ Support",
    description: "Empowering women with tools, resources, and dignity to rebuild their lives.",
    icon: Users,
    color: "text-brand-green",
    bg: "bg-brand-green/10"
  },
  {
    title: "Scholarships",
    description: "Opening doors to education and brighter futures for underserved children.",
    icon: GraduationCap,
    color: "text-brand-royal",
    bg: "bg-brand-royal/10"
  },
  {
    title: "Community Outreach",
    description: "Providing food, care, and hope to vulnerable families in our communities.",
    icon: HeartHandshake,
    color: "text-brand-accent",
    bg: "bg-brand-accent/10"
  },
  {
    title: "Entrepreneurship Grants",
    description: "Helping small businesses grow and thrive through sustainable funding.",
    icon: Briefcase,
    color: "text-brand-green-dark",
    bg: "bg-brand-green-dark/10"
  }
];

const testimonials = [
  {
    quote: "This foundation changed my life. Through their scholarship program, I was able to complete my nursing degree and now I'm serving my own community.",
    author: "Blessing Okoro",
    role: "Scholarship Recipient",
    image: "https://picsum.photos/seed/person1/100/100"
  },
  {
    quote: "As a widow, I felt lost. OCHF provided me with a micro-grant and vocational training. Today, I run a successful tailoring business and can support my kids.",
    author: "Mariam Yusuf",
    role: "Entrepreneur Grantee",
    image: "https://picsum.photos/seed/person2/100/100"
  },
  {
    quote: "Volunteering with OCHF has been the most fulfilling experience. Seeing the direct impact of our outreach on families is truly heartwarming.",
    author: "David Adebayo",
    role: "Active Volunteer",
    image: "https://picsum.photos/seed/person3/100/100"
  },
  {
    quote: "The community outreach program brought food and medical supplies to our village when we needed it most. They are true angels on earth.",
    author: "Samuel Ibe",
    role: "Community Member",
    image: "https://picsum.photos/seed/person4/100/100"
  },
  {
    quote: "Their commitment to transparency and real impact is why I choose to support OCHF every month. I know my contribution is making a difference.",
    author: "Sarah Jenkins",
    role: "Monthly Donor",
    image: "https://picsum.photos/seed/person5/100/100"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const shareUrl = window.location.origin;
  const shareText = "Be the reason someone smiles today. Support OCHF.";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Sliding */}
      <section className="relative h-[120vh] flex items-center overflow-hidden bg-brand-navy">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={heroSlides[currentSlide].image} 
              alt={heroSlides[currentSlide].accent} 
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-navy/60" />
          </motion.div>
        </AnimatePresence>

        <div className="container-max relative z-10 px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-white"
            >
              <span className="inline-block px-4 py-1.5 bg-brand-accent/20 backdrop-blur-sm border border-brand-accent/30 rounded-full text-brand-accent text-xs font-bold tracking-widest uppercase mb-6">
                {heroSlides[currentSlide].accent}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.1]">
                {heroSlides[currentSlide].title} <br />
                <span className="text-brand-accent">{heroSlides[currentSlide].subtitle}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                {heroSlides[currentSlide].text}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/donate" className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:scale-105">
                  Support the Mission
                </Link>
                <Link to="/volunteer" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold transition-all">
                  Become a Volunteer
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-10 right-10 z-20 flex gap-4">
          <button onClick={prevSlide} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentSlide === i ? "w-8 bg-brand-accent" : "bg-white/30"
              )}
            />
          ))}
        </div>
      </section>

      {/* Impact Strip - Animated Counters */}
      <section className="bg-brand-navy py-12 border-y border-white/5">
        <div className="container-max px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {impactMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-brand-accent">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
             <p className="text-gray-500 italic text-sm font-serif">Real impact. Real people. Real change.</p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-brand-bg">
        <div className="container-max">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6">What We Do</h2>
            <p className="text-brand-text-light leading-relaxed">
              Our initiatives are designed to address the core needs of our community, providing sustainable solutions and immediate relief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start group"
              >
                <div className={cn("p-4 rounded-2xl mb-6 transition-colors", program.bg)}>
                  <program.icon className={cn("w-8 h-8", program.color)} />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-4">{program.title}</h3>
                <p className="text-brand-text-light text-sm leading-relaxed mb-6 flex-grow">
                  {program.description}
                </p>
                <Link to={program.title === "Entrepreneurship Grants" ? "/events/grant" : "/about"} className="flex items-center gap-2 text-sm font-bold text-brand-royal group-hover:text-brand-accent transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding overflow-hidden">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1931&auto=format&fit=crop" 
                alt="Our Story" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-brand-accent p-8 rounded-3xl shadow-xl hidden md:block max-w-[240px]">
              <p className="text-white font-serif italic text-lg leading-snug">
                "Success is not just what we build, but the lives we uplift."
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-brand-royal font-bold tracking-widest uppercase text-xs">Who We Are</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy leading-tight">
                Driven by Compassion. <br />
                Defined by Impact.
              </h2>
            </div>
            <p className="text-brand-text-light leading-relaxed text-lg">
              The Ojerinkporo Caring Hearts Foundation is committed to uplifting underserved communities through sustainable and compassionate initiatives. We believe that every individual deserves the opportunity to thrive, regardless of their circumstances.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:bg-brand-royal transition-all group">
              Read Our Full Story <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial & Social Share */}
      <section className="section-padding bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-royal/20 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="container-max relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <Quote className="w-16 h-16 text-brand-accent/40 mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold">Stories That Inspire</h2>
          </div>

          <div className="relative group">
            <div className="overflow-hidden">
              <motion.div 
                className="flex -mx-3"
                animate={{ x: `-${testimonialIndex * (100 / visibleCards)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {testimonials.map((t, idx) => (
                  <div 
                    key={idx} 
                    className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3"
                  >
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[40px] h-full flex flex-col relative">
                      <p className="text-lg font-serif italic leading-relaxed mb-8 text-gray-200 flex-grow">
                        “{t.quote}”
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-accent shrink-0">
                          <img src={t.image} alt={t.author} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-base">{t.author}</div>
                          <div className="text-brand-accent text-xs uppercase tracking-widest font-semibold">{t.role}</div>
                        </div>
                      </div>
                      
                      {/* Social Share for Story */}
                      <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/10 hover:bg-brand-accent rounded-full transition-all"><Facebook className="w-3.5 h-3.5" /></a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/10 hover:bg-brand-accent rounded-full transition-all"><Twitter className="w-3.5 h-3.5" /></a>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-3 bg-white/10 hover:bg-brand-accent rounded-full text-white backdrop-blur-md transition-all z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-3 bg-white/10 hover:bg-brand-accent rounded-full text-white backdrop-blur-md transition-all z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mt-12">
            <Link to="/events" className="text-brand-accent hover:text-white font-bold flex items-center justify-center gap-2 transition-colors">
              Read More Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* High Conversion CTA */}
      <section className="section-padding bg-brand-accent text-white">
        <div className="container-max text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            You Can Make a <br className="hidden md:block" /> Difference Today
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Be the reason someone smiles today. Your support creates real change in the lives of those who need it most.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/donate" className="bg-brand-navy hover:bg-brand-royal text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-current" /> Donate Now
            </Link>
            <Link to="/volunteer" className="bg-white text-brand-navy hover:bg-gray-100 px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:scale-105">
              🤝 Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
