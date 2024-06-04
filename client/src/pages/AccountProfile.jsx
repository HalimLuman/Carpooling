import React, { useEffect, useState } from 'react';
import Section from '../components/design/Section';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { FaInfoCircle, FaShieldAlt, FaSyncAlt } from 'react-icons/fa';
import '../css/form.css';

const AccountProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [editState, setEditState] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    dateOfBirth: '',
    tokens: '',
  });

  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: userInfo.name || '',
      surname: userInfo.surname || '',
      email: userInfo.email || '',
      phone: userInfo.phone || '',
      city: userInfo.city || '',
      address: userInfo.address || '',
      dateOfBirth: userInfo.dateOfBirth || '',
      tokens: userInfo.tokens || '',
    }));
  }, [userInfo]);

  const toggleEdit = (field) => {
    setEditState((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, field) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        _id: userInfo._id,
        ...formData,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully', { autoClose: 2000, pauseOnHover: false });
      toggleEdit(field);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Section>
      <div className='container mx-auto px-4 text-n-8'>
        <Breadcrumbs />
        <div className='flex flex-wrap container'>
          <div className='w-full lg:w-3/5'>
            <ProfileForm
              formData={formData}
              editState={editState}
              toggleEdit={toggleEdit}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className='w-full lg:w-2/5 lg:pl-15 mt-10 lg:mt-0'>
            <ExplanatoryBoxes />
          </div>
        </div>
      </div>
    </Section>
  );
};

const Breadcrumbs = () => (
  <div className='text-n-8 container w-full mb-5'>
    <div className='flex items-center'>
      <NavLink to="/" className='text-n-8 hover:text-sky-600'>Home</NavLink>
      <MdOutlineKeyboardArrowRight className='mx-2' size={20} color='#5b5c5e' />
      <NavLink to="/account" className='text-n-8 hover:text-sky-600'>Account</NavLink>
      <MdOutlineKeyboardArrowRight className='mx-2' size={20} color='#5b5c5e' />
      <span>Personal Info</span>
    </div>
    <h1 className="text-4xl mt-5 mb-2">Account</h1>
    <Link to="/profile" className="underline text-md font-bold">Go to profile</Link>
  </div>
);

const ProfileForm = ({ formData, editState, toggleEdit, handleChange, handleSubmit }) => {
  const fields = [
    { name: 'name', label: 'Full Name', description: 'For safety reasons, please make sure that this matches the name on your government ID.' },
    { name: 'surname', label: 'Surname', description: 'For safety reasons, please make sure that this matches the surname on your government ID.' },
    { name: 'email', label: 'E-mail', description: 'Verification e-mail will be sent for this action.' },
    { name: 'phone', label: 'Phone Number', description: 'Enter a valid phone number and verify for better safety experience.' },
    { name: 'city', label: 'City', description: 'Please make sure to enter the current city you live in.' },
    { name: 'address', label: 'Address', description: 'Please make sure to enter a valid address.' },
    { name: 'dateOfBirth', label: 'Date of Birth', description: '' },
  ];

  return (
    <form>
      {fields.map((field, index) => (
        <ProfileField
          key={index}
          field={field}
          value={formData[field.name]}
          editState={editState[field.name]}
          toggleEdit={() => toggleEdit(field.name)}
          handleChange={handleChange}
          handleSubmit={(e) => handleSubmit(e, field.name)}
        />
      ))}
    </form>
  );
};

const ProfileField = ({ field, value, editState, toggleEdit, handleChange, handleSubmit }) => (
  <div className='border-b pb-2 mt-10'>
    <div className='flex justify-between'>
      <h2>{field.label}</h2>
      <span className='underline cursor-pointer' onClick={toggleEdit}>
        {editState ? 'Cancel' : 'Edit'}
      </span>
    </div>
    {editState ? (
      <div>
        <h3 className='body-2 mt-1 text-sm'>{field.description}</h3>
        <div className={`flex items-center py-5 transition-all duration-300 ease-in-out ${editState ? 'opacity-100' : 'opacity-0'}`}>
          <input
            type={field.name === 'email' ? 'email' : field.name === 'dateOfBirth' ? 'date' : 'text'}
            name={field.name}
            value={value}
            onChange={handleChange}
            className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px] w-full'
          />
          <button
            type='button'
            className='border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600 ml-3'
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    ) : (
      <h3 className='body-2 text-sm'>{field.name === 'phone' ? `+389 ${value}` : value}</h3>
    )}
  </div>
);

const ExplanatoryBoxes = () => (
  <div className='grid grid-cols-1 gap-10'>
    <ExplanatoryBox
      title="Why Valid Information is Important"
      content="Providing accurate information ensures your profile is verified and secure. It helps in seamless communication and service delivery."
      icon={<FaInfoCircle />}
    />
    <ExplanatoryBox
      title="Safety First"
      content="For safety reasons, your name and surname should match your government ID. This helps in verifying your identity and protects your account."
      icon={<FaShieldAlt />}
    />
    <ExplanatoryBox
      title="Stay Updated"
      content="Keeping your contact details up-to-date ensures you receive important notifications and can recover your account if needed."
      icon={<FaSyncAlt />}
    />
  </div>
);

const ExplanatoryBox = ({ title, content, icon }) => (
  <div className='p-5 border rounded-lg shadow-lg flex items-center text-n-8'>
    <div className='mr-4 p-4 rounded-full bg-white text-2xl text-gray-800'>
      {icon}
    </div>
    <div>
      <h2 className='text-lg font-bold mb-2'>{title}</h2>
      <p>{content}</p>
    </div>
  </div>
);

export default AccountProfile;
