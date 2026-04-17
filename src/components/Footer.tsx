import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10 px-6">
      <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/FK8yvgj9/ochf-logo.png" 
              alt="OCHF Logo" 
              className="h-10 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Nurturing hope and empowering lives through sustainable change, education, and community support.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-brand-accent transition-colors">Our Story</Link></li>
            <li><Link to="/events" className="hover:text-brand-accent transition-colors">Events</Link></li>
            <li><Link to="/visionary" className="hover:text-brand-accent transition-colors">Leadership</Link></li>
            <li><Link to="/faq" className="hover:text-brand-accent transition-colors">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
              <span>123 Caring Way, Community Center, Lagos, Nigeria</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-accent shrink-0" />
              <span>+234 806 666 7882, +234 706 072 6910</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-accent shrink-0" />
              <span>info@ojerinkporofoundation.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold mb-6">Newsletter</h4>
          <p className="text-sm text-gray-400 mb-4">Stay connected. See the impact you’re helping create.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-accent"
            />
            <button className="bg-brand-accent hover:bg-brand-accent/90 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>
      
      <div className="container-max border-t border-white/10 pt-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Ojerinkporo Caring Hearts Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
}
