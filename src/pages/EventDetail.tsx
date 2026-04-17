import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const events = [
  {
    id: "entrepreneurship-grant",
    title: "Launch of Entrepreneurship Grant Program",
    date: "Jan 2, 2025",
    location: "Ebonyi State",
    description: "Celebrating the commencement of our NGN100,000,000 commitment to local business growth.",
    image: "https://ojerinkporofoundation.com/wp-content/uploads/2019/06/DSC_5451-scaled.jpg",
    content: `
      The Ojerinkporo Caring Hearts Foundation officially debuted its flagship Empowerment Initiative with a grand ceremony in Ebonyi State. This event marked the release of the Entrepreneurship Grant Program, a NGN100,000,000 fund designed to catalyze local economic development.
      
      The launch ceremony was attended by community leaders, seasoned educators, and prospective entrepreneurs. During the event, our founder, Elder (Mrs) Patience Ojerinkporo, emphasized the foundation's commitment to building a bridge between ambition and achievement.
      
      Highlights of the launch included:
      - Formal announcement of the grant eligibility and application protocols.
      - Introduction of the mentorship panel consisting of successful Nigerian business leaders.
      - A networking session for potential applicants to share ideas and form partnerships.
      - Distribution of information kits detailing the foundation's long-term vision for Ebonyi State.
      
      This grant is not just a financial contribution; it is an investment in the resilience and creativity of our people.
    `
  },
  {
    id: "inauguration",
    title: "Ojerinkporo Caring Hearts Foundation Inauguration",
    date: "Jan 2, 2024",
    location: "OCHF Foundation Center",
    description: "The official birth of a mission dedicated to compassion, empowerment, and community resilience.",
    image: "https://ojerinkporofoundation.com/wp-content/uploads/2024/11/DSC_5677-1536x1017.jpg",
    content: `
      In the heart of the Amas Autonomous Community, the Ojerinkporo Caring Hearts Foundation was officially inaugurated. This historic day saw the gathering of hundreds of community members to witness the formal start of a legacy of giving.
      
      The inauguration served as a platform to unveil our core pillars: Education Support, Widows' Empowerment, Healthcare Outreach, and Community Development. The event was characterized by cultural displays, prayers of dedication, and a clear call to action for collective progress.
      
      Key milestones achieved during the inauguration:
      - Dedication of the OCHF Community Liaison Office.
      - Immediate distribution of food items and school supplies to over 100 vulnerable families.
      - Announcement of the foundation’s board of trustees and strategic partners.
      - Launch of the "Visionary Community" initiative to identify local needs through grassroots engagement.
      
      As we look back on our first year since that auspicious day, we remain steadfast in our promise to nurture hope and empower lives.
    `
  },
  {
    id: "widows-summit",
    title: "Annual Widows' Empowerment Summit",
    date: "Oct 15, 2025",
    location: "Lagos Community Hall",
    description: "A day of training, resource distribution, and community building for widows in our network. This summit aims to provide not just material support, but also emotional and psychological empowerment through workshops and peer support groups.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    content: `
      Our Annual Widows' Empowerment Summit is more than just an event; it's a movement toward dignity and self-sufficiency. This year, we are hosting over 200 widows from across the region.
      
      The day will include:
      - Vocational training sessions in tailoring and catering.
      - Financial literacy workshops for small business management.
      - Distribution of essential food items and healthcare kits.
      - Legal aid consultations for property and inheritance rights.
      
      Join us as we celebrate the resilience of these women and provide them with the tools they need to thrive.
    `
  },
  {
    id: "scholarship-drive",
    title: "Back-to-School Scholarship Drive",
    date: "Aug 20, 2025",
    location: "OCHF Education Center",
    description: "Distributing school supplies and awarding new scholarships to deserving students for the upcoming session.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    content: `
      Education is the most powerful weapon which you can use to change the world. Our Back-to-School drive ensures that no child is left behind due to financial constraints.
      
      This year's drive focuses on:
      - Awarding 50 new full-tuition scholarships.
      - Distributing 500 school bags filled with essential stationery.
      - Providing school uniforms and shoes to primary school students.
      - Career guidance sessions for secondary school graduates.
    `
  },
  {
    id: "health-fair",
    title: "Community Health & Wellness Fair",
    date: "Dec 05, 2025",
    location: "Central Park Plaza",
    description: "Providing free health screenings, nutrition workshops, and care packages to local families.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    content: `
      Health is wealth. Many families in our communities lack access to basic healthcare. Our annual fair brings medical professionals directly to the people.
      
      Services provided:
      - Free blood pressure and glucose screenings.
      - Eye examinations and distribution of reading glasses.
      - Pediatric check-ups and immunizations.
      - Nutrition counseling and distribution of vitamin supplements.
    `
  },
  {
    id: "grant-workshop",
    title: "Entrepreneurship Grant Workshop",
    date: "Nov 12, 2025",
    location: "Innovation Hub",
    description: "Training session for small business owners on financial management and growth strategies.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    content: `
      We believe in the power of small businesses to transform local economies. This workshop is designed to equip entrepreneurs with the skills to scale their impact.
      
      Key topics:
      - Business planning and strategy.
      - Digital marketing for small businesses.
      - Accessing micro-loans and managing grants.
      - Record keeping and financial accountability.
    `
  }
];

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
        <Link to="/events" className="text-brand-royal font-bold">Back to Events</Link>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this event: ${event.title}`;

  return (
    <div className="flex flex-col">
      <section className="relative h-[40vh] md:h-[50vh] min-h-[400px]">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-brand-navy/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="container-max">
            <Link to="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              {event.title}
            </motion.h1>
            <div className="flex flex-wrap justify-center gap-6 text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-accent" /> {event.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-accent" /> {event.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-10">
            <div className="prose prose-lg max-w-none text-brand-text-light leading-relaxed">
              <p className="text-xl font-medium text-brand-navy mb-8">{event.description}</p>
              {event.content.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>

            {event.id === 'entrepreneurship-grant' && (
              <div className="bg-brand-bg p-10 rounded-[40px] border border-brand-royal/10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-brand-navy">Ready to Apply?</h3>
                  <p className="text-brand-text-light">Applications for the 2025/2026 grant cycle are now open.</p>
                </div>
                <Link to="/events/grant" className="bg-brand-accent text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all shrink-0">
                  Grant Application Page
                </Link>
              </div>
            )}

            <div className="pt-10 border-t border-gray-100">
              <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-brand-accent" /> Share this event
              </h3>
              <div className="flex gap-4">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-brand-bg rounded-xl text-brand-navy hover:bg-brand-royal hover:text-white transition-all"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-brand-bg rounded-xl text-brand-navy hover:bg-brand-royal hover:text-white transition-all"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-brand-bg rounded-xl text-brand-navy hover:bg-brand-royal hover:text-white transition-all"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-brand-bg p-8 rounded-[40px] space-y-6">
              <h3 className="text-2xl font-bold text-brand-navy">Join the Event</h3>
              <p className="text-brand-text-light text-sm">
                Interested in attending or volunteering for this event? Register your interest below.
              </p>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-brand-accent outline-none" />
                <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-brand-accent outline-none" />
                <button className="w-full bg-brand-navy text-white py-4 rounded-2xl font-bold hover:bg-brand-royal transition-all">
                  Register Interest
                </button>
              </form>
            </div>

            <div className="bg-brand-accent p-8 rounded-[40px] text-white space-y-4">
              <h3 className="text-2xl font-bold">Support this cause</h3>
              <p className="text-white/90 text-sm">
                Can't attend? You can still make a difference by donating specifically to this program.
              </p>
              <Link to="/donate" className="block w-full bg-white text-brand-accent py-4 rounded-2xl font-bold text-center hover:bg-gray-100 transition-all">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
