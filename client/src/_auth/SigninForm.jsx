import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { fullLogo2Black, registration } from "../assets";
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";

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
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email: data.email, password: data.password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
      toast.success('Signed in successfully', { autoClose: 1500, pauseOnHover: false });
    } catch (error) {
      toast.error(error?.data?.message || error.error, { autoClose: 1500, pauseOnHover: false });
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-[100%] lg:w-[50%] items-center justify-center relative z-1 bg-n-1 py-[4rem] bottom-10 lg:bottom-0 h-screen">
        <Link to="/" className="w-[85%] lg:w-[60%] flex justify-center">
          <div className="flex items-center py-1 mb-10">
            <img src={fullLogo2Black} alt="Travel" width={200} height={200} />
          </div>
        </Link>
        <div className="flex flex-col w-[80%] lg:w-[60%]">
          <h3 className="text-n-8 h2">Sign in</h3>
          <p className="text-n-4 text-sm tracking-wider">Please enter your details.</p>
        </div>
        <form onSubmit={loginUser} className="flex flex-col w-[80%] lg:w-[60%] mt-4">
          <div className="flex flex-col py-2">
            <label htmlFor="email" className="text-n-8/70 pb-1 font-bold">Email</label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="email" placeholder="Enter your email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password" className="text-n-8/70 pb-1 font-bold">Password</label>
            <input className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg" type="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
          </div>
          <Link to="/forgot-password" className="text-blue-700 text-xs font-semibold">Forgot Password?</Link>
          <button type="submit" className="bg-sky-700 px-3 py-3 mt-3 rounded-lg border hover:bg-sky-800">Sign In</button>
        </form>
        <div className="flex mt-3 items-center justify-between w-[80%] lg:w-[60%]">
          <p className="text-n-8 text-sm">Don't have an account?</p>&nbsp;
          <Link to="/register" className="text-blue-700 text-sm font-semibold">Sign up</Link>
          
        </div>
      </div>
      <div className="h-[100vh] hidden w-[50%] lg:flex items-center justify-center">
        <img src={registration} alt="Path" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default SigninForm;
