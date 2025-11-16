import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Header from './pages/header.jsx';
import Footer from './pages/footer.jsx';

// Page Components
import HomePage from './pages/home_page.jsx';
import Introduction from './pages/introduction.jsx';
// I've corrected the import to match your filename 'contract-page.jsx'
import ContractPage from './pages/contract-page.jsx';

export default function App() {

  return (
    // BrowserRouter wraps your entire application to enable routing
    <BrowserRouter>
      <div>
        {/* Header is outside of <Routes>, so it will appear on every page */}
        {/* The 'setPage' prop is no longer needed, so it's removed */}
        <Header />
        
        <main className="maincontainer">
          {/* The <Routes> component replaces your renderPage() logic */}
          <Routes>
            {/* Each <Route> defines a URL path and the component to render */}
            <Route path="/" element={<HomePage />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/contract-page" element={<ContractPage />} />
          </Routes>
        </main>
        
        {/* Footer is also outside of <Routes>, so it appears on every page */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}