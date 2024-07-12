import React, { useEffect, useState } from 'react';
import Section from '../../components/design/Section';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons
import { toast } from 'react-toastify';
import '../../css/form.css';
import { useUpdateUserMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import AccountHeader from '../../components/AccountHeader';
import { useTranslation } from 'react-i18next';

const AccountPrivacy = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [editState, setEditState] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    dateOfBirth: '',
    tokens: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const { t } = useTranslation();

  const [updateUser] = useUpdateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        surname: userInfo.surname,
        email: userInfo.email,
        phone: userInfo.phone,
        city: userInfo.city,
        address: userInfo.address,
        dateOfBirth: userInfo.dateOfBirth,
        tokens: userInfo.tokens,
        password: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
        throw new Error("New password and confirm password don't match");
      }

      const res = await updateUser({
        _id: userInfo._id,
        ...formData,
        password: formData.password,
        newPassword: formData.newPassword,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully', { autoClose: 2000, pauseOnHover: false });

      setFormData({
        ...formData,
        password: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      setEditState(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Error updating profile');
    }
  };

  const handleGoToProfile = () => {
    navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
  }

  const headerElements = [
    { label: `${t("ACCOUNT.Links.homeSM")}`, link: '/' },
    { label: `${t("ACCOUNT.Links.accountSM")}`, link: '/account' },
    { label: `${t("ACCOUNT.Pages.personalInfo.title")}` }
  ];

  return (
    <Section>
      <div className='container px-4 text-n-8 min-h-[72vh]'>
        <AccountHeader elements={headerElements} handleGoToProfile={handleGoToProfile}/>
        <div className='flex flex-wrap container'>
          <div className='w-full xl:w-3/5'>
            <SecurityForm
              formData={formData}
              editState={editState}
              setEditState={setEditState}
              handleSubmit={handleSubmit}
              setFormData={setFormData}
              t={t}
            />
          </div>
          <div className='w-full xl:w-2/5 xl:pl-15 mt-10 xl:mt-0'>
            <SecurityInfo t={t} />
          </div>
        </div>
      </div>
    </Section>
  );
};

const SecurityForm = ({ formData, editState, setEditState, handleSubmit, setFormData, t }) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='border-b dark:border-gray-600 pb-2 mt-10 text-n-8 dark:text-n-1'>
        <div className='flex justify-between'>
          <h2>{`${t("ACCOUNT.Pages.security.password")}`}</h2>
          <span className='underline cursor-pointer' onClick={() => setEditState(!editState)}>
            {editState ? `${t("ACCOUNT.Pages.security.cancel")}` : `${t("ACCOUNT.Pages.security.change")}`}
          </span>
        </div>
        {editState ? (
          <div>
            <h3 className='body-2 mt-1 text-xs'>
              {`${t("ACCOUNT.Pages.security.passwordDesc")}`}
            </h3>
            <div className={`flex flex-col py-5 transition-all duration-300 ease-in-out ${editState ? 'opacity-100' : 'opacity-0'}`}>
              {/* Current Password */}
              <div className='relative'>
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={`${t("ACCOUNT.Pages.security.currentPass")}`}
                  className='bg-white dark:bg-neutral-800 border outline-none hover:border-sky-700 focus:border-sky-700 border-gray-300 dark:border-neutral-700 py-3 rounded-md px-3 h-[50px] w-full mb-3 dark:focus:border-sky-600'
                  required
                />
                <button
                  type='button'
                  className='absolute top-[40%] transform -translate-y-1/2 right-3 text-n-8 dark:text-n-1 hover:text-n-8/70'
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* New Password */}
              <div className='relative'>
                <input
                  type={showPassword.newPassword ? 'text' : 'password'}
                  name='newPassword'
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder={`${t("ACCOUNT.Pages.security.newPass")}`}
                  className='bg-white dark:bg-neutral-800 border outline-none hover:border-sky-700 focus:border-sky-700 border-gray-300 dark:border-neutral-700 py-3 rounded-md px-3 h-[50px] w-full mb-3 dark:focus:border-sky-600'
                  required
                />
                <button
                  type='button'
                  className='absolute top-[40%] transform -translate-y-1/2 right-3 text-n-8 dark:text-n-1 hover:text-n-8/70'
                  onClick={() => togglePasswordVisibility('newPassword')}
                >
                  {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Confirm New Password */}
              <div className='relative'>
                <input
                  type={showPassword.confirmNewPassword ? 'text' : 'password'}
                  name='confirmNewPassword'
                  value={formData.confirmNewPassword}
                  onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
                  placeholder={`${t("ACCOUNT.Pages.security.confirmPass")}`}
                  className='bg-white dark:bg-neutral-800 border outline-none hover:border-sky-700 focus:border-sky-700 border-gray-300 dark:border-neutral-700 py-3 rounded-md px-3 h-[50px] w-full mb-3 dark:focus:border-sky-600'
                  required
                />
                <button
                  type='button'
                  className='absolute top-[40%] transform -translate-y-1/2 right-3 text-n-8 dark:text-n-1 hover:text-n-8/70'
                  onClick={() => togglePasswordVisibility('confirmNewPassword')}
                >
                  {showPassword.confirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type='submit'
                className='border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600'
              >
                {`${t("ACCOUNT.Pages.security.save")}`}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className='body-2 text-sm'>********</h3>
          </div>
        )}
      </div>
    </form>
  );
};

const SecurityInfo = ({t}) => (

  <div className='grid grid-cols-1 gap-10'>
    <SecurityBox
      title={`${t("ACCOUNT.Pages.security.firstBox")}`}
      content={`${t("ACCOUNT.Pages.security.firstBoxDesc")}`}
      icon={<FaLock />}
    />
    <SecurityBox
      title={`${t("ACCOUNT.Pages.security.secondBox")}`}
      content={`${t("ACCOUNT.Pages.security.secondBoxDesc")}`}
      icon={<FaLock />}
    />
    <SecurityBox
      title={`${t("ACCOUNT.Pages.security.thirdBox")}`}
      content={`${t("ACCOUNT.Pages.security.thirdBoxDesc")}`}
      icon={<FaLock />}
    />
  </div>
);
const SecurityBox = ({ title, content, icon }) => (
  <div className='p-5 lg:px-7 border dark:border-neutral-800 dark:bg-neutral-800 rounded-lg shadow-lg flex flex-col items-start text-n-8 dark:text-n-1'>
    <div className='mr-4 rounded-full bg-n-1 dark:bg-neutral-800 text-2xl text-neutral-800 dark:text-n-1'>
      {icon}
    </div>
    <div className='pt-3'>
      <h2 className='text-lg font-bold mb-2'>{title}</h2>
      <p className='text-sm'>{content}</p>
    </div>
  </div>
);
export default AccountPrivacy;
