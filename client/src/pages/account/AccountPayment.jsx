import React, { useEffect, useState } from 'react';
import Section from '../../components/design/Section';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { FaInfoCircle, FaShieldAlt, FaSyncAlt } from 'react-icons/fa';
import '../../css/form.css';
import AccountHeader from '../../components/AccountHeader';
import { useTranslation } from 'react-i18next';

const AccountPayment = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [editState, setEditState] = useState({});
  const [formData, setFormData] = useState({
    paymentMethod: '',
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: userInfo.paymentMethod || '',
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
    console.log("Payments logic");
  };

  const headerElements = [
    { label: `${t("ACCOUNT.Links.homeSM")}`, link: '/' },
    { label: `${t("ACCOUNT.Links.accountSM")}`, link: '/account' },
    { label: `${t("ACCOUNT.Pages.payment.title")}` }
  ];
  const handleGoToProfile = () => {
    navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
  }

  return (
    <Section>
      <div className='container mx-auto px-5 text-n-8 dark:text-white min-h-[72vh]'>
        <AccountHeader elements={headerElements} handleGoToProfile={handleGoToProfile}/>
        <div className='flex flex-wrap container'>
          <div className='w-full xl:w-3/5'>
            {/* <PaymentsForm
              formData={formData}
              editState={editState}
              toggleEdit={toggleEdit}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            /> */}
            <div className="mt-0">
              <BuyTokensSection t={t}/>
            </div>
          </div>
          <div className='w-full xl:w-2/5 xl:pl-15 mt-10 xl:mt-0'>
            <ExplanatoryBoxes t ={t}/>
          </div>
        </div>
      </div>
    </Section>
  );
};


const ExplanatoryBoxes = ({t}) => (
  <div className='grid grid-cols-1 gap-10'>
    <ExplanatoryBox
      title={`${t("ACCOUNT.Pages.payment.firstBox")}`}
      content={`${t("ACCOUNT.Pages.payment.firstBoxDesc")}`}
      icon={<FaInfoCircle />}
    />
    <ExplanatoryBox
      title={`${t("ACCOUNT.Pages.payment.secondBox")}`}
      content={`${t("ACCOUNT.Pages.payment.secondBoxDesc")}`}
      icon={<FaShieldAlt />}
    />
    <ExplanatoryBox
      title={`${t("ACCOUNT.Pages.payment.thirdBox")}`}
      content={`${t("ACCOUNT.Pages.payment.thirdBoxDesc")}`}
      icon={<FaSyncAlt />}
    />
  </div>
);

const ExplanatoryBox = ({ title, content, icon }) => (
  <div className='p-5 lg:px-7 border dark:border-neutral-800 dark:bg-neutral-800 rounded-lg shadow-lg flex flex-col items-start text-n-8 dark:text-n-1'>
    <div className='mr-4 rounded-full bg-n-1 dark:bg-gray-800 text-2xl text-gray-800 dark:text-n-1'>
      {icon}
    </div>
    <div className='pt-3'>
      <h2 className='text-lg font-bold mb-2'>{title}</h2>
      <p className='text-sm'>{content}</p>
    </div>
  </div>
);

const BuyTokensSection = ({t}) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: 0, // Or whatever currency you're using
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to your server to process the payment
      const response = await fetch('/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      // Handle the response from your server
      console.log(data);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle errors
    }
  };

  return (
    <div className='p-5 py-10 w-full border dark:border-neutral-800 rounded-lg shadow-lg text-n-8 dark:text-white dark:bg-neutral-900'>
      <div className='flex justify-center w-full'>
        <div className='w-full'>
          <h2 className='text-lg font-bold mb-2'>{`${t("ACCOUNT.Pages.payment.buy")}`}</h2>
          <p className='mb-2'>{`${t("ACCOUNT.Pages.payment.buyDesc")}`}</p>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="grid grid-cols-1 gap-y-2">
              <label htmlFor="cardNumber" className="sr-only">{`${t("ACCOUNT.Pages.payment.cardNumber")}`}</label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder={`${t("ACCOUNT.Pages.payment.cardNumber")}`}
                onChange={handleInputChange}
                className="bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="expiryDate" className="sr-only">{`${t("ACCOUNT.Pages.payment.mm/yy")}`}</label>
                <input
                  type="text"
                  name="expiryDate"
                  id="expiryDate"
                  placeholder={`${t("ACCOUNT.Pages.payment.mm/yy")}`}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-neutral-700 border w-full border-gray-300 dark:border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-600"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="sr-only">{`${t("ACCOUNT.Pages.payment.cvv")}`}</label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  placeholder={`${t("ACCOUNT.Pages.payment.cvv")}`}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-neutral-700 border w-full border-gray-300 dark:border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="amount" className="sr-only">{`${t("ACCOUNT.Pages.payment.amount")}`}</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder={`${t("ACCOUNT.Pages.payment.amount")}`}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-neutral-700 border w-full border-gray-300 dark:border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-600"
                />
              </div>
              <div>
                <label htmlFor="cardHolder" className="sr-only">{`${t("ACCOUNT.Pages.payment.holder")}`}</label>
                <input
                  type="text"
                  name="cardHolder"
                  id="cardHolder"
                  placeholder={`${t("ACCOUNT.Pages.payment.holder")}`}
                  onChange={handleInputChange}
                  className="bg-white dark:bg-neutral-700 border w-full border-gray-300 dark:border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-600"
                />
              </div>
            </div>
            <button type="submit" className='bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700'>
            {`${t("ACCOUNT.Pages.payment.proceed")}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPayment;
