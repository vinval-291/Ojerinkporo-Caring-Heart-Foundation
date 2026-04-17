import { motion } from 'motion/react';
import { Quote, Heart, Target, Users, Award, Briefcase, GraduationCap, Globe } from 'lucide-react';

export default function Visionary() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/fLkc10TL/davric-ceo2.jpg" 
            alt="Visionary Background" 
            className="w-full h-full object-cover opacity-30 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-transparent to-brand-navy"></div>
        </div>
        
        <div className="container-max relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-sm font-bold tracking-widest uppercase">
              The Heart Behind the Mission
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Meet Our <br />
              <span className="text-brand-accent italic font-serif">Visionary</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              A journey of numbers, success, and an unwavering commitment to nurturing hope in underserved communities.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-20 bg-gradient-to-b from-brand-accent to-transparent"></div>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Image & Quick Stats */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-8 border-brand-bg">
                  <img 
                    src="https://i.postimg.cc/fLkc10TL/davric-ceo2.jpg" 
                    alt="Mr. Ikechukwu Agwu" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Floating Quote */}
                <div className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 bg-brand-accent p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl max-w-[240px] md:max-w-xs">
                  <Quote className="w-6 h-6 md:w-10 md:h-10 text-white/40 mb-2 md:mb-4" />
                  <p className="text-white font-serif italic text-base md:text-xl leading-relaxed">
                    "Service to humanity is the best work of life. We are the bridge to a better future."
                  </p>
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/20">
                    <p className="text-white font-bold text-xs md:text-base">— Mr. Ikechukwu Agwu (Iyke)</p>
                  </div>
                </div>
              </motion.div>

              {/* Expertise Grid */}
              <div className="grid grid-cols-2 gap-4 pt-12">
                {[
                  { label: 'Business Dev', icon: Briefcase },
                  { label: 'Real Estate', icon: Globe },
                  { label: 'Telecoms', icon: Award },
                  { label: 'Logistics', icon: Target },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-brand-bg rounded-2xl border border-gray-100">
                    <item.icon className="w-5 h-5 text-brand-royal" />
                    <span className="font-bold text-brand-navy text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Detailed Bio */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-brand-royal font-bold tracking-widest uppercase text-xs mb-4 block">The Founder's Story</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-brand-navy leading-tight">
                    A Legacy of <br />
                    <span className="text-brand-accent italic font-serif">Compassion & Excellence</span>
                  </h2>
                </motion.div>
                
                <div className="prose prose-lg max-w-none text-brand-text-light leading-relaxed space-y-8">
                  <p className="text-lg md:text-xl font-medium text-brand-navy first-letter:text-5xl md:first-letter:text-7xl first-letter:font-bold first-letter:text-brand-accent first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                    In the intricate medley of the corporate world, there emerges a luminary, a seasoned owner whose brilliance 
                    illuminates the realms of construction, Telecom Managed Services, Business Development, and beyond.
                  </p>
                  
                  <p>
                    Meet <strong className="text-brand-navy">Mr. Ikechukwu Agwu</strong>, fondly called Iyke, the visionary behind the Ojeri Nkporo Caring Hearts Foundation. With a Bachelor’s in Pure 
                    and Applied Mathematics from the prestigious University of Ibadan, Iyke is more than a strategist; he is an artist, who has interlaced 
                    numbers into a narrative of success and compassion.
                  </p>

                  <div className="bg-brand-bg/50 p-8 rounded-3xl border-l-4 border-brand-accent my-10">
                    <p className="italic text-brand-navy font-medium">
                      "His journey began as a one-man startup, Dav-Ric Nigeria Limited, in 2008. Today, it stands as a beacon of versatility with over 100 devoted professionals shaping its success story."
                    </p>
                  </div>

                  <p>
                    As the hands-on Chief Executive Officer of DAVRIC International Limited, Iyke’s expertise spans Business Development, Oil & Gas, 
                    Real Estate, Telecommunications, and Logistics. His legacy is not just a testament to strategic foresight and planning; it’s a 
                    narrative of resilience, determination, and a relentless pursuit of excellence. In the boardroom or amidst the field operations, 
                    Iyke is a leader and a self-sufficient innovator.
                  </p>

                  <p>
                    The high-performance teams he forges are not just workforces; they are growth catalysts. Iyke’s pursuit of knowledge is as boundless as his dedication to personal development, having attended several courses 
                    in leadership and management at <strong className="text-brand-navy">Harvard University</strong> and other prestigious institutions globally.
                  </p>

                  <p className="font-medium text-brand-navy">
                    Beyond certificates and accolades, his motivation is deeply rooted in connecting with people, fostering creativity, and embracing challenges with a resolute “can-do attitude.”
                  </p>
                </div>
              </div>

              {/* Education & Values Quick View */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div className="flex items-start gap-5">
                  <div className="bg-brand-royal/10 p-4 rounded-2xl shrink-0">
                    <GraduationCap className="w-8 h-8 text-brand-royal" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg mb-1">Academic Excellence</h4>
                    <p className="text-sm text-brand-text-light">B.Sc Pure & Applied Mathematics, University of Ibadan. Harvard Leadership Alumnus.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-brand-green/10 p-4 rounded-2xl shrink-0">
                    <Heart className="w-8 h-8 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg mb-1">Humanitarian Heart</h4>
                    <p className="text-sm text-brand-text-light">Committed to social responsibility through the Ojeri Nkporo Caring Hearts Foundation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-brand-navy text-white overflow-hidden relative">
        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <Award className="w-12 h-12 text-brand-accent" />
            </motion.div>
            <h2 className="text-3xl md:text-6xl font-bold leading-tight">
              "Service is not just an act; <br />
              <span className="text-brand-accent italic font-serif">it's a manifestation of faith."</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Iyke embodies a legacy of humble beginnings, steadfast faith in God, and an entrepreneurial acumen that seeks to uplift everyone he encounters.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-royal/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 md:py-32 bg-brand-bg">
        <div className="container-max">
          <div className="text-center mb-20">
            <span className="text-brand-royal font-bold tracking-widest uppercase text-xs mb-4 block">Our Foundation</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">Guided by Principles</h2>
            <p className="text-brand-text-light max-w-2xl mx-auto text-lg">The values that anchor our visionary's work and drive every initiative we undertake.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', icon: Award, desc: 'Honesty in every action and transparency in every impact we create.', color: 'text-brand-royal', bg: 'bg-brand-royal/10' },
              { title: 'Empathy', icon: Heart, desc: 'Understanding the needs of our community from a place of genuine care.', color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
              { title: 'Transparency', icon: Target, desc: 'Clear accountability in how we serve, grow, and manage resources.', color: 'text-brand-green', bg: 'bg-brand-green/10' },
              { title: 'Collaboration', icon: Users, desc: 'Working together to achieve more than we could ever do alone.', color: 'text-brand-navy', bg: 'bg-brand-navy/10' },
            ].map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] border border-gray-100 text-center space-y-6 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className={`${val.bg} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 group-hover:rotate-0 transition-transform`}>
                  <val.icon className={`w-10 h-10 ${val.color}`} />
                </div>
                <h4 className="text-2xl font-bold text-brand-navy">{val.title}</h4>
                <p className="text-brand-text-light text-base leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <div className="bg-brand-navy rounded-[32px] md:rounded-[60px] p-8 md:p-24 text-center text-white relative overflow-hidden">
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-bold">Join the Movement</h2>
              <p className="text-lg md:text-xl text-gray-400">
                Be a part of the legacy Iyke is building. Together, we can nurture more hearts and empower more lives.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4">
                <button className="bg-brand-accent hover:bg-brand-accent/90 text-white px-10 py-4 md:py-5 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105">
                  Partner With Us
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 md:py-5 rounded-full font-bold text-lg transition-all backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="90" cy="10" r="40" fill="currentColor" className="text-brand-accent" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
