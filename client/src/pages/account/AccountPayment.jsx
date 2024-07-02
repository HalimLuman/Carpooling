import React, { useEffect, useState } from 'react';
import Section from '../../components/design/Section';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { FaInfoCircle, FaShieldAlt, FaSyncAlt } from 'react-icons/fa';
import '../../css/form.css';
import AccountHeader from '../../components/AccountHeader';

const AccountPayment = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [editState, setEditState] = useState({});
  const [formData, setFormData] = useState({
    paymentMethod: '',
  });

  const navigate = useNavigate();

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
    { label: 'Home', link: '/' },
    { label: 'Account', link: '/account' },
    { label: 'Payment & tokens' }
  ];
  const handleGoToProfile = () => {
    navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
  }

  return (
    <Section>
      <div className='container mx-auto px-4 text-n-8 dark:text-white min-h-[72vh]'>
        <AccountHeader elements={headerElements} handleGoToProfile={handleGoToProfile}/>
        <div className='flex flex-wrap container'>
          <div className='w-full xl:w-3/5'>
            <PaymentsForm
              formData={formData}
              editState={editState}
              toggleEdit={toggleEdit}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <div className="mt-10">
              <BuyTokensSection />
            </div>
          </div>
          <div className='w-full xl:w-2/5 xl:pl-15 mt-10 xl:mt-0'>
            <ExplanatoryBoxes />
          </div>
        </div>
      </div>
    </Section>
  );
};

const PaymentsForm = ({ formData, editState, toggleEdit, handleChange, handleSubmit }) => {
  const fields = [
    { name: 'paymentMethod', label: 'Payment Method', description: 'Choose your preferred method for payments.' },
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
  <div className='border-b pb-2 mt-10 border-gray-300 dark:border-gray-700'>
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
            type='text'
            name={field.name}
            value={value}
            onChange={handleChange}
            className='bg-white dark:bg-gray-800 border outline-none hover:border-sky-700 focus:border-sky-700 border-gray-300 dark:border-gray-700 py-3 rounded-md px-3 h-[50px] w-full'
          />
          <button
            type='button'
            className='border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-white hover:bg-sky-600 ml-3'
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    ) : (
      <h3 className='body-2 text-sm'>{value}</h3>
    )}
  </div>
);

const ExplanatoryBoxes = () => (
  <div className='grid grid-cols-1 gap-10'>
    <ExplanatoryBox
      title="Why Valid Payment Information is Important"
      content="Providing accurate payment information ensures timely transactions and prevents issues with payments and payouts."
      icon={<FaInfoCircle />}
    />
    <ExplanatoryBox
      title="Safety First"
      content="Ensure your payment details are up-to-date to protect your account from unauthorized transactions."
      icon={<FaShieldAlt />}
    />
    <ExplanatoryBox
      title="Stay Updated"
      content="Keeping your payment information current ensures you receive payments and payouts without any delays."
      icon={<FaSyncAlt />}
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

const BuyTokensSection = () => {
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
    <div className='p-5 py-10 w-full border rounded-lg shadow-lg text-n-8 dark:text-white dark:bg-gray-800'>
      <div className='flex justify-center w-full'>
        <div className='w-full'>
          <h2 className='text-lg font-bold mb-2'>Buy Tokens</h2>
          <p className='mb-2'>Enter your payment details to buy tokens.</p>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="grid grid-cols-1 gap-y-2">
              <label htmlFor="cardNumber" className="sr-only">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="Card Number"
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="expiryDate" className="sr-only">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  id="expiryDate"
                  placeholder="MM/YY"
                  onChange={handleInputChange}
                  className="bg-white dark:bg-gray-700 border w-full border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-300"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="sr-only">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  placeholder="CVV"
                  onChange={handleInputChange}
                  className="bg-white dark:bg-gray-700 border w-full border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="amount" className="sr-only">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Amount"
                  onChange={handleInputChange}
                  className="bg-white dark:bg-gray-700 border w-full border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-300"
                />
              </div>
              <div>
                <label htmlFor="cardHolder" className="sr-only">Card Holder</label>
                <input
                  type="text"
                  name="cardHolder"
                  id="cardHolder"
                  placeholder="Card Holder"
                  onChange={handleInputChange}
                  className="bg-white dark:bg-gray-700 border w-full border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:border-sky-500 dark:focus:border-sky-300"
                />
              </div>
            </div>
            <button type="submit" className='bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700'>
              Buy Tokens
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPayment;
