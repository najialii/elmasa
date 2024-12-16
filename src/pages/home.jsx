import React, { useState } from 'react';
import Slideshow from '../components/slideShow';
import Pcard from './shopp/pcards';
import Offers from './shopp/offers';
import Rcard from '../components/recipiescard';
import Homerec from './shopp/homrec';
import { WhatsappLogo } from '@phosphor-icons/react';


const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const umessage = {name,email,message}
    console.log(umessage);
    fetch("http://localhost/masa/api/content/items/customermessages", {
      method: "POST",
      headers: {
        // "api-key": "API-98177dc3e1ce2220c4228e1011caf2517191a287",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(umessage) 
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
      })
      .then((data) => {
          console.log("Success:", data);
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  
  }

  return (
  <div className="bg-gray-50">
    <Slideshow />

    {/* Welcome Section */}
    <div className="p-6 text-center bg-white shadow-lg rounded-lg mx-4 mt-8 relative overflow-hidden">
      <h1 className="text-5xl font-extrabold text-primaryDark mb-4 relative z-10">Welcome to Elmasa</h1>
      <p className="text-lg text-gray-700 relative z-10">
        Discover the quality and range of our powder milk and foodstuff products.
      </p>
    </div>

    {/* Recipes Section */}
    <section className="py-16  relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold text-primaryDark mb-8">Delicious Recipes</h2>
        <Homerec />
      </div>
      <div className='flex justify-center items-center'>
        <button    className="flex items-center justify-center gap-2 relative h-10 rounded-xl
                   w-52 overflow-hidden   text-white shadow-2xl transition-all"
                >
          discover out recipies
        </button>

      </div>
    </section>

    {/* Promotions Section */}
    <section className="py-16 Light relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold text-secondaryDark mb-8">Our Latest Promotions</h2>
        <Offers />
      </div>
    </section>

    {/* Products Section */}
    <section className="py-16 bg-white shadow-inner relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-50"></div>
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold text-primaryDark mb-8">Buy Our Products</h2>
        <p className="text-lg text-gray-700 mb-6">
          Purchase Elmasa products from our trusted shops and enjoy unmatched quality.
        </p>
        {/* <Pcard /> */}
      </div>
    </section>

    {/* Contact Section */}
    <section className="text-gray-100  py-16 relative overflow-hidden">
      {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-50"></div> */}
      <div className="container flex flex-col md:flex-row lg:max-w-5xl w-full px-5 mx-auto relative z-10">
        <div className="md:w-1/2 w-full mb-10 md:mb-0">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg leading-relaxed">
            We're here to assist you! If you have any questions or need assistance, please feel free to reach out to us.
          </p>
          <p className="mt-4">
            You can also email us using VeilMail.io to protect our email from spammers:
            <a
              href="https://veilmail.io/irish-geoff"
              className="text-highlightP font-medium hover:underline ml-2"
            >
              Click here to reveal email address
            </a>
          </p>
        </div>

        <div className="md:w-1/2 w-full">
          <h1 className="text-4xl font-bold mb-6">Contact Form</h1>
          <form 
          onSubmit={handleSubmit}
          action="send-contact.php" method="post">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white rounded-lg border border-gray-300 focus:ring-2 
                text-gray-800 focus:ring-highlightP focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-highlightP focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg mb-2">
                Your Message
              </label>
              <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-3 text-gray-800 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-highlightP focus:outline-none h-32"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-3 Dark text-white font-bold rounded-lg hover: focus:ring-2 focus:ring-highlightP focus:outline-none"
              >
                Send Message ✉
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <div className="flex gap-4 max-sm:flex-col h-32 items-center justify-start text-center  text-white px-6 py-3.5 rounded font-[sans-serif]">
        <h3 className="text-primary font-md mx-6">send usa a message </h3>
        <WhatsappLogo size={32} color="#fff0f0" />
        <div className="flex items-center justify-between space-x-5 bg-white px-4">
        <div>

        </div>
        </div>
      </div>
  </div>
  )
};

export default Home;
