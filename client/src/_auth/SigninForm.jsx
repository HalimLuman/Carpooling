import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import { registration } from "../assets";


const SigninForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate('/');
    }
  },[navigate, userInfo]);

  const loginUser = async (e) => {
    e.preventDefault();
    try{
      const res = await login({email: data.email, password: data.password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/');
    }catch(error){
      console.log(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex">
      <div className="h-screen w-[47%] flex items-center justify-center shadow-lg">
        <img src={registration} alt="Path" className="h-full w-full object-cover rounded-r-[1rem]" />
        <Link to="/" className="button absolute bottom-5 left-5 border py-1 px-2 hover:bg-n-1 hover:text-n-8">Return Home</Link>
      </div>
      <div className="flex flex-col h-screen w-[53%] items-center justify-center shadow-lg">
        <div className="py-1 px-6 mb-5 rounded-lg border border-n-8/2">
          <h1 className="text-n-5 text-xl tracking-wider font-bold">TRAVEL</h1>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-n-8 h6">Welcome back to TRAVEL!</h3>
          <p className="text-n-4 text-sm tracking-wider">Please enter your details to sign in.</p>
        </div>
        <form action="" onSubmit={loginUser} className="flex flex-col max-w-[80%] w-[45%] mt-4">
          <div className="flex flex-col py-2">
            <label htmlFor="email" className="text-n-8 pb-1">E-mail</label>
            <input className="bg-n-1 border text-n-8 border-n-4 p-3 rounded-md" type="email" placeholder="Enter email..." value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password" className="text-n-8 pb-1">Password</label>
            <input className="bg-n-1 border text-n-8 border-n-4 p-3 rounded-md" type="password" placeholder="Enter password..."  value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
          </div>
          <button type="submit" className="button bg-sky-700 p-3 mt-2 rounded-md border border-sky-700 hover:text-sky-700 hover:bg-transparent">Sign In</button>
        </form>
        <div className="flex mt-2 items-center">
          <p className="text-n-8 text-sm">Do not have an account?</p>&nbsp;
          <Link to="/register" className="text-sky-700 text-sm">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;
