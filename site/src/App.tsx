import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer, BackToTop } from './components/Footer';
import { ContentProvider, type Content } from './content/ContentProvider';
import { GrantApplicationProvider } from './components/GrantApplication';

import Home from './pages/Home';
import About from './pages/About';
import Story from './pages/Story';
import Leadership, { LeadershipProfile } from './pages/Leadership';
import Governance from './pages/Governance';
import OurWork from './pages/OurWork';
import Programme from './pages/Programme';
import Impact from './pages/Impact';
import { StoriesIndex, StoryDetail } from './pages/Stories';
import Gallery from './pages/Gallery';
import Partners from './pages/Partners';
import Support from './pages/Support';
import Grants from './pages/Grants';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';

/** The dashboard is a separate bundle — visitors to the public site never download it. */
const AdminApp = lazy(() => import('./admin/AdminApp'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App({ initial }: { initial?: Content }) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* The dashboard renders standalone — no site header or footer. */}
        <Route path="/admin/*" element={<Suspense fallback={<div className="min-h-screen bg-paper" />}><AdminApp /></Suspense>} />
        <Route path="*" element={<PublicSite initial={initial} />} />
      </Routes>
    </>
  );
}

function PublicSite({ initial }: { initial?: Content }) {
  return (
    <ContentProvider initial={initial}>
      <GrantApplicationProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main" tabIndex={-1} className="flex-grow outline-none">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/about/story" element={<Story />} />
            <Route path="/about/leadership" element={<Leadership />} />
            <Route path="/about/leadership/:slug" element={<LeadershipProfile />} />
            <Route path="/about/governance" element={<Governance />} />

            <Route path="/our-work" element={<OurWork />} />
            <Route path="/our-work/enterprise/grants" element={<Grants />} />
            <Route path="/our-work/:slug" element={<Programme />} />

            <Route path="/impact" element={<Impact />} />
            <Route path="/stories" element={<StoriesIndex />} />
            <Route path="/stories/:slug" element={<StoryDetail />} />
            <Route path="/gallery" element={<Gallery />} />

            <Route path="/partners" element={<Partners />} />
            <Route path="/support" element={<Support />} />
            {/* Applying now lives on the Grants page, inside Enterprise (master file 4.7). */}
            <Route path="/support/apply" element={<Navigate to="/our-work/enterprise/grants" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/faq" element={<Navigate to="/contact#faq" replace />} />

            {/* Addresses from the previous site, so existing links survive. */}
            <Route path="/visionary" element={<Navigate to="/about/leadership" replace />} />
            <Route path="/donate" element={<Navigate to="/support" replace />} />
            <Route path="/volunteer" element={<Navigate to="/partners" replace />} />
            <Route path="/events" element={<Navigate to="/stories" replace />} />
            <Route path="/events/grant" element={<Navigate to="/our-work/enterprise" replace />} />
            <Route path="/events/:id" element={<Navigate to="/stories" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
      </GrantApplicationProvider>
    </ContentProvider>
  );
}
