import React, { useEffect, useState } from 'react';

import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
   const goToContact = () => {
    navigate("/Contact");
  };
 useEffect(() => {
    if (window.Shery && window.gsap) {
      
      // 🎯 Magnet Effect
      window.Shery.makeMagnet(".magnet",{
         duration: 1,
      });

      // 🖱️ Mouse Follower
    }
  }, []);
  return (
    <div className="relative min-h-screen w-full bg-white">
    
        {/* Bottom Section → Page Content */}
        <div className="bottom mt-30 lg:mt-4  h-[90%] w-full flex flex-col-reverse lg:flex-row">
         <div className="left h-20  lg:h-full w-full lg:w-[15%]   flex flex-row  justify-center gap-15 items-center  mt-33 lg:mt-0 ">
<div className=' h-full w-[50%] text-2xl mt-25  flex flex-row lg:flex-col justify-center  lg:gap-8 gap-10 '>

<a href='https://chat.whatsapp.com/CL0vCNLkgDwE27jviEoZtQ?mode=wwc'><i class="fa-brands fa-whatsapp magnet"></i></a>
<i class="fa-brands fa-facebook-f magnet"></i>
<i class="fa-brands fa-linkedin-in magnet"></i>
<a href='https://www.instagram.com/crafto_web/'><i class="fa-brands fa-instagram magnet"></i></a>



</div>

         </div>
         <div className="middle h-[50%] lg:h-full lg:w-[80%] w-full mt-15 lg:mt-0 ">
          <div className="mid1 w-full lg:h-[35%]  flex items-end  mt-5">
            <div className='h-[100%] w-full  lg:py-15 flex flex-col mb-5'>
              <h1 className='text-center big text-lg'>CRAFTOWEB</h1>
              <h1 className=' text-5xl md:text-6xl lg:text-9xl  big font-semibold text-center '>SHAPING THE</h1></div>
          </div>
          <div className="mid2 w-full lg:h-[30%] flex items-end  ">
 <div className=' lg:h-[100%] w-full py-2  lg:py-4 '><h1 className='text-5xl md:text-7xl lg:text-9xl big font-semibold text-center text-[#6BD3C7]'>FUTURE WITH</h1></div>
          </div>
          <div className="mid3 w-full h-[35%]  flex lg:items-end leading-4  text-center">
 <div className='h-[100%] w-full  mb-2 '><h1 className='text-5xl md:text-7xl lg:text-9xl big font-semibold text-center '>SMART SOLUTIONS</h1>
 <br></br>
 <h3 className='big font-light! text-xl'>Dreamed by You - Designed by Us</h3></div>
          </div>
         </div>
         <div className="bottom h-[100%] w-[10%] hidden  lg:flex  justify-center  items-end ">
         
         </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
