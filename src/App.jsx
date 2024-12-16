import React, { useEffect }  from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './components/routes';
import ShopNowPanel from './components/shponowp';
import RegisterForm from './components/signup';
import { AuthProvider } from './context/authcontext';
const App = () => (
  <div className='font-cair overflow-x-hidden overflow-y-hidden'>

  <Router>
  <AuthProvider>
    <Navbar className="sticky top-0 z-50" />
    {/* <ShopNowPanel /> */}

    <div className="min-h-screen">
      <AppRoutes />
    </div>
    <Footer />
    </AuthProvider>

  </Router>
  </div>
);

export default App;
