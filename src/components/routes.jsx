import React from 'react';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Recipes from '../pages/Recipes';
import SocialResponsibility from '../pages/SocialResponsibility';
import Team from '../pages/Team';
import AboutUs from '../pages/AboutUs';
import Shop from '../pages/shopp/shop';
import Ppage from '../pages/shopp/ppage';
import Header from '../pages/shopp/shopheader';
import CategoryPage from '../pages/shopp/category';
import ProductCard from '../pages/shopp/pcard';
import Login from './login';
import Register from '../components/signup';
import Checkout from '../pages/shopp/checkout';
import Ordersadmin from '../pages/shopp/admin/orders';
import { Chart } from 'chart.js';
import OverviewPage from '../pages/shopp/admin/chart';
import DashboardLayout from '../pages/shopp/admin/dashlayout';
import Warehouse from '../pages/shopp/admin/storage';
import NotFound from '../notfound';
import AddProduct from '../pages/shopp/admin/addpro';

const AppRoutes = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className='font-cairo'
  >
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/social-responsibility" element={<SocialResponsibility />} />
      <Route path="/team" element={<Team />} />
      <Route path="/about-us" element={<AboutUs />} />
        <Route path="pcard" element={<ProductCard />} />
        <Route path="shop" element={<Shop />} />      
        <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/product/:id" element={<Ppage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/dashboard/*" element={<DashboardLayout />}>
      <Route path="*" element={<NotFound />} />
        <Route index element={<div>Welcome to the Dashboard</div>} />
        <Route path="orders" element={<Ordersadmin />} />
        <Route path="chart" element={<OverviewPage />} />
        <Route path="storage" element={<Warehouse />} />
        <Route path="addproduct" element={<AddProduct />} />
      </Route>

      </Routes>
  </motion.div>
);

export default AppRoutes;
