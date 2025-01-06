import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './components/routes';
import { AuthProvider } from './context/authcontext';
import Header from './components/navbarn';

const AppContent = () => {
  const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    {!isAuthPage && <Header />}

  const noLayoutRoutes = ['/login', '/signup', '/checkout', '/dashboard'];

  const shouldShowLayout = !noLayoutRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <div className="font-cairo min-h-[100hv] ">
{/* <Navbar /> */}
<Header />
<div className=''> 

        <AppRoutes />
</div>
      </div>

      {shouldShowLayout && <Footer />}
    </>
  );
};

const App = () => (
  <div className="font-cairo overflow-x-hidden overflow-y-hidden">
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  </div>
);

export default App;
