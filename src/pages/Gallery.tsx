import { motion, AnimatePresence } from 'motion/react';
import { Camera, ChevronRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';

const galleryData = [
  {
    id: "inauguration",
    category: "Inauguration of Ojerinkporo Caring Heart Foundation",
    description: "Discover memorable moments from the inauguration of Ojerinkporo Caring Heart Foundation. This gallery showcases the foundation’s launch, celebrating its commitment to uplifting communities and fostering positive change through dedicated programs and initiatives.",
    subcategories: [
      {
        name: "Arrival of Dignitaries and Guests",
        images: [
          "https://i.postimg.cc/gkLdxPvn/arrival-1.jpg",
          "https://i.postimg.cc/bwbzBjJ4/arrival-10.jpg",
          "https://i.postimg.cc/X7tjLvVx/arrival-11.jpg",
          "https://i.postimg.cc/NfZsD0g4/arrival-12.jpg",
          "https://i.postimg.cc/ZYM4Yqym/arrival-2.jpg",
          "https://i.postimg.cc/RhNm1k2M/arrival-3.jpg",
          "https://i.postimg.cc/gjnpyCQB/arrival-4.jpg",
          "https://i.postimg.cc/76PwhGVL/arrival-5.jpg",
          "https://i.postimg.cc/Vvdw9xpF/arrival-6.jpg",
          "https://i.postimg.cc/CKgFy6nk/arrival-7.jpg",
          "https://i.postimg.cc/tgjX0mnX/arrival-8.jpg",
          "https://i.postimg.cc/jSNsFr5g/arrival-9.jpg"
        ]
      },
      {
        name: "Keynote Speeches by Distinguished Personnel",
        images: [
          "https://i.postimg.cc/nLWfFRC0/speaker-1.jpg",
          "https://i.postimg.cc/X7KWfkzN/speaker-10.jpg",
          "https://i.postimg.cc/xTGQv34n/speaker-11.jpg",
          "https://i.postimg.cc/Pq7nX3Pv/speaker-2.jpg",
          "https://i.postimg.cc/mrkGGf2k/speaker-3.jpg",
          "https://i.postimg.cc/wBMdd8TT/speaker-4.jpg",
          "https://i.postimg.cc/hGvqqWPg/speaker-5.jpg",
          "https://i.postimg.cc/BvbGG9Q0/speaker-7.jpg",
          "https://i.postimg.cc/W12vXqBn/speaker-8.jpg",
          "https://i.postimg.cc/2SzD2Ls4/speaker-9.jpg"
        ]
      },
      {
        name: "Cheque Presentation",
        images: [
          "https://i.postimg.cc/Bbkj2cY1/presentation-1.jpg",
          "https://i.postimg.cc/nrCssw1y/presentation-2.jpg",
          "https://i.postimg.cc/bJYSPvSF/presentation-3.jpg",
          "https://i.postimg.cc/hvfJJ3rB/presentation-4.jpg",
          "https://i.postimg.cc/Y92L7SLS/presentation-5.jpg",
          "https://i.postimg.cc/xd2bs505/presentation-7.jpg",
          "https://i.postimg.cc/zGWgS61F/presentation-8.jpg",
          "https://i.postimg.cc/CKgfv7Fr/presentation-9.jpg"
        ]
      },
      {
        name: "Equipment Distribution to Entrepreneurs",
        images: [
          "https://i.postimg.cc/9X7wjsrL/equipment-1.jpg",
          "https://i.postimg.cc/T1gKq5z2/equipment-2.jpg",
          "https://i.postimg.cc/G2B8t5zy/equipment-3.jpg"
        ]
      }
    ]
  },
  {
    id: "grant-launch",
    category: "Launch of Entrepreneurship Grant Program",
    description: "Experience highlights from the launch of the Entrepreneurship Grant Program, a pivotal event empowering aspiring business owners with resources and support to fuel their innovative ideas. This gallery captures the excitement, presentations, and awards that marked the beginning of countless new opportunities.",
    subcategories: [
       {
        name: "Event Highlights",
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000",
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000"
        ]
      }
    ]
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState(galleryData[0].id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const currentCategory = galleryData.find(cat => cat.id === activeCategory);

  const scroll = (id: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[id];
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Full screen view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-brand-navy py-24 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
            alt="Gallery Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/20 rounded-full text-brand-accent text-sm font-bold tracking-widest uppercase">
              <Camera className="w-4 h-4" /> Visual Impact
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">Our <span className="text-brand-accent">Gallery</span></h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A collection of moments that define our journey and the lives we've touched.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-max px-6">
          <div className="flex md:justify-center overflow-x-auto no-scrollbar gap-6 md:gap-12 py-4 scroll-smooth">
            {galleryData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap text-xs md:text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-all duration-300 ${
                  activeCategory === cat.id 
                  ? "border-brand-accent text-brand-navy scale-105" 
                  : "border-transparent text-gray-400 hover:text-brand-navy"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="section-padding bg-brand-bg flex-grow">
        <div className="container-max">
          {currentCategory && (
            <div className="space-y-12 md:space-y-16">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-brand-navy mb-4 md:mb-6">{currentCategory.category}</h2>
                <p className="text-brand-text-light text-sm md:text-lg leading-relaxed">
                  {currentCategory.description}
                </p>
              </div>

              {currentCategory.subcategories.map((sub, subIdx) => (
                <div key={subIdx} className="space-y-8 md:space-y-10">
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-navy flex items-center gap-3 text-center">
                      <ImageIcon className="w-5 h-5 md:w-6 h-6 text-brand-accent" /> {sub.name}
                    </h3>
                    <div className="w-24 h-1 bg-brand-accent rounded-full" />
                  </div>

                  {/* Mobile Carousel / Desktop Grid */}
                  <div className="relative group/carousel">
                    {/* Navigation Arrows (Mobile Only) */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 flex justify-between pointer-events-none px-2 md:hidden">
                      <button 
                        onClick={() => scroll(`${subIdx}`, 'left')}
                        className="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg text-brand-navy pointer-events-auto hover:bg-brand-accent hover:text-white transition-all active:scale-95"
                        aria-label="Scroll Left"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => scroll(`${subIdx}`, 'right')}
                        className="p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg text-brand-navy pointer-events-auto hover:bg-brand-accent hover:text-white transition-all active:scale-95"
                        aria-label="Scroll Right"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div 
                      ref={el => scrollRefs.current[`${subIdx}`] = el}
                      className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory pb-6 md:pb-0 justify-center"
                    >
                      {sub.images.map((img, imgIdx) => (
                        <motion.div
                          key={imgIdx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5, delay: imgIdx * 0.05 }}
                          onClick={() => setSelectedImage(img)}
                          className="min-w-[85%] sm:min-w-[48%] md:min-w-0 snap-center group relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl bg-white cursor-pointer transition-all duration-500"
                        >
                          <img 
                            src={img} 
                            alt={`${sub.name} ${imgIdx + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                            <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">View Full Image</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Mobile Swipe Indicator & Progress Bar */}
                    <div className="md:hidden flex flex-col items-center gap-3 mt-4">
                       <div className="flex gap-1.5">
                          {sub.images.slice(0, 5).map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          ))}
                          {sub.images.length > 5 && <div className="text-[8px] text-gray-400 font-bold self-center ml-1">+{sub.images.length - 5} MORE</div>}
                       </div>
                       <span className="text-[10px] text-brand-royal uppercase tracking-[0.2em] font-black animate-pulse flex items-center gap-2">
                         <ChevronRight className="w-3 h-3" /> Swipe to explore <ChevronRight className="w-3 h-3" />
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-navy text-white text-center">
        <div className="container-max max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold">Be Part of the Story</h2>
          <p className="text-xl text-gray-400">
            Every moment captured here is made possible by the support of people like you.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-brand-accent hover:bg-brand-accent/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-all">
              Support Our Mission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
