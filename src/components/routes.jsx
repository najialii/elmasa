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
import Uprofile from '../pages/shopp/admin/userprofile';
import Userorders from '../pages/shopp/admin/uorder';
import ProtectedRoute from '../pages/shopp/admin/protected';
import OrderHistory from '../pages/shopp/userorders';
import CategoryProducts from './catproduct';
import Addrecip from '../pages/shopp/admin/addrecip';
import Brand from '../pages/shopp/admin/brand';
import Cities from '../pages/shopp/admin/cities';
import Addcat from '../pages/shopp/admin/addcat';
import Recipage from './recipage';
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
      <Route path="/recipage" element={<Recipage />} />
      <Route path="/social-responsibility" element={<SocialResponsibility />} />
      <Route path="/team" element={<Team />} />
      <Route path="/about-us" element={<AboutUs />} />
        <Route path="shop" element={<Shop />} />      
        <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/product/:id" element={<Ppage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/checkout" element={<Checkout />} />
      </Route>
      <Route path="/dashboard/*" element={<DashboardLayout />}>
      <Route path="*" element={<NotFound />} />
        <Route index element={<div>Welcome to the Dashboard</div>} />
        <Route path="orders" element={<Ordersadmin />} />
        <Route path="chart" element={<OverviewPage />} />
        <Route path="storage" element={<Warehouse />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="addrecipe" element={<Addrecip />} />
        <Route path='dfdgd' element={<Userorders />} />
        <Route path='cities' element={<Cities />} />
        <Route path='brands' element={<Brand />} />
        <Route path='catogeryadd' element={<Addcat />} />
        <Route path="uprofile" element={<Uprofile />} />
        <Route path="uorders" element={<OrderHistory />} />
        <Route path="procate" element={<CategoryProducts />} />
      </Route>

      </Routes>
  </motion.div>
);

export default AppRoutes;
