import React from 'react';
import { useSelector } from 'react-redux';

const DashboardContent = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <div className='flex'>

        <div className='relative bg-dashboard-pattern bg-cover bg-center rounded-lg p-5 w-[60%] shadow-md'>
          {/* Dark overlay */}
          <div className='absolute inset-0 bg-n-8/40 opacity-50 rounded-lg'></div>

          <div className='relative z-10 p-4'>
            <h1 className='h5 font-bold'>Create and join carpool services</h1>
            <p className='body-2 ml-1 mt-2'>We create the perfect opportunity to reduce travel cost</p>
            <div className='mt-5'>
              <button className=' bg-sky-700 border border-transparent text-sm hover:border-n-1 py-3 px-5 rounded-md mr-4'>Explore More</button>
              <button className=' bg-[rgba(0,0,0,0.3)] border py-3 px-5 rounded-md text-sm hover:bg-n-8/60'>Get In Touch</button>
            </div>
          </div>
        </div>

        <div>
          Stats
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
