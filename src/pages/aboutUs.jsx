import React from 'react';
import logo from "../assets/imgs/masa.svg";
import iso2200 from '../assets/imgs/ISO_22000.png'
import iso9100 from '../assets/imgs/iso9001.png'
import { ShoppingBag, Leaf ,HandHeart, CirclesThree , CheckCircle  } from '@phosphor-icons/react';
import ban from "../assets/imgs/ban3.jpg"
import hala from '../assets/imgs/Halal.png'
import safefood from '../assets/imgs/foodsafe.jpeg'
const AboutUs = () => (
  <div className=" font-cairo ">
     
    


   
     <section dir='rtl' className="bg-white ">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
 
    <div dir='rtl' className="mt-12  grid grid-cols-1 md:grid-cols-2 gap-10">
   
    <div className="flex justify-center items-center">
        <img
          src={logo}
          alt="منتجات الماسة"
          className=" w-[400px]"
        />
      </div>

      <div className="flex flex-col justify-center space-y-6">
        <h2 className='text-xl font-extrabold text-gray-900'>
        عن الماسة
        </h2>
      <p className="text-base text-gray-500 leading-relaxed">
  الماسة هي علامة تجارية سودانية رائدة ومتخصصة في تقديم مسحوق الحليب من أعلى مستويات الجودة. تأسست الماسة بهدف تزويد الأسر السودانية بحليب مغذي وطبيعي، مصنوع من أفضل أنواع الحليب النيوزيلندي المعروف بجودته العالية. نحن ملتزمون بتقديم منتجات تتمتع بالنقاء، حيث نقوم باستخدام أحدث طرق التصنيع للحفاظ على القيمة الغذائية في كل منتج. تهدف الماسة إلى تحسين نمط الحياة الصحي للأسر السودانية من خلال توفير خيار حليب صحي يلبي احتياجات الجميع.
</p>
        <h2 className='text-xl font-extrabold text-gray-900'>
        قيمنا
        </h2>
      <p className="text-base text-gray-500 leading-relaxed">
      قيمنا هي الركيزة الأساسية لأعمالنا، والمبادئ التي تشكل ثقافتنا المؤسسية، والتي تتماشى مع جميع ممارساتنا وتوجهاتنا وسياساتنا. نحن في الماسة نسعى من خلالها إلى خلق قيمة لكل من يتعامل معنا، من خلال تقديم منتجات عالية الجودة تساهم في تحسين الحياة الصحية للأسر السودانية.</p>


      </div>

    </div>
  </div>

  <div className='bg-white  rounded-xl   p-6  mt-12'>
  

  <div className='flex lg:flex-row flex-col items-center justify-center gap-4 col-span-1 md:col-span-2 mt-8 md:mt-0'>
    <div className='bg-blue-200  w-full lg:w-32 h-16 flex justify-center items-center p-4 rounded-lg'>
      <h2 className='flex gap-2 font-bold'> <Leaf size={32} color='#214C4F' /> العناية</h2> 
    </div>
    <div className='bg-blue-200  w-full lg:w-32 h-16 flex justify-center items-center p-4 rounded-lg'>
      <h2 className='flex gap-2 font-bold' ><HandHeart size={32} color='#214C4F' />التفاني </h2> 
    </div>
    <div className='bg-blue-200  w-full lg:w-32 h-16 flex justify-center items-center p-4 rounded-lg'>
      <h2 className='flex gap-2 font-bold'><CirclesThree   size={32} color='#214C4F' />الاهتمام</h2> 
    </div>
    <div className='bg-blue-200  w-full lg:w-32 h-16 flex justify-center items-center p-4 rounded-lg'>
      <h2 className='flex gap-2 font-bold'><CheckCircle  size={32} color='#214C4F' />المسؤولية</h2> 
    </div>
  </div>
</div>

</section>

<div dir='rtl' className='py-[80px] bg-white'>
 




<div className="flex justify-center items-center  bg-gray-100 py-4">
  <div dir='rtl' className="container mx-auto px-6">

    <div dir='rtl' className="justify-start flex items-center text-center mb-12">
      <h2 className="text-xl font-extrabold text-gray-800 mb-4">نحن ملتزمون بالجودة والابتكار</h2>
    </div>

  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


    <div className="">
  <h4 className="text-xl font-semibold text-gray-800 mb-4">التزامنا بالجودة</h4>
  <p className="text-base text-gray-500">
    نحن ملتزمون بتقديم منتجات آمنة وعالية الجودة، مع الالتزام بمعايير الحلال وسلامة الغذاء.
  </p>
  <ul className="text-base text-gray-500 space-y-2 mt-4">
    <li>منتجاتنا عالية الجودة وآمنة ولذيذة.</li>
    <li>الالتزام بمعايير الحلال وسلامة الغذاء.</li>
    <li>مراقبة دقيقة للمكونات الخام إلى المنتج النهائي.</li>
  </ul>
</div>

<div className="">
  <h4 className="text-xl font-semibold text-gray-800 mb-4">الاستدامة والمسؤولية</h4>
  <p className="text-base text-gray-500">
    نحن نولي أهمية كبيرة للبيئة ونعمل على تحقيق استدامة في عملياتنا لضمان مستقبل أفضل.
  </p>
  <ul className="text-base text-gray-500 space-y-2 mt-4">
    <li>عمليات صديقة للبيئة من الإنتاج إلى التسليم.</li>
    <li>منتجاتنا تضمن الفائدة لك وللكوكب.</li>
    <li>نحن نهتم بالبيئة وسلامتك تأتي أولاً.</li>
  </ul>
</div>

<div className="">
  <h4 className="text-xl font-semibold text-gray-800 mb-4">الشراكات والقيم</h4>
  <p className="text-base text-gray-500">
    نحن نؤمن بأهمية التعاون مع شركائنا لتحقيق أعلى معايير الجودة والتميز.
  </p>
  <ul className="text-base text-gray-500 space-y-2 mt-4">
    <li>الالتزام بمعايير عالية مع مورّدينا وزبائننا.</li>
    <li>التعاون الوثيق لتحقيق نتائج متميزة في كل خطوة.</li>
  </ul>
</div>

<div className="">
  <h4 className="text-xl font-semibold text-gray-800 mb-4">الاهتمام بالإنسان</h4>
  <p className="text-base text-gray-500">
    نحن نهتم بالناس، سواء كانوا موظفين، شركاء، أو عملاء، لضمان بيئة عمل مثالية ومنتجات مثالية.
  </p>
  <ul className="text-base text-gray-500 space-y-2 mt-4">
    <li>بيئة عمل صحية تساهم في إنتاجية أفضل.</li>
    <li>رعاية موظفينا والحفاظ على صحتهم وسعادتهم.</li>
    <li>منتجاتنا مصممة لتلبية احتياجات مستهلكينا.</li>
  </ul>
</div>

    </div>
  </div>
</div>


</div>


<div dir='rtl' className=" py-[80px]  p-4">
  <div className='flex flex-col justify-start'>

        <h4 className="text-xl font-semibold text-gray-800 mb-4">شهاداتنا</h4>
        <p className="text-base text-gray-500">نحن نفخر بالحصول على هذه الشهادات التي تضمن لك منتجاتنا عالية الجودة:</p>
        <p className="text-base text-gray-500 mt-4">
  شهادة ISO 9001:2015 (الجودة)، شهادة ISO 22000:2018 (سلامة الغذاء)، شهادة حلال
</p>

  </div>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-[90px] px-4">
<div className="p-4 sm:p-4 bg-white  shadow-sm rounded-lg flex flex-col items-center max-h-[200px]  border border-gray-200">
  <div className="w-full flex justify-center">
    <img src={iso2200} alt="ISO 9001:2015" className="h-12 sm:h-10 w-auto" />
  </div>
  <div className="bg-white w-full p-4 rounded-lg flex flex-col items-center text-gray-900 text-right">
    <div className="flex items-center justify-center mb-4">
      <i className="fas fa-cogs text-4xl sm:text-5xl"></i>
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-800">ISO 9001:2015</h3>
    <p className="text-right text-xs sm:text-sm text-gray-700 leading-normal mt-1">
      نظام إدارة الجودة الذي يُمكّن المؤسسة من تقديم رضا العملاء بشكل متسق ومستدام.
    </p>
  </div>
</div>

<div className="p-4 sm:p-4 bg-white  shadow-sm rounded-lg flex flex-col items-center max-h-[200px]  border border-gray-200">
  <div className="w-full flex justify-center">
    <img src={iso9100} alt="ISO 22000:2018" className="h-12 sm:h-10 w-auto" />
  </div>
  <div className="w-full p-2 flex flex-col items-center text-gray-900">
    <div className="flex items-center justify-center mb-2">
      <i className="fas fa-utensils text-4xl sm:text-5xl"></i>
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-800">ISO 22000:2018</h3>
    <p className="text-right text-xs sm:text-sm text-gray-700 leading-normal mt-1">
      حصلت الشركة على شهادة ISO 22000:2018، مما يعكس نجاحها في تطبيق نظام إدارة سلامة الغذاء لضمان توفير منتجات غذائية آمنة للاستهلاك البشري.
    </p>
  </div>
</div>


  <div className="p-4 sm:p-4 bg-white  shadow-sm rounded-lg flex flex-col items-center max-h-[200px]  border border-gray-200">
  <div className="w-full flex justify-center">
    <img src={hala} alt="Halal Certification" className="h-12 sm:h-10 w-auto" />
  </div>
  <div className="w-full p-2 flex flex-col items-center text-gray-900">
    <div className="flex items-center justify-center mb-2">
      <i className="fas fa-praying-hands text-xl sm:text-2xl text-green-600"></i>
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-800">شهادة الحلال</h3>
    <p className="text-right text-xs sm:text-sm text-gray-700 leading-normal mt-1">
      يشير اعتماد الحلال إلى أن المنتج يفي بمعايير الاستهلاك الإسلامي، مما يتيح للمسلمين استهلاكه بثقة.
    </p>
  </div>
</div>

</div>




      </div>


      <section className="bg-gray-100 ">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 className="mb-4 text-xl tracking-tight font-extrabold text-center text-gray-900 ">
      تواصل معانا 
    </h2>
    {/* <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
      Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
    </p> */}
    <form dir='rtl' action="#" className="space-y-8">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
          بريدك الالكتروني
        </label>
        <input
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   "
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div>
        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 ">
          الموضوع
        </label>
        <input
          type="text"
          id="subject"
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500  "
          placeholder="Let us know how we can help you"
          required
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">
          رسالتك
        </label>
        <textarea
          id="message"
          rows="6"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500  "
          placeholder="Leave a comment..."
        ></textarea>
      </div>
      <div className='w-full bg-red-400'>

      <button
        type="submit"
        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none  w-full"
        >
        ارسل الرسالة
      </button>
        </div>
    </form>
  </div>
</section>



{/* 
<div className="flex justify-center items-center py-[50px]">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-8">


    <div dir='rtl' className="flex flex-col justify-center items-start space-y-4">
      <h4 className="text-2xl font-semibold text-gray-800 mb-3">التزام إلماسة بالسلامة في مكان العمل</h4>
      <p className="text-base text-gray-500">
        تلتزم شركة إلماسة بتوفير بيئة عمل آمنة وصحية لجميع الموظفين، معترفًا بذلك كحق أساسي لهم.
      </p>

      <div className="bg-white p-6 ">
        <h5 className="text-xl font-semibold text-gray-800 mb-2">السلامة أولاً</h5>
        <p className="text-base text-gray-500">
          يعمل فريق السلامة على تقليل مخاطر الإصابات والحوادث والمخاطر الصحية إلى الحد الأدنى. يركز قسم السلامة بشكل رئيسي على ضمان بيئة عمل آمنة في جميع الأوقات.
        </p>
      </div>

      <div className="bg-white p-6 ">
        <h5 className="text-xl font-semibold text-gray-800 mb-2">الالتزام بمعايير السلامة</h5>
        <p className="text-base text-gray-500">
          تتبع إدارة السلامة لدينا جميع إرشادات وقواعد إدارة السلامة والصحة المهنية للصناعة التصنيعية لضمان بيئة عمل آمنة وخالية من الحوادث.
        </p>
      </div>
    </div>

    <div className="flex justify-center items-center">
      <img src={safefood} alt="Safety in Workplace" className=" w-full h-full max-w-md" />
    </div>

  </div>
</div> */}

<div className='grid grid-cols-2 items-center text-2xl font-black text-gray-800'>

</div>

      
  </div>
);

export default AboutUs;
