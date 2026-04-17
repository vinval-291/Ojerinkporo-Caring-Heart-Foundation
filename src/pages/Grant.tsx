import { useState } from 'react';
import { 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  FileText, 
  Users, 
  ChevronRight, 
  ChevronDown,
  Phone, 
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Compass,
  Zap,
  Shield,
  Clock,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const eligibilityCriteria = [
  {
    id: "01",
    title: "Registered Business",
    desc: "Be a registered business entity with appropriate documentation (CAC).",
    icon: Shield
  },
  {
    id: "02",
    title: "Ebonyi Indigene",
    desc: "Applicants must be indigenes of Ebonyi State committed to local growth.",
    icon: Compass
  },
  {
    id: "03",
    title: "Business Plan",
    desc: "Possess a detailed plan outlining clear vision, mission, and growth strategy.",
    icon: FileText
  },
  {
    id: "04",
    title: "Innovation",
    desc: "Demonstrate a strong entrepreneurial spirit and a commitment to innovation.",
    icon: Zap
  },
  {
    id: "05",
    title: "Financial Need",
    desc: "Demonstrate verifiable financial need and potential for significant impact.",
    icon: DollarSign
  }
];

const requirements = [
  {
    title: "Completed grant application form",
    desc: "Fill out the application form with all necessary personal and business details. This is the foundational step for your venture."
  },
  {
    title: "Business Plan",
    desc: "A clear and detailed business plan outlining your goals, market analysis, and the strategies you'll employ to achieve success."
  },
  {
    title: "Financial Projections",
    desc: "Provide a breakdown of your expected revenue, expenses, and cash flow over the next few years to show viability."
  },
  {
    title: "Letters of Recommendation",
    desc: "Submit two or more letters from individuals who can vouch for your business skills, character, and dedication."
  },
  {
    title: "Any other supporting documentation",
    desc: "Attach relevant certifications, awards, media mentions, or other documents that support your business credibility."
  }
];

const timeline = [
  {
    date: "21 November 2025",
    title: "Application Deadline",
    desc: "All required documents and forms must be submitted by this date to be considered."
  },
  {
    date: "30 November 2025",
    title: "Review of Applications",
    desc: "Our team will conduct a thorough evaluation based on the set selection criteria."
  },
  {
    date: "04-06 December 2025",
    title: "Interviews",
    desc: "Shortlisted applicants will be invited to discuss their business ideas and plans in detail."
  },
  {
    date: "02 January 2026",
    title: "Grant Awards Announced",
    desc: "Successful applicants will be notified and official announcements made."
  },
  {
    date: "From 03 January 2026",
    title: "Grant Disbursement",
    desc: "Funding distribution begins for selected recipients to support their business development."
  }
];

const selectionCriteria = [
  {
    question: "The potential for the business to create jobs and economic growth",
    answer: "We prioritize businesses that demonstrate the capacity to stimulate economic growth and create employment opportunities, benefiting both the local community and the wider economy."
  },
  {
    question: "The innovation and originality of the business concept",
    answer: "Businesses with unique, innovative concepts that bring fresh solutions or new perspectives to their respective industries are given preference. We value originality and creative approaches to addressing current challenges."
  },
  {
    question: "The strength of the business plan and financial projections",
    answer: "A solid, well-structured business plan paired with realistic financial projections is essential. We look for clear goals, actionable strategies, and evidence of careful planning that reflect the venture’s sustainability and growth potential."
  },
  {
    question: "The entrepreneur’s experience and qualifications",
    answer: "The skills, background, and expertise of the entrepreneur play a crucial role in our evaluation. We seek individuals with the drive, knowledge, and experience needed to successfully execute their vision."
  },
  {
    question: "The alignment of the business with [your organization’s] mission and values",
    answer: "We support businesses that resonate with our foundation’s commitment to empowering individuals and fostering sustainable development. Ventures that align with our values and mission are given priority in the selection process."
  }
];

const FORM_URL = "https://ojerinkporofoundation.com/";

export default function Grant() {
  const [openCriteria, setOpenCriteria] = useState<number | null>(0);
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-brand-navy text-white overflow-hidden pt-20">
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-royal/5 skew-x-[-12deg] translate-x-1/4 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-max relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6 lg:px-12 py-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5 }}
                className="text-brand-accent font-bold tracking-[0.3em] uppercase text-xs block"
              >
                2025/2026 Empowerment Initiative
              </motion.span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter">
                Empowering <br />
                <span className="text-brand-accent italic font-serif">Ebonyi’s</span> <br />
                Visionaries.
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed font-light">
              Announcing a <span className="text-white font-medium">NGN100,000,000</span> grant dedicated to fueling the ambitions of local entrepreneurs and sustainable economic growth.
            </p>

            <div className="flex flex-wrap gap-8 items-center pt-4">
              <a 
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_20px_50px_rgba(242,125,38,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2 group"
              >
                Apply Today 
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-gray-600 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/50 font-bold">
                  Join 500+ Applicants
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] max-h-[70vh]">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop" 
                alt="Ebonyi Entrepreneurs" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
            </div>
            
            {/* Artistic Accents */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-accent rounded-[40px] -z-10 rotate-12 blur-[1px] opacity-10" />
            <div className="absolute -bottom-8 -left-8 bg-white text-brand-navy p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-gray-100">
               <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center">
                  <Zap className="text-brand-accent w-6 h-6 shrink-0" />
               </div>
               <div>
                 <div className="text-xs font-bold uppercase tracking-tighter opacity-50 leading-none mb-1">Impact Goal</div>
                 <div className="font-serif italic font-medium leading-none">Positive economic growth</div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Introduction */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-brand-royal font-bold tracking-widest uppercase text-xs">Ojerinkporo Caring Heart Foundation</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy leading-tight">
                Launch of Entrepreneurship <br />
                <span className="text-brand-accent italic">Grant Program</span>
              </h2>
            </div>
            
            <p className="text-brand-text-light leading-relaxed text-lg">
              The Ojerinkporo Caring Heart Foundation is pleased to announce the launch of its Entrepreneurship Grant Program, designed to support innovative and promising entrepreneurial ventures. This program aims to provide financial assistance and mentorship to aspiring entrepreneurs committed to driving economic growth and creating positive social impact.
            </p>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-brand-navy border-b border-gray-100 pb-4">Program Objectives</h3>
              <ul className="space-y-4">
                {[
                  "To foster the development of innovative and sustainable entrepreneurial ventures.",
                  "To provide financial support to entrepreneurs who demonstrate potential for high-impact businesses.",
                  "To connect entrepreneurs with industry experts, mentors, and resources."
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                    <span className="text-brand-text-light">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="bg-brand-bg p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ojerinkporofoundation.com/" 
                  alt="QR Code" 
                  className="rounded-2xl border-4 border-white shadow-sm w-full aspect-square object-contain p-4 bg-white"
                />
                <div className="flex flex-col justify-center space-y-2">
                  <div className="bg-brand-navy p-3 rounded-lg text-white text-xs font-bold text-center">REGISTER NOW</div>
                  <div className="text-[10px] text-gray-500 font-mono break-all text-center">ojerinkporofoundation.com/grant</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-3xl border border-brand-royal/10">
                <p className="italic text-brand-navy font-medium leading-relaxed mb-4">
                  "We're committed to building resilient businesses and empowered communities. Through this grant, we're providing 100 million Naira to uplift entrepreneurs who are ready to make an impact."
                </p>
                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-brand-royal cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-brand-royal cursor-pointer transition-colors" />
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-brand-royal cursor-pointer transition-colors" />
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-brand-royal cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Use Section */}
      <section className="section-padding bg-brand-navy text-white relative">
        <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Eligibility */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h2 className="text-brand-accent font-bold tracking-widest uppercase text-xs">Eligibility Criteria</h2>
              <h3 className="text-2xl md:text-3xl font-bold">TO BE ELIGIBLE FOR THE GRANT PROGRAM, APPLICANTS MUST MEET THE FOLLOWING CRITERIA:</h3>
            </div>

            <div className="space-y-8">
              {eligibilityCriteria.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-center group"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-brand-accent flex items-center justify-center shrink-0 group-hover:bg-brand-accent transition-colors">
                    <item.icon className="w-8 h-8 text-brand-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-brand-accent font-mono text-xl font-bold">{item.id}</span>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Amount & Use */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[40px] space-y-6">
                <h3 className="text-2xl font-bold text-brand-accent">Grant Amount and Use</h3>
                <p className="text-gray-300 leading-relaxed">
                  The foundation awards 100 million Naira to entrepreneurs with innovative business ideas. The grant amount per person will range from <span className="text-white font-bold">₦1,000,000 to ₦3,000,000</span>, depending on the project’s specific needs and the application’s evaluation.
                </p>
                
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h4 className="text-xl font-bold">Grant Use</h4>
                  <p className="text-gray-400 text-sm">Grant funds can be used for:</p>
                  <ul className="space-y-3">
                    {[
                      "Expansion of existing businesses with prove of concept.",
                      "Working capital for start-ups."
                    ].map((use, i) => (
                      <li key={i} className="flex gap-3 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                        <span className="text-gray-200">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <a 
                    href={FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white py-4 rounded-2xl font-bold transition-all"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className="section-padding bg-brand-bg">
        <div className="container-max text-center max-w-5xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-brand-royal font-bold tracking-widest uppercase text-xs">Application Requirements for the Ojerinkporo Foundation Grant</span>
            <p className="text-brand-text-light">To apply for the Ojerinkporo Foundation Grant, interested applicants must provide the following documents:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requirements.map((req, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={cn(
                  "bg-white p-8 rounded-3xl border border-brand-green/20 shadow-sm flex flex-col text-left space-y-4",
                  i === requirements.length - 1 && "lg:col-span-2"
                )}
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-brand-green" />
                </div>
                <h4 className="text-xl font-bold text-brand-navy">{req.title}</h4>
                <p className="text-brand-text-light text-sm leading-relaxed">{req.desc}</p>
              </motion.div>
            ))}
          </div>

          <a 
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-brand-royal py-5 md:py-8 px-6 md:px-12 rounded-[2rem] text-white font-bold text-sm md:text-xl shadow-2xl hover:bg-brand-royal/90 transition-all flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 group"
          >
            <div className="flex flex-col md:items-start text-center md:text-left">
              <span className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1">Final Submission Deadline</span>
              <span className="leading-tight">Application form must be filled out latest by 21 of Nov, 2025.</span>
              <span className="text-brand-accent text-xs md:text-sm mt-1">Click here to begin your application today</span>
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 md:w-8 md:h-8 animate-pulse text-brand-accent" />
            </div>
          </a>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-brand-navy">Selection Criteria</h2>
              <p className="text-brand-text-light">All applications for the Ojerinkporo Caring Heart Foundation Grant will be carefully evaluated using the following criteria to ensure alignment with our mission and objectives:</p>
            </div>

            <div className="space-y-3">
              {selectionCriteria.map((item, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "rounded-2xl border transition-all duration-300 overflow-hidden",
                    openCriteria === i 
                      ? "border-brand-accent bg-brand-bg shadow-sm" 
                      : "border-gray-100 bg-white hover:border-brand-royal/30"
                  )}
                >
                  <button 
                    onClick={() => setOpenCriteria(openCriteria === i ? null : i)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4"
                  >
                    <span className={cn(
                      "font-bold text-sm md:text-base transition-colors",
                      openCriteria === i ? "text-brand-navy" : "text-brand-text-dark"
                    )}>
                      {item.question}
                    </span>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all",
                      openCriteria === i ? "bg-brand-accent text-white rotate-180" : "bg-brand-bg text-brand-navy"
                    )}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openCriteria === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-brand-text-light text-sm leading-relaxed border-t border-brand-accent/10 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <img 
              src="https://i.postimg.cc/bJYSPvSF/presentation-3.jpg" 
              alt="Grant Presentation" 
              className="rounded-[40px] shadow-2xl w-full h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-brand-bg">
        <div className="container-max text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy">Grant Application Timeline</h2>
            <p className="text-brand-text-light max-w-2xl mx-auto uppercase tracking-widest font-bold text-sm">KEEP TRACK OF THESE IMPORTANT DATES TO ENSURE YOUR APPLICATION STAYS ON SCHEDULE:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timeline.slice(0, 3).map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="text-brand-accent font-bold text-sm uppercase">{item.title}</div>
                <div className="text-2xl font-bold text-brand-navy">{item.date}</div>
                <p className="text-brand-text-light text-sm">{item.desc}</p>
              </div>
            ))}
            {timeline.slice(3).map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 lg:col-span-1 md:col-span-1 first:ml-0">
                <div className="text-brand-accent font-bold text-sm uppercase">{item.title}</div>
                <div className="text-2xl font-bold text-brand-navy">{item.date}</div>
                <p className="text-brand-text-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <a 
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-accent hover:bg-brand-accent/90 text-white px-12 py-5 rounded-full font-bold text-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              Apply Now <Briefcase className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-brand-navy py-24 text-white">
        <div className="container-max px-6 text-center max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl font-bold border-b border-white/10 pb-8 tracking-tight">Contact Information</h2>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            For additional details, inquiries, or to request an application form, please reach out to us. Our team is ready to assist you with any questions regarding the application process, criteria, or requirements. We look forward to supporting your journey toward impactful entrepreneurship!
          </p>
        </div>
      </section>
    </div>
  );
}
