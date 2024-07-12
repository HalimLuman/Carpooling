import React from 'react';
import NavbarMain from '../components/NavbarMain';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import Footer from '../components/Footer';

const Support = () => {
  return (
    <div className='dark:bg-neutral-950 pt-20 border-r transition duration-300'>
      <NavbarMain />
      <div className='w-full lg:w-[90%] xl:w-[80%] mx-auto py-[4rem] px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row justify-between gap-6'>
        <div className='w-full md:w-1/2 text-n-8 dark:text-n-1 transition duration-300'>
          <h1 className='h3'>Contact Us</h1>
          <p className='body-2 mt-5'>If you are unsure which category your issue falls into or need further assistance, please contact us directly. We are here to guide and support you every step of the way.</p>
        </div>
        <div className='w-full md:w-1/2 mt-5'>
          <form className='w-full space-y-4 text-n-8 dark:text-gray-300'>
            <div className='flex flex-col lg:flex-row justify-between gap-3'>
              <div className='w-full lg:w-1/2'>
                <label htmlFor='name' className='block text-sm font-medium'>Name</label>
                <input type='text' id='name' name='name' className='mt-1 p-2 block w-full rounded-md bg-n-1 dark:bg-gray-800 outline-none border border-n-8 dark:border-gray-700 text-n-8 dark:text-gray-300 transition duration-300' required />
              </div>
              <div className='w-full lg:w-1/2'>
                <label htmlFor='surname' className='block text-sm font-medium'>Surname</label>
                <input type='text' id='surname' name='surname' className='mt-1 p-2 block w-full rounded-md bg-n-1 dark:bg-gray-800 outline-none border border-n-8 dark:border-gray-700 text-n-8 dark:text-gray-300 transition duration-300' required />
              </div>
            </div>
            <div className='relative'>
              <FaEnvelope className='absolute top-[2.25rem] left-3 z-10 border-r border-n-8 dark:border-gray-700 text-n-8 dark:text-gray-300 pr-2 w-[5%] transition duration-300' />
              <label htmlFor='email' className='block text-sm font-medium'>Email</label>
              <input type='email' id='email' name='email' className='mt-1 p-2 pl-10 block w-full rounded-md bg-n-1 dark:bg-gray-800 outline-none border border-n-8 dark:border-gray-700 text-n-8 dark:text-gray-300 transition duration-300' required />
            </div>
            <div className='relative'>
              <FaPhone className='absolute top-[2.25rem] left-3 z-10 border-r border-n-8 dark:border-gray-700 text-n-8 dark:text-gray-300 pr-2 w-[5%] transition duration-300' />
              <label htmlFor='phone' className='block text-sm font-medium'>Phone</label>
              <input type='tel' id='phone' name='phone' className='mt-1 pl-10 p-2 block w-full rounded-md bg-n-1 dark:bg-gray-800 outline-none border border-n-8 dark:border-gray-700 text-n-8 dark:text-gray-300 transition duration-300' required />
            </div>
            <div>
              <label htmlFor='subject' className='block text-sm font-medium'>Subject</label>
              <input type='text' id='subject' name='subject' className='mt-1 p-2 block w-full rounded-md bg-n-1 dark:bg-gray-800 outline-none border border-n-8 dark:border-gray-700 text-n-8 dark:text-gray-300 transition duration-300' required />
            </div>
            <div>
              <label htmlFor='problem' className='block text-sm font-medium'>Problem</label>
              <textarea id='problem' name='problem' rows='4' className='mt-1 p-2 block w-full rounded-md bg-n-1 dark:bg-gray-800 outline-none border border-n-8 dark:border-gray-700 text-n-8 dark:text-gray-300 resize-none transition duration-300' required></textarea>
            </div>
            <div>
              <button type='submit' className='w-full px-4 py-2 bg-blue-600 text-white rounded-md'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className='border-t border-gray-300 dark:border-gray-700 mt-20 lg:mb-0'>
          <Footer />
      </div>
    </div>
  );
};

export default Support;
