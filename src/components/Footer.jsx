import React from 'react';
import { WhatsappLogo,ArrowRight,Envelope } from "@phosphor-icons/react";

const Footer = () => (
  <>
  
<section className="w-screen py-6 mb-0 bg-secondary text-center">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-6xl">
    
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-5xl font-extrabold text-primary">Here to Help You</h2>
      <p className="mt-2 font-bold text-primary">
      Choose any of the following support channels
      </p>
    </div>


    <div className="flex gap-2 items-center justify-center bg-secondaryLight rounded-lg py-4">
      <div className=''>
      <Envelope size={48} weight="light" color="#027384" />
      </div>
      <div className="flex justify-start flex-col">
      <h2 className=" text-gray-800 mb-2">Support with Email</h2>

      <p className="mt-2 font-bold  text-primary text-3xl">info@elmasa.com</p>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center  bg-secondaryLight rounded-lg py-4">
    <div>

      <h2 className=" text-gray-800 text-sm ">Prefer Chat?</h2>
     <span className='flex items-center gap-3 '>
       <WhatsappLogo size={48} weight="light" color="#027384" /> <h2 className='text-3xl text-primary font-extrabold'> Whatsapp</h2> </span>
    </div>
    </div>
  </div>
</section>

        <footer class="bg-primary p-8 font-sans tracking-wide">
      <div class="max-w-screen-xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="sm:col-span-2 max-w-sm">
            <h4 class="text-base font-semibold mb-6 text-secondary">About Us</h4>
            <p class="text-white text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, mi eu
              pulvinar cursus, sem elit interdum mauris.</p>
          </div>

          <div>
            <h4 class="text-base font-semibold mb-6 text-secondary">Services</h4>
            <ul class="space-y-3">
              <li><a href="javascript:void(0)" class="text-white hover:text-white text-sm">Web Development</a></li>
              <li><a href="javascript:void(0)" class="text-white hover:text-white text-sm">Mobile App Development</a>
              </li>
              <li><a href="javascript:void(0)" class="text-white hover:text-white text-sm">UI/UX Design</a></li>
              <li><a href="javascript:void(0)" class="text-white hover:text-white text-sm">Digital Marketing</a></li>
            </ul>
          </div>

          <div class="space-y-3">
            <h4 class="text-base font-semibold mb-6 text-secondary">Contact Us</h4>
            <p class="text-white text-sm">123 Main Street</p>
            <p class="text-white text-sm">City, State, Country</p>
            <p class="text-white text-sm">contact@example.com</p>
            <p class="text-white text-sm">+1 234 567 890</p>
          </div>
        </div>

        <div class="mt-12">
          <p class='text-white text-sm'>© ReadymadeUI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
