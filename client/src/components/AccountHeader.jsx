import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const AccountHeader = ({ elements }) => (
  <div className='text-n-8 container w-full mb-5'>
    <div className='flex items-center'>
      {elements.map((element, index) => (
        <React.Fragment key={index}>
          {element.link ? (
            <NavLink to={element.link} className='text-n-8 hover:text-sky-600'>
              {element.label}
            </NavLink>
          ) : (
            <span>{element.label}</span>
          )}
          {index < elements.length - 1 && (
            <MdOutlineKeyboardArrowRight className='mx-2' size={20} color='#5b5c5e' />
          )}
        </React.Fragment>
      ))}
    </div>
    <h1 className="text-4xl mt-5 mb-2">{elements[elements.length - 1].label}</h1>
    <Link to="/profile" className="underline text-md font-bold">Go to profile</Link>
  </div>
);

export default AccountHeader;
