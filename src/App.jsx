import './App.css';

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/footer/footer.jsx';
import Header from './components/header/header.jsx';
import { setupGoogleAnalytics } from './components/utils/analytics.jsx';
import Popup from './components/utils/popup/popup.jsx';
import ScrollToTop from './components/utils/scroll-to-top.jsx';
import Home from './Home';

const Competicoes = lazy(() => import('./components/competicoes-page/competicoes.jsx'));
const Contact = lazy(() => import('./components/contact-page/contact.jsx'));
const Exposicoes = lazy(() => import('./components/exposicoes-page/exposicoes.jsx'));
const Projetos = lazy(() => import('./components/projetos-page/projetos.jsx'));
const Seletivo = lazy(() => import('./components/seletivo-page/seletivo.jsx'));
const Sobre = lazy(() => import('./components/sobre-page/sobre.jsx'));

const isPopupEnabled = false;

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setupGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }

    const handleLaunch = () => {
      if (!isPopupEnabled || location.pathname !== '/') {
        return;
      }

      const lastClosedTime = localStorage.getItem('lastPopupClosedTime');
      const fiveMinutesInMs = 5 * 60 * 1000;
      if (!lastClosedTime || Date.now() - parseInt(lastClosedTime, 10) > fiveMinutesInMs) {
        setTimeout(() => setShowPopup(true), 1000);
      }
    };
    handleLaunch();
  }, [location.pathname, location.search]);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('lastPopupClosedTime', Date.now().toString());
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/seletivo" element={<Seletivo />} />
            <Route path="/exposicoes" element={<Exposicoes />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/competicoes" element={<Competicoes />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <ScrollToTop />
    <App />
  </Router>
);

export default AppWrapper;
