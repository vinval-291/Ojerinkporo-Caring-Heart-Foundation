import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: "entrepreneurship-grant",
    title: "Launch of Entrepreneurship Grant Program",
    date: "Jan 2, 2025",
    location: "Ebonyi State",
    description: "Celebrating the commencement of our NGN100,000,000 commitment to local business growth and visionary leaders in Ebonyi State.",
    image: "https://ojerinkporofoundation.com/wp-content/uploads/2019/06/DSC_5451-scaled.jpg"
  },
  {
    id: "inauguration",
    title: "Ojerinkporo Caring Hearts Foundation Inauguration",
    date: "Jan 2, 2024",
    location: "OCHF Foundation Center",
    description: "A momentous occasion marking the official launch of our mission to empower widows, support students, and nurture hope.",
    image: "https://ojerinkporofoundation.com/wp-content/uploads/2024/11/DSC_5677-1536x1017.jpg"
  },
  {
    id: "health-fair",
    title: "Community Health & Wellness Fair",
    date: "Dec 05, 2025",
    location: "Central Park Plaza",
    description: "Providing free health screenings, nutrition workshops, and care packages to local families.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "grant-workshop",
    title: "Entrepreneurship Grant Workshop",
    date: "Nov 12, 2025",
    location: "Innovation Hub",
    description: "Training session for small business owners on financial management and growth strategies.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Events() {
  const shareUrl = window.location.origin + "/events";

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-brand-bg py-24 px-6 text-center">
        <div className="container-max">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-brand-navy mb-6"
          >
            Our Events & Impact Moments
          </motion.h1>
          <p className="text-xl text-brand-text-light max-w-2xl mx-auto">
            Every event is a step toward lasting change. Join us in our upcoming activities and be part of the impact.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {events.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="group bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-brand-navy font-bold text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-accent" /> {event.date}
                  </div>
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl + "/" + event.id)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/90 backdrop-blur-md rounded-full text-brand-navy hover:text-brand-royal transition-colors"><Facebook className="w-4 h-4" /></a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl + "/" + event.id)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/90 backdrop-blur-md rounded-full text-brand-navy hover:text-brand-royal transition-colors"><Twitter className="w-4 h-4" /></a>
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-brand-royal font-semibold text-sm uppercase tracking-widest">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy leading-tight">{event.title}</h3>
                  </div>
                  <p className="text-brand-text-light leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Link to={`/events/${event.id}`} className="bg-brand-navy text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-brand-royal transition-all flex items-center gap-2">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button className="border border-gray-200 text-brand-navy px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-50 transition-all">
                      Join Event
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-accent text-white text-center">
        <div className="container-max space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Be Part of Our Next Event</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Whether as a participant, volunteer, or sponsor, your presence makes our events more impactful.
          </p>
          <button className="bg-brand-navy hover:bg-brand-royal text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl">
            Get Involved
          </button>
        </div>
      </section>
    </div>
  );
}
