import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from '../slices/usersApiSlice';
import { fullLogo2Black } from "../assets";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success(`${t("SIGNIN.resetSent")}`, { autoClose: 1500, pauseOnHover: false });
      navigate('/login');
    } catch (error) {
      toast.error(error?.data?.message || error.error, { autoClose: 1500, pauseOnHover: false });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Link to="/" className="mb-10">
        <img src={fullLogo2Black} alt="Travel" width={200} height={200} />
      </Link>
      <div className="flex flex-col items-center w-full max-w-md text-n-8">
        <h2 className="text-2xl font-bold">{t("SIGNIN.forgotPassword")}</h2>
        <p className="mt-2 text-center">{t("SIGNIN.forgotDesc")}</p>
        <form onSubmit={handleForgotPassword} className="w-full mt-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2 font-bold">{t("SIGNIN.email")}</label>
            <input
              type="email"
              id="email"
              className="px-3 py-2 border rounded-lg bg-n-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">{t("SIGNIN.sendReset")}</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
