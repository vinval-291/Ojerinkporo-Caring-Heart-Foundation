import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ContentProvider } from './content/ContentProvider';

import Home from './pages/Home';
import About from './pages/About';
import Story from './pages/Story';
import Leadership from './pages/Leadership';
import Governance from './pages/Governance';
import OurWork from './pages/OurWork';
import Programme from './pages/Programme';
import Impact from './pages/Impact';
import { StoriesIndex, StoryDetail } from './pages/Stories';
import Gallery from './pages/Gallery';
import Partners from './pages/Partners';
import Support, { Apply } from './pages/Support';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/** The dashboard is a separate bundle — visitors to the public site never download it. */
const AdminApp = lazy(() => import('./admin/AdminApp'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let anchor links do their own thing
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* The dashboard renders standalone — no site navbar or footer. */}
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-screen bg-paper" />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </Router>
  );
}

function PublicSite() {
  return (
    <ContentProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* About */}
            <Route path="/about" element={<About />} />
            <Route path="/about/story" element={<Story />} />
            <Route path="/about/leadership" element={<Leadership />} />
            <Route path="/about/governance" element={<Governance />} />

            {/* Our Work */}
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/our-work/:slug" element={<Programme />} />

            {/* Results & stories */}
            <Route path="/impact" element={<Impact />} />
            <Route path="/stories" element={<StoriesIndex />} />
            <Route path="/stories/:slug" element={<StoryDetail />} />
            <Route path="/gallery" element={<Gallery />} />

            {/* Engagement */}
            <Route path="/partners" element={<Partners />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/apply" element={<Apply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Navigate to="/contact#faq" replace />} />

            {/* Redirects from the previous site's URLs so existing links survive. */}
            <Route path="/visionary"     element={<Navigate to="/about/leadership" replace />} />
            <Route path="/donate"        element={<Navigate to="/support" replace />} />
            <Route path="/volunteer"     element={<Navigate to="/partners" replace />} />
            <Route path="/events"        element={<Navigate to="/stories" replace />} />
            <Route path="/events/grant"  element={<Navigate to="/our-work/enterprise" replace />} />
            <Route path="/events/:id"    element={<Navigate to="/stories" replace />} />

            {/* A real 404 — the previous build silently rendered Home for every
                unmatched path, which is why broken links were invisible. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ContentProvider>
  );
}
