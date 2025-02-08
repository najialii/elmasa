import React from 'react';
import { WhatsappLogo,MapPin,Envelope } from "@phosphor-icons/react";
import logo from "../assets/imgs/masa.svg";
const Footer = () => (
  <>
   <section className="w-full py-2 mb-0 mt-16 bg-white  border-b border-t border-gray-200 text-center">
  <div className="flex flex-col lg:flex-row justify-between items-center w-full mb-8">
    {/* First Section (Mobile) */}
    {/* <div className="lg:hidden mb-4 flex flex-col items-center justify-center">
      <h2 className="text-base  font-extrabold lg:text-gray-900">هنا للمساعدة</h2>
      <p className="mt-2 font-bold text-white">
        اختر أي من قنوات الدعم التالي
      </p>
    </div> */}

    {/* Grid Section */}
    <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16 w-full">
  {/* Address Section */}
  <div className="flex flex-col items-center justify-center gap-2">
    <h2 className="text-lg sm:text-xl lg:text-base text-gray-900">العنوان</h2>
    <span className="bg-blue-200 rounded-full p-3">
      <MapPin size={22} />
    </span>
  </div>

  {/* Email Support */}
  <div className="flex items-center justify-center rounded-lg py-4 w-full transition-all duration-300 hover:scale-105">
    <div>
      <span className="hidden lg:flex flex-col items-center gap-2">
        <h2 className="text-gray-900 text-sm">الدعم عبر البريد الإلكتروني</h2>
        <span className="bg-blue-100 rounded-full p-3">
          <Envelope size={22} weight="light" color="#027384" />
        </span>
        <h2 className="text-lg text-primary font-extrabold">info@elmasa.com</h2>
      </span>
      <span className="flex lg:hidden items-center gap-2">
        <Envelope size={24} weight="light" color="#027384" />
        <h2 className="text-lg text-primary font-extrabold">البريد</h2>
      </span>
    </div>
  </div>

  {/* WhatsApp Support */}
  <div className="flex items-center justify-center rounded-lg py-4 w-full transition-all duration-300 hover:scale-105">
    <div>
      <span className="hidden lg:flex flex-col items-center gap-2">
        <h2 className="text-gray-800 text-sm">هل تفضل الدردشة؟</h2>
        <span className="bg-blue-100 rounded-full p-3">
          <WhatsappLogo size={22} weight="light" color="#027384" />
        </span>
        <h2 className="text-lg text-primary font-extrabold">Whatsapp</h2>
      </span>
      <span className="flex lg:hidden items-center gap-2">
        <WhatsappLogo size={24} weight="light" color="#027384" />
        <h2 className="text-lg text-primary font-extrabold">واتساب</h2>
      </span>
    </div>
  </div>
</div>

  </div>
</section>



<footer dir='rtl' className="bg-white p-8 border-b border-gray-200 tracking-wide lg:mx-16">
  <div className="">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="sm:col-span-2 max-w-sm">
        <h4 className="text-base font-semibold mb-4 text-gray-900 text-right">من نحن</h4>
        <p className="text-gray-500 text-sm text-right">
          نحن نقدم خدمات مبتكرة في تطوير الويب، تصميم تجربة المستخدم، والتسويق الرقمي. كل شيء يتم مع مراعاة الجودة والاحترافية.
        </p>
      </div>

      <div>
        <h4 className="text-base font-semibold mb-4 text-gray-900 text-right">خدماتنا</h4>
        <ul className="space-y-3 text-gray-500 text-right">
          <li><a href="javascript:void(0)" className=" text-sm">تطوير المواقع الإلكترونية</a></li>
          <li><a href="javascript:void(0)" className=" text-sm">تطوير التطبيقات الجوالة</a></li>
          <li><a href="javascript:void(0)" className=" text-sm">تصميم واجهات المستخدم وتجربة المستخدم</a></li>
          <li><a href="javascript:void(0)" className=" text-sm">التسويق الرقمي</a></li>
        </ul>
      </div>
      <div className="space-y-3 w-full text-right">
  <h2 className="text-base font-extrabold text-gray-900">تواصل معنا</h2>
  
  <input 
    type="text" 
    className="rounded-md bg-gray-200 placeholder:text-sm p-2 w-80 mx-auto" 
    placeholder="أدخل بريدك الإلكتروني" 
  />
  
  <button className="bg-primary text-white text-xs rounded-md p-3 w-80 mx-auto">
    اشترك الآن
  </button>
</div>


    </div>

  </div>
</footer>
    <div className="my-4 text-gray-500 flex justify-center items-center">
      <p className=' text-sm'> <span className="">
      © Elmasa Foods.
        </span>  جميع الحقوق محفوظة.</p> <a href="javascript:void(0)" className="max-sm:hidden">
                      <img src={logo} alt="logo" className="w-[88px] h-[40px]" />
                    </a>
    </div>

  </>
);

export default Footer;
