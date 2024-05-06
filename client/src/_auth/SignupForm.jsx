import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../assets";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../slices/usersApiSlice'

const SignupForm = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    city: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&:])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isNameValid = (name) => name.length >= 3;
  const isSurnameValid = (surname) => surname.length >= 3;

  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
    }
  }, [navigate, userInfo]);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!isNameValid(data.name) || !isSurnameValid(data.surname)) {
      toast.error('Name and surname must be at least 3 characters long');
      return;
    }
    // Your other form validation logic

    // Check if passwords match

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else if (!isPasswordValid(data.password)) {
      toast.error('Password must contain at least 8 characters, one number, one letter, and one symbol');
      return
    } else {
      try {
        const res = await register({ ...data }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
        toast.success('Signed up successfully', { autoClose: 1500, pauseOnHover: false });
      } catch (error) {
        if (error.status === 409) {
          toast.error('Email already registered, please use a different one', { autoClose: 2000 });
        } else {
          toast.error(error?.data?.message || error.error, { autoClose: 2000 });
        }
      }
    }
  }

  return (
    <div className="flex text-n-8">
      <div className="flex flex-col w-[50%] items-center justify-center relative z-1 bg-n-1 py-[4rem]">
        <Link to='/' className="w-[60%]">
          <div className="flex items-center py-1 mb-5">
              <img src='../../public/vite.svg' alt="" />
              <h1 className="text-n-8 h5 ml-3">TRAVEL</h1>
          </div>
        </Link>
        <div className="flex flex-col w-[60%]">
          <h3 className="text-n-8 h2 font-bold">Sign up</h3>
          <p className="text-n-4 text-sm tracking-wider">Please enter your details.</p>
        </div>
        <form onSubmit={registerUser} className="flex flex-col max-w-[80%] w-[60%] mt-4">
          <div className="flex justify-between">
            <div className="flex flex-col py-2 w-[49%]">
              <label htmlFor="name" className="text-n-8/70 pb-1 font-bold">First Name&nbsp;<span className="text-red-600">*</span></label>
              <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="text" placeh={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
            </div>
            <div className="flex flex-col py-2 w-[49%]">
              <label htmlFor="surname" className="text-n-8/70 pb-1 font-bold">Last Name&nbsp;<span className="text-red-600">*</span></label>
              <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="text" value={data.surname} onChange={(e) => setData({ ...data, surname: e.target.value })} required/>
            </div>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="city" className="text-n-8/70 pb-1 font-bold">City&nbsp;<span className="text-red-600">*</span></label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="text" placeholder="" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} required />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="address" className="text-n-8/70 pb-1 font-bold">Address&nbsp;<span className="text-red-600">*</span></label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="text" placeholder="Specific address" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} required/>
          </div>
          <div className="flex justify-between">
            <div className='flex flex-col py-2 w-[49%]'>
              <label htmlFor="dateOfBirth" className="text-n-8/70 pb-1 font-bold">Date of Birth&nbsp;<span className="text-red-600">*</span></label>
              <input className="h-[50px] bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="date" value={data.dateOfBirth} onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })} required/>
            </div>
            <div className="flex flex-col py-2 w-[49%]">
              <label htmlFor="gender" className="text-n-8/70 pb-1 font-bold">Gender&nbsp;<span className="text-red-600">*</span></label>
              <select className="h-[50px] bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} required>
                <option value="" disabled>--Please select an option--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="email" className="text-n-8/70 pb-1 font-bold">E-mail&nbsp;<span className="text-red-600">*</span></label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="email" placeholder="" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
          </div>
          <div className='flex flex-col w-full my-5'>
              <label htmlFor="email" className="text-n-8/70 pb-1 font-bold">Phone Number</label>
              <div className='flex w-full items-center'>
                  <div className='border h-[50px]  border-n-8/20 text-n-8/60 py-3 px-2 rounded-l-md'>+389</div>
                  <input className="bg-n-1 border w-full outline-none focus:border-sky-700 border-n-8/20 py-3 rounded-r-md px-3 h-[50px]" maxLength={8} placeholder='70 123 456' pattern="[0-9]{8}" type="tel" value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})} required/>
              </div>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password" className="text-n-8/70 pb-1 font-bold">Password&nbsp;<span className="text-red-600">*</span></label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700  p-3 rounded-lg" type="password" placeholder="" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="confirmPassword" className="text-n-8/70 pb-1 font-bold">Confirm Password&nbsp;<span className="text-red-600">*</span></label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="password" placeholder="Confirm password" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required />
          </div>
          <button type="submit" className="button text-n-1 bg-sky-700 h-[45px] mt-2 rounded-md border border-sky-700 hover:text-sky-700 hover:bg-transparent">Sign Up</button>
        </form>
        <div className="flex mt-2 items-center">
          <p className="text-n-8 text-sm">Already have an account?</p>&nbsp;
          <Link to="/login" className="text-sky-700 text-sm">Sign in</Link>
        </div>
      </div>
      <div className="fixed h-[100vh] w-[50%] flex items-center justify-center right-0">
        <img src={registration} alt="Path" className="h-full w-full object-cover opacity-[1]" />
      </div>
    </div>
  )
}

export default SignupForm;

