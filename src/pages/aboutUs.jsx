import React from 'react';
import iso2200 from '../assets/imgs/ISO_22000.png'
import iso9100 from '../assets/imgs/iso9001.png'
import { WhatsappLogo,ArrowRight,Envelope } from "@phosphor-icons/react";
import ban from "../assets/imgs/ban3.jpg"
import hala from '../assets/imgs/Halal.png'
import safefood from '../assets/imgs/saffood.jpg'
const AboutUs = () => (
  <div className="p-4  font-cairo ">
      <div className="max-w-screen mt-2 relative overflow-hidden px-4 lg:px-9">
     <img
       className="w-full h-[40vh] sm:h-[60vh] lg:h-[70vh] rounded-t-xl lg:mt-6 object-cover clip-arch sm:clip-arch-md lg:clip-arch-lg"
       src={ban}
       alt="Banner"
     />
   </div>
   
   <style>
     {`
       @layer utilities {
         .clip-arch {
           clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%);
         }
         @media (min-width: 640px) {
           .clip-arch-md {
             clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 95%, 0 80%);
           }
         }
         @media (min-width: 1024px) {
           .clip-arch-lg {
             clip-path: polygon(0 0, 100% 0, 100% 75%, 50% 90%, 0 75%);
           }
         }
       }
     `}
   </style>
   



   
   <div className="flex justify-center items-center py-[50px]">
  <h2 className="text-3xl sm:text-4xl text-primary font-black">
    Vision & Mission
  </h2>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 px-4 sm:px-20 py-[30px] sm:py-[50px] ">
  <div className="flex justify-center mb-4 sm:mb-0">
    <img src="https://place-hold.it/500" alt="" className="w-full sm:w-96 h-auto rounded-xl" />
  </div>

  <div>
    <h2 className="text-black font-bold text-xl sm:text-3xl mb-4">
      Bringing Happiness
    </h2>
    <p className="font-medium text-sm sm:text-base mb-4">
    We are here to enjoy and to have fun. Life is too short to take everything seriously. As our lives become busier, we are looking for a moment of happiness in their day-to-day. At UNITED FOOD INDUSTRIES CORPORATION LIMITED , we believe food is more than just fuel for our bodies: it is also a source of shared joy    </p>
    <h2 className="text-black font-bold text-xl sm:text-3xl mb-4">
    Vision
    </h2>
    <p className="font-medium text-sm sm:text-base mb-4">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis minima ullam ipsam eos quasi consequatur a molestiae! Animi, quasi doloremque saepe laborum quaerat aut, cumque delectus voluptas iste fugiat fugit.
    </p>
    <h2 className="text-black font-bold text-xl sm:text-3xl mb-4">
    Mission
    </h2>
    <p className="font-medium text-sm sm:text-base">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis minima ullam ipsam eos quasi consequatur a molestiae! Animi, quasi doloremque saepe laborum quaerat aut, cumque delectus voluptas iste fugiat fugit.
    </p>
  </div>
</div>

<div className='py-[80px]'>
<div className='flex justify-center py-6'>
  <h2 className='text-primary font-black text-4xl'>
  Our Certifications & Commitment to Quality Management
  </h2>
</div> 




<div className="flex justify-center items-center py-[50px]">
  <div dir='rtl' className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-8">

    <div className="bg-white p-6 flex flex-col items-start">
      <h4 className="text-2xl font-semibold text-gray-800 mb-3">نحن فخورون بشهاداتنا:</h4>
      <ul className="text-base text-gray-600 space-y-3">
        <li>شهادة ISO 9001:2015 (الجودة)</li>
        <li>شهادة ISO 22000:2018 (سلامة الغذاء)</li>
        <li>شهادة حلال</li>
      </ul>
    </div>

    <div className="bg-white p-6 flex flex-col items-start">
      <h4 className="text-2xl font-semibold text-gray-800 mb-3">التزامنا تجاهكم</h4>
      <ul className="text-base text-gray-600 space-y-3">
        <li>نحن ملتزمون بتقديم منتجات عالية الجودة وآمنة ولذيذة.</li>
        <li>جميع منتجاتنا تلتزم بأعلى معايير الحلال وسلامة الغذاء.</li>
        <li>نحن نهتم بالبيئة وعملياتنا صديقة للبيئة.</li>
      </ul>
    </div>

    <div className="bg-white p-6 flex flex-col items-start">
      <h4 className="text-2xl font-semibold text-gray-800 mb-3">الجودة في كل خطوة</h4>
      <ul className="text-base text-gray-600 space-y-3">
        <li>من المكونات الخام إلى المنتج النهائي، فريقنا يضمن مراقبة كل شيء بعناية.</li>
        <li>نلتزم بمعايير الجودة والسلامة الصارمة لتقديم الأفضل لكم.</li>
      </ul>
    </div>

    <div className="bg-white p-6 flex flex-col items-start">
      <h4 className="text-2xl font-semibold text-gray-800 mb-3">شراكات ناجحة</h4>
      <ul className="text-base text-gray-600 space-y-3">
        <li>نعمل عن كثب مع مورّدينا وزبائننا للحفاظ على معايير عالية في كل ما نقوم به.</li>
      </ul>
    </div>

    <div className="bg-white p-6 flex flex-col items-start">
      <h4 className="text-2xl font-semibold text-gray-800 mb-3">آمن ومستدام</h4>
      <ul className="text-base text-gray-600 space-y-3">
        <li>سلامتك تأتي أولاً، ونحن ملتزمون بتصنيع المنتجات بشكل يحقق لك وللكوكب الفائدة.</li>
      </ul>
    </div>

    <div className="bg-white p-6 flex flex-col items-start">
      <h4 className="text-2xl font-semibold text-gray-800 mb-3">الاهتمام بالناس</h4>
      <ul className="text-base text-gray-600 space-y-3">
        <li> نولي أهمية لمنتجاتنا والمستهلكين، فإننا نعتني أيضاً بموظفينا لضمان بيئة عمل صحية ومنتجة.</li>
      </ul>
    </div>

  </div>
</div>



<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  px-4">
  <div className="bg-white p-6 sm:p-8  flex flex-col items-center min-h-[400px]">
    <div className="w-full flex justify-center mb-4 bg-white">
      <img src={iso2200} alt="ISO 9001:2015" className="h-10 sm:h-12 w-auto" />
    </div>
    <div className="bg-secondaryLight w-full p-4 rounded-lg flex flex-col items-center text-white">
      <div className="flex items-center justify-center mb-4">
        <i className="fas fa-cogs text-4xl sm:text-5xl"></i>
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">ISO 9001:2015</h3>
      <p className="text-center text-sm sm:text-base">
        A quality management system equipping an organization to provide consistent customer satisfaction.
      </p>
    </div>
  </div>

  <div className="bg-white p-6 sm:p-8  flex flex-col items-center min-h-[400px]">
    <div className="w-full flex justify-center mb-4 bg-white">
      <img src={iso9100} alt="ISO 22000:2018" className="h-10 sm:h-12 w-auto" />
    </div>
    <div className="bg-secondaryLight w-full p-4 rounded-lg flex flex-col items-center text-white">
      <div className="flex items-center justify-center mb-4">
        <i className="fas fa-utensils text-4xl sm:text-5xl"></i>
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">ISO 22000:2018</h3>
      <p className="text-center text-sm sm:text-base">
        The company has received ISO 22000:2018 certification; UFIC has achieved the certification to control food safety hazards, ensuring that food is safe at the time for human consumption.
      </p>
    </div>
  </div>

  <div className="bg-white p-6 sm:p-8    flex flex-col items-center min-h-[400px]">
    <div className="w-full flex justify-center mb-4 bg-white">
      <img src={hala} alt="Halal Certification" className="h-10 sm:h-12 w-auto" />
    </div>
    <div className="bg-secondaryLight w-full p-4 rounded-lg flex flex-col items-center text-white">
      <div className="flex items-center justify-center mb-4">
        <i className="fas fa-praying-hands text-4xl sm:text-5xl"></i>
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">Halal Certification</h3>
      <p className="text-center text-sm sm:text-base">
        Halal Certification implies that a product passes Islamic consumption standards. Halal products can be consumed with confidence by Muslims.
      </p>
    </div>
  </div>
</div>




</div>


<div className="flex justify-center items-center py-[50px]">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-8">


    <div dir='rtl' className="flex flex-col justify-center items-start space-y-4">
      <h4 className="text-2xl font-semibold text-gray-800 mb-3">التزام إلماسة بالسلامة في مكان العمل</h4>
      <p className="text-base text-gray-600">
        تلتزم شركة إلماسة بتوفير بيئة عمل آمنة وصحية لجميع الموظفين، معترفًا بذلك كحق أساسي لهم.
      </p>

      <div className="bg-white p-6 ">
        <h5 className="text-xl font-semibold text-gray-800 mb-2">السلامة أولاً</h5>
        <p className="text-base text-gray-600">
          يعمل فريق السلامة على تقليل مخاطر الإصابات والحوادث والمخاطر الصحية إلى الحد الأدنى. يركز قسم السلامة بشكل رئيسي على ضمان بيئة عمل آمنة في جميع الأوقات.
        </p>
      </div>

      <div className="bg-white p-6 ">
        <h5 className="text-xl font-semibold text-gray-800 mb-2">الالتزام بمعايير السلامة</h5>
        <p className="text-base text-gray-600">
          تتبع إدارة السلامة لدينا جميع إرشادات وقواعد إدارة السلامة والصحة المهنية للصناعة التصنيعية لضمان بيئة عمل آمنة وخالية من الحوادث.
        </p>
      </div>
    </div>

    <div className="flex justify-center items-center">
      <img src={safefood} alt="Safety in Workplace" className=" w-full h-fit max-w-md" />
    </div>

  </div>
</div>


<h2 className='text-4xl text-center font-bold text-primary'>
  dfhkjdshfkjs
</h2>

      
  </div>
);

export default AboutUs;
