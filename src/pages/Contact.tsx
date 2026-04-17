import { motion } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';

const faqs = [
  {
    question: "What is the mission of the Ojerinkporo Caring Heart Foundation?",
    answer: "Our mission is to nurture hope and empower lives by providing educational scholarships, entrepreneurial grants, and essential resources to those in need within our community."
  },
  {
    question: "Who can benefit from the foundation’s programs?",
    answer: "Our programs are designed to support the underprivileged, students, widows, small business owners, and community members in need within Ebonyi State and neighboring regions."
  },
  {
    question: "How does the foundation select beneficiaries for its programs?",
    answer: "Beneficiaries are selected through a rigorous assessment process, considering the applicant’s needs, impact potential, and alignment with our foundation's goals."
  },
  {
    question: "What types of scholarships does the foundation offer?",
    answer: "We offer scholarships to secondary school students and other educational grants for students from underprivileged backgrounds who are committed to academic excellence."
  },
  {
    question: "How can I apply for an educational scholarship?",
    answer: "Eligible students can apply through the “Scholarships” section on our website. Please provide the required documentation and submit a completed application by the deadline."
  },
  {
    question: "Who is eligible to apply for the Entrepreneurship Grant?",
    answer: "Eligible applicants must be indigene of Ebonyi State and operate a business or start-up that shows promise for economic and social impact."
  },
  {
    question: "What is the application process for the Entrepreneurship Grant?",
    answer: "Interested applicants can apply by filling out an application form on our website under the “Entrepreneurship Grants” section. Each application undergoes a review by our team to ensure eligibility."
  },
  {
    question: "Does the Entrepreneurship Grant provide mentorship along with funding?",
    answer: "Yes, recipients of the grant not only receive financial support but are also paired with mentors who can guide them in scaling their business and enhancing community impact."
  },
  {
    question: "How can I contact the foundation for additional inquiries?",
    answer: "You can contact us via email, phone, or through the contact form on our website. Our team is happy to assist with any questions or support you may need."
  },
  {
    question: "Where is the foundation located?",
    answer: "Our foundation is based in Ebonyi State, Nigeria, with programs and outreach services available to surrounding communities."
  },
  {
    question: "How can I volunteer with the foundation?",
    answer: "We welcome volunteers who are passionate about community service. To get involved, fill out the “Become a Volunteer” form, and we will contact you with further details."
  },
  {
    question: "Can I donate to support the foundation’s programs?",
    answer: "Yes, donations are appreciated to help us expand our reach and impact. Visit the “Donate” section to learn about ways you can contribute."
  },
  {
    question: "Are donations to the foundation tax-deductible?",
    answer: "Yes, donations may be tax-deductible depending on local tax laws. Please consult a tax professional for specific guidance."
  },
  {
    question: "Does the foundation host annual events or fundraisers?",
    answer: "Yes, we host various events throughout the year, including our annual empowerment programs and community initiatives. Check our “Events” page for the latest updates."
  },
  {
    question: "Can businesses or organizations partner with the foundation?",
    answer: "We welcome partnerships with businesses and organizations that share our values. Please reach out through our “Contact” page to discuss partnership opportunities."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(
      "border-b border-gray-100 transition-all duration-300",
      isOpen ? "bg-brand-bg/50 rounded-2xl px-6 py-4" : "py-6"
    )}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left group"
      >
        <h3 className={cn(
          "text-lg font-bold transition-colors",
          isOpen ? "text-brand-navy" : "text-brand-navy/80 group-hover:text-brand-royal"
        )}>
          {question}
        </h3>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all",
          isOpen ? "bg-brand-accent text-white rotate-180" : "bg-brand-bg text-brand-navy"
        )}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mt-4 text-brand-text-light leading-relaxed text-sm"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Sleek Light Hero Section */}
      <section className="bg-brand-bg py-20 md:py-32 px-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-royal/5 skew-x-[-12deg] translate-x-1/4 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-max relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-brand-royal font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs block mb-4">Connect With Human Hearts</span>
            <h1 className="text-4xl md:text-7xl font-bold text-brand-navy mb-6 leading-tight">
              Let's Start a <br />
              <span className="text-brand-accent italic font-serif">Conversation.</span>
            </h1>
            <p className="text-base md:text-xl text-brand-text-light font-light leading-relaxed max-w-2xl">
              Whether you have a question, a partnership proposal, or just want to share your support, our team is ready to listen and assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-24 bg-white relative">
        <div className="container-max px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 bg-white rounded-[40px] shadow-2xl shadow-brand-navy/5 overflow-hidden border border-gray-100 mt-[-40px] relative z-20">
            
            {/* Left Side: Modern Contact Info */}
            <div className="lg:col-span-5 bg-white p-10 md:p-16 space-y-12 border-b lg:border-b-0 lg:border-r border-gray-50">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-brand-navy mb-4">Our Channels</h2>
                  <p className="text-brand-text-light">We respond to every inquiry with priority and care.</p>
                </div>

                <div className="space-y-8">
                  <div className="group flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all duration-300 transition-transform hover:scale-110">
                      <Mail className="w-5 h-5 text-brand-royal group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-accent font-black uppercase tracking-widest mb-1">Email Support</p>
                      <p className="text-lg font-bold text-brand-navy">info@ojerinkporofoundation.com</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all duration-300 transition-transform hover:scale-110">
                      <Phone className="w-5 h-5 text-brand-royal group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-accent font-black uppercase tracking-widest mb-1">Call Us Directly</p>
                      <p className="text-lg font-bold text-brand-navy">+234 806 666 7882</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center group-hover:bg-brand-navy group-hover:text-white transition-all duration-300 transition-transform hover:scale-110">
                      <MapPin className="w-5 h-5 text-brand-royal group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-accent font-black uppercase tracking-widest mb-1">Head Office</p>
                      <p className="text-lg font-bold text-brand-navy leading-tight">Amas Autonomous Community, <br />Ebonyi State, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-50">
                <p className="text-[10px] font-black text-brand-navy uppercase tracking-[0.3em] mb-6">Stay Connected</p>
                <div className="flex gap-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                    <a key={idx} href="#" className="p-3 bg-brand-bg text-brand-navy rounded-xl hover:bg-brand-royal hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Sleek Form */}
            <div className="lg:col-span-7 p-10 md:p-16 bg-brand-bg/30">
              {formStatus === 'sent' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <Send className="w-10 h-10 text-brand-green" />
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-2xl font-bold text-brand-navy mb-2">Message Delivered!</h3>
                    <p className="text-brand-text-light text-sm">Thank you for reaching out. A team member will follow up with you shortly.</p>
                  </div>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-brand-royal font-bold hover:text-brand-accent transition-colors"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest px-1">Your Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Uzoma Obi"
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all outline-none" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest px-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="example@mail.com"
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all outline-none" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest px-1">Topic of Discussion</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Grant Application Inquiry"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all outline-none" 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest px-1">How can we help?</label>
                    <textarea 
                      required 
                      rows={5}
                      placeholder="Share your thoughts or questions here..."
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'sending'}
                    className={cn(
                      "w-full bg-brand-navy text-white py-5 rounded-2xl font-bold text-base shadow-xl transition-all flex items-center justify-center gap-3",
                      formStatus === 'sending' ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-royal hover:shadow-brand-royal/20"
                    )}
                  >
                    {formStatus === 'sending' ? "Processing..." : "Submit Inquiry"}
                    <Send className={cn("w-4 h-4", formStatus === 'sending' ? "animate-pulse" : "")} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Section Redesigned */}
          <div className="lg:col-span-12 py-32">
            <div className="text-center mb-20 space-y-4">
              <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">Self Help Center</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-navy leading-tight">
                Common <span className="text-brand-royal italic italic-font-serif">Questions</span>
              </h2>
              <p className="text-brand-text-light text-base md:text-lg max-w-2xl mx-auto font-light">
                Find immediate answers to our most popular inquiries below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            {/* Final Contact CTA */}
            <div className="mt-20 p-12 bg-brand-bg rounded-[40px] text-center max-w-2xl mx-auto border border-gray-100 shadow-sm">
              <MessageSquare className="w-12 h-12 text-brand-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-brand-navy mb-3">Didn't find your answer?</h3>
              <p className="text-brand-text-light mb-8">Our support team is available Mon-Fri, 9am - 5pm to help you with anything you need.</p>
              <a 
                href="mailto:info@ojerinkporofoundation.com" 
                className="inline-block bg-brand-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-royal transition-all"
              >
                Direct Support Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
