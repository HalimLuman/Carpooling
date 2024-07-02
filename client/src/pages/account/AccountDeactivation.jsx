import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../../components/design/Section';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../slices/authSlice';
import { useDeleteUserMutation, useLogoutMutation } from '../../slices/usersApiSlice';
import { FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import '../../css/form.css';
import AccountHeader from '../../components/AccountHeader';

const AccountDelete = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [confirmDeactivation, setConfirmDeactivation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const [logoutApiCall] = useLogoutMutation();

  const handleDeactivation = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      await deleteUser(userInfo._id).unwrap();
      navigate('/register');
      toast.success('Profile Deleted successfully', { autoClose: 1500, pauseOnHover: false });
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'An error occurred while deleting user');
    }
  };

  const headerElements = [
    { label: 'Home', link: '/' },
    { label: 'Account', link: '/account' },
    { label: 'Deactivate Account' }
  ];

  const handleGoToProfile = () => {
    navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
  }

  return (
    <Section>
      <div className='container mx-auto px-4 text-n-8 min-h-[75vh]'>
        <AccountHeader elements={headerElements} handleGoToProfile={handleGoToProfile}/>
        <div className='flex flex-wrap container'>
          <div className='w-full xl:w-3/5'>
            <DeactivationForm
              confirmDeactivation={confirmDeactivation}
              setConfirmDeactivation={setConfirmDeactivation}
              handleDeactivation={handleDeactivation}
            />
          </div>
          <div className='w-full xl:w-2/5 xl:pl-15 mt-10 xl:mt-0'>
            <ExplanatoryBoxes />
          </div>
        </div>
      </div>
    </Section>
  );
};

const DeactivationForm = ({ confirmDeactivation, setConfirmDeactivation, handleDeactivation }) => (
  <div className='border-b dark:border-gray-700 pb-2 mt-10 dark:text-n-1'>
    <div className='flex justify-between ml-1'>
      <h2 className='h6'>Deactivate Account</h2>
    </div>
    <h3 className='body-2 mt-1 text-sm ml-1'>Please confirm your decision to deactivate your account. This action cannot be undone.</h3>
    <div className='flex items-center py-5 ml-1'>
      <label className='flex items-center text-yellow-600'>
        <input
          type='checkbox'
          checked={confirmDeactivation}
          onChange={(e) => setConfirmDeactivation(e.target.checked)}
          className='mr-2'
        />
        I understand the consequences of deactivating my account.
      </label>
    </div>
    <button
      type='button'
      className={`border px-5 py-3 rounded-lg ${confirmDeactivation ? 'border-red-600 text-red-600 hover:text-n-1 hover:bg-red-600' : 'border-gray-400 text-gray-400 cursor-not-allowed'}`}
      onClick={handleDeactivation}
      disabled={!confirmDeactivation}
    >
      Deactivate Account
    </button>
  </div>
);

const ExplanatoryBoxes = () => (
  <div className='grid grid-cols-1 gap-10'>
    <ExplanatoryBox
      title="Important Notice"
      content="Deactivating your account will disable your profile and remove your access to our services."
      icon={<FaExclamationTriangle />}
    />
    <ExplanatoryBox
      title="Need Help?"
      content="If you have any questions or concerns about your account, please contact our support team before proceeding with deactivation."
      icon={<FaInfoCircle />}
    />
  </div>
);

const ExplanatoryBox = ({ title, content, icon }) => (
  <div className='p-5 lg:px-7 border dark:border-gray-700 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-start text-n-8 dark:text-n-1'>
    <div className='mr-4 rounded-full bg-n-1 dark:bg-gray-800 text-2xl text-gray-800 dark:text-n-1'>
      {icon}
    </div>
    <div className='pt-3'>
      <h2 className='text-lg font-bold mb-2'>{title}</h2>
      <p className='text-sm'>{content}</p>
    </div>
  </div>
);

export default AccountDelete;
