import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { registration } from "../assets";
import { toast } from 'react-toastify'


const SigninForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

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
      toast.success('Signed in succesfully', {autoClose: 1500, pauseOnHover: false});
    }catch(error){
      toast.error(error?.data?.message || error.error, {autoClose: 1500, pauseOnHover: false});
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-[50%] items-center justify-center  z-1 bg-n-1 shadow-xl">
        <div className="flex items-center py-1 mb-5 rounded-lg w-[50%]">
          <img src='../../public/vite.svg' alt="" />
          <h1 className="text-n-8 h5 ml-3">TRAVEL</h1>
        </div>
        <div className="flex flex-col w-[50%]">
          <h3 className="text-n-8 h2 font-bold">Sign in</h3>
          <p className="text-n-4 text-sm tracking-wider">Please enter your details.</p>
        </div>
        <form onSubmit={loginUser} className="flex flex-col w-[50%] mt-4">
          <div className="flex flex-col py-2">
            <label htmlFor="email" className="text-n-8/70 pb-1 font-bold">Email</label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="email" placeholder="Enter your email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password" className="text-n-8/70 pb-1 font-bold">Password</label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="password" placeholder="Enter your password"  value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
          </div>
          <button type="submit" className="bg-sky-700 px-3 py-2 mt-5 rounded-lg border border-sky-700 hover:text-sky-700 hover:bg-transparent">Sign In</button>
        </form>
        <div className="flex mt-3 items-center">
          <p className="text-n-8 text-sm">Don't have an account?</p>&nbsp;
          <Link to="/register" className="text-sky-700 text-sm">Sign up</Link>
        </div>
        
      </div>
      <div className="h-[100vh] w-[50%] flex items-center justify-center">
        <img src={registration} alt="Path" className="h-full w-full object-cover" />
        <Link to="/" className="button absolute bottom-5 left-5 border py-1 px-2 hover:bg-n-1 hover:text-n-8">Return Home</Link>
      </div>
    </div>
  );
}

export default SigninForm;
