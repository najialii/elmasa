import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './components/routes';
import { AuthProvider } from './context/authcontext';
import Header from './components/navbarn';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
      <SkeletonTheme baseColor="#f3f3f3" highlightColor="#e0e0e0">
     
      <div className="font-cairo min-h-[100hv] ">
{/* <Navbar /> */}
<Header />
<div className=''> 

        <AppRoutes />
</div>
      </div>

      {shouldShowLayout && <Footer />}
         
      </SkeletonTheme>
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
