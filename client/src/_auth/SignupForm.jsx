import { useState } from "react";
import { Link } from "react-router-dom";
import { registration } from "../assets";

const SignupForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const registerUser = async(e) =>{
    e.preventDefault();
    console.log('submit');
  }

    return (
        <div className="flex">
          <div className="flex flex-col h-[100vh] w-[52%] items-center justify-center rounded-r-[1rem] relative z-1 bg-n-1 shadow-xl">
            <div className="py-1 px-6 mb-5 rounded-lg border border-n-8/2">
              <h1 className="text-n-5 text-xl tracking-wider font-bold">TRAVEL</h1>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-n-8 h6">Welcome to Travel</h3>
              <p className="text-n-4 text-sm tracking-wider">Please enter your details to create an account.</p>
            </div>
            <form action="" onSubmit={registerUser} className="flex flex-col max-w-[80%] w-[45%] mt-4">
              <div className="flex flex-col py-2">
                <label htmlFor="name" className="text-n-8 pb-1">Name</label>
                <input className="bg-n-1 border border-n-4 p-3 rounded-md" type="name" placeholder="Enter name..." value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
              </div>
              <div className="flex flex-col py-2">
                <label htmlFor="email" className="text-n-8 pb-1">E-mail</label>
                <input className="bg-n-1 border border-n-4 p-3 rounded-md" type="email" placeholder="Enter email..." value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
              </div>
              <div className="flex flex-col py-2">
                <label htmlFor="password" className="text-n-8 pb-1">Password</label>
                <input className="bg-n-1 border border-n-4 p-3 rounded-md" type="password" placeholder="Enter password..."  value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
              </div>
              <button type="submit" className="button bg-sky-700 p-3 mt-2 rounded-md border border-sky-700 hover:text-sky-700 hover:bg-transparent">Sign In</button>
            </form>
            <div className="flex mt-2 items-center">
              <p className="text-n-8 text-sm">Already have an account?</p>&nbsp;
              <Link to="/login" className="text-sky-700 text-sm">Sign in</Link>
            </div>
          </div>
          <div className="h-[100vh] w-[50%] flex items-center justify-center absolute right-0">
            <img src={registration} alt="Path" className="h-full w-full object-cover" />
            <Link to='/' className="button absolute bottom-5 right-5 border py-1 px-2 hover:bg-n-1 hover:text-n-8">Return Home</Link>
          </div>
        </div>
      )
}

export default SignupForm;
