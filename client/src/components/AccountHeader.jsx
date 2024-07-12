import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const AccountHeader = ({ elements, handleGoToProfile }) => {
  const { t } = useTranslation();

  return (
    <div className='text-n-8 dark:text-n-1 container w-full mb-5'>
      <div className='flex items-center text-n-8 dark:text-n-1'>
        {elements.map((element, index) => (
          <React.Fragment key={index}>
            {element.link ? (
              <NavLink to={element.link} className=' hover:text-sky-400 text-sm'>
                {element.label}
              </NavLink>
            ) : (
              <span className='text-sm'>{element.label}</span>
            )}
            {index < elements.length - 1 && (
              <MdOutlineKeyboardArrowRight className='mx-2' size={20} color='#d1d5db' />
            )}
          </React.Fragment>
        ))}
      </div>
      <h1 className="text-4xl mt-5 mb-2">{elements[elements.length - 1].label}</h1>
      <button onClick={handleGoToProfile} className="underline text-md font-bold hover:text-sky-500">{t('ACCOUNT.Links.goto')}</button>
    </div>
  )
};

export default AccountHeader;
