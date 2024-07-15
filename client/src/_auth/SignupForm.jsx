import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fullLogo2Black, registration } from "../assets";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next'
import {
  useRegisterMutation,
  useVerifyUserMutation,
} from "../slices/usersApiSlice";
import "../css/form.css";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm = () => {
  const { t } = useTranslation()
  // User Data
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

  const inputRefs = useRef([]);

  // States for OTP
  const [otpFields, setOtpFields] = useState(["", "", "", "", "", ""]);
  const [userOTP, setUserOTP] = useState();
  const [systemOTP, setSystemOTP] = useState("");
  const [verificationField, setVerificationField] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Password Schema
  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&:])[A-Za-z\d$@$!%*#?&:]{8,}$/;
    return passwordRegex.test(password);
  };

  // Mutations and User Info
  const [register] = useRegisterMutation();
  const [verifyUser] = useVerifyUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // User Registration
  const registerUser = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error(`${t("SIGNUP.notMatch")}`, { autoClose: 2000 });
      return;
    } else {
      try {
        const res = await register({ ...data }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success(`${t("SIGNUP.signedUp")}`, {
          autoClose: 1500,
          pauseOnHover: false,
        });
      } catch (error) {
        if (error.status === 409) {
          toast.error(`${t("SIGNUP.exists")}`, { autoClose: 2000 });
        } else {
          toast.error(error?.data?.message || error.error, { autoClose: 2000 });
        }
      }
    }
  };

  const userVerification = async (e) => {
    e.preventDefault();
    try {
      if (userOTP === systemOTP) {
        registerUser(e);
      } else {
        toast.error(`${t("SIGNUP.invalidVerification")}`, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error, { autoClose: 2000 });
    }
  };

  const generateToken = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error(`${t("SIGNUP.notMatch")}`, { autoClose: 2000 });
      return;
    } else if (!isPasswordValid(data.password)) {
      toast.error(
        `${t("SIGNUP.contain")}`,
        { autoClose: 2000 }
      );
      return;
    } else {
      try {
        const otp = await verifyUser({ ...data }).unwrap();
        setSystemOTP(otp.otp);
        setVerificationField(true);
        toast.warning(`${t("SIGNUP.enterVerification")}`, {
          autoClose: 2000,
        });
      } catch (error) {
        toast.error(error?.data?.message || error.error, { autoClose: 2000 });
      }
    }
  };

  const handleFieldChange = (index, value) => {
    const newOtpFields = [...otpFields];
    newOtpFields[index] = value;
    setOtpFields(newOtpFields);
    setUserOTP(newOtpFields.join(""));
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex text-n-8 min-h-screen">
      <div className="flex flex-col w-[100%] lg:w-[50%] items-center justify-center relative z-1 bg-n-1 py-[4rem] bottom-10 lg:bottom-0">
        <Link to="/" className="w-[85%] lg:w-[60%] flex justify-center">
          <div className="flex items-center py-1 mb-10">
            <img src={fullLogo2Black} alt="Travel" width={200} height={200} />
          </div>
        </Link>
        <div className="w-[80%] lg:w-[60%] flex items-end justify-between">
          <div className="flex flex-col">
            <h3 className="text-n-8 h2">{t("SIGNUP.signup")}</h3>
            <p className="text-n-4 text-sm tracking-wider">
            {t("SIGNUP.details")}
            </p>
          </div>
          <span className="font-semibold">{t("SIGNUP.step")} {`${page+1} / 3`}</span>
        </div>
        <form
          onSubmit={generateToken}
          className="flex flex-col w-[80%] lg:w-[60%] mt-4"
        >
          {page === 0 && (
            <div className="flex flex-col items-end">
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col py-2 w-full">
                  <label htmlFor="name" className="text-n-8/70 pb-1 font-bold">
                  {t("SIGNUP.name")}&nbsp;<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col py-2 w-full">
                  <label
                    htmlFor="surname"
                    className="text-n-8/70 pb-1 font-bold"
                  >
                    {t("SIGNUP.surname")}&nbsp;<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                    type="text"
                    value={data.surname}
                    onChange={(e) =>
                      setData({ ...data, surname: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="p-3">
                <button
                  onClick={!data.surname || !data.name ? null : handleNext}
                  className="shadow hover:transition-transform hover:-translate-y-1 hover:duration-300 hover:bg-n-8/5 rounded-full p-2"
                >
                  <IoIosArrowRoundForward className="text-2xl" />
                </button>
              </div>
            </div>
          )}
          {page === 1 && (
            <>
              <div className="flex flex-col py-2">
                <label htmlFor="city" className="text-n-8/70 pb-1 font-bold">
                {t("SIGNUP.city")}&nbsp;<span className="text-red-600">*</span>
                </label>
                <input
                  className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                  type="text"
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col py-2">
                <label htmlFor="address" className="text-n-8/70 pb-1 font-bold">
                {t("SIGNUP.address")}&nbsp;<span className="text-red-600">*</span>
                </label>
                <input
                  className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                  type="text"
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col py-2 w-[49%]">
                  <label
                    htmlFor="dateOfBirth"
                    className="text-n-8/70 pb-1 font-bold"
                  >
                    {t("SIGNUP.age")}&nbsp;<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="h-[50px] bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                    type="date"
                    value={data.dateOfBirth}
                    onChange={(e) =>
                      setData({ ...data, dateOfBirth: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col py-2 w-[49%]">
                  <label
                    htmlFor="gender"
                    className="text-n-8/70 pb-1 font-bold"
                  >
                    {t("SIGNUP.gender")}&nbsp;<span className="text-red-600">*</span>
                  </label>
                  <select
                    className="h-[50px] bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                    value={data.gender}
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled>
                      --{t("SIGNUP.option")}--
                    </option>
                    <option value="male">{t("SIGNUP.male")}</option>
                    <option value="female">{t("SIGNUP.female")}</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="w-full flex justify-between p-3">
                  <button
                    onClick={handlePrevious}
                    className="shadow hover:transition-transform hover:-translate-y-1 hover:duration-300 hover:bg-n-8/5 rounded-full p-2"
                  >
                    <IoIosArrowRoundBack className="text-2xl" />
                  </button>
                  <button
                    onClick={
                      !data.city ||
                      !data.address ||
                      !data.dateOfBirth ||
                      !data.gender
                        ? null
                        : handleNext
                    }
                    className="shadow hover:transition-transform hover:-translate-y-1 hover:duration-300 hover:bg-n-8/5 rounded-full p-2"
                  >
                    <IoIosArrowRoundForward className="text-2xl" />
                  </button>
                </div>
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <div className="flex flex-col py-2">
                <label htmlFor="email" className="text-n-8/70 pb-1 font-bold">
                {t("SIGNUP.email")}&nbsp;<span className="text-red-600">*</span>
                </label>
                <input
                  className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col w-full my-5">
                <label htmlFor="email" className="text-n-8/70 pb-1 font-bold">
                {t("SIGNUP.phone")}
                </label>
                <div className="flex w-full items-center">
                  <div className="border h-[50px]  border-n-8/20 text-n-8/60 py-3 px-2 rounded-l-md">
                    +389
                  </div>
                  <input
                    className="bg-n-1 border w-full outline-none focus:border-sky-700 border-n-8/20 py-3 rounded-r-md px-3 h-[50px]"
                    maxLength={8}
                    placeholder="70 123 456"
                    pattern="[0-9]{8}"
                    type="tel"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col py-2 relative">
                <label htmlFor="password" className="text-n-8/70 pb-1 font-bold">
                {t("SIGNUP.password")}&nbsp;<span className="text-red-600">*</span>
                </label>
                <input
                  className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                  type={showPassword.password ? 'text' : 'password'}
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-3 top-[55%] text-n-8"
                >
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex flex-col py-2 relative">
                <label
                  htmlFor="confirmPassword"
                  className="text-n-8/70 pb-1 font-bold"
                >
                  {t("SIGNUP.confirmPassword")}&nbsp;<span className="text-red-600">*</span>
                </label>
                <input
                  className="bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-[55%] text-n-8"
                >
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="w-full flex justify-between py-3 pl-3">
                <button
                  onClick={handlePrevious}
                  className="shadow hover:transition-transform hover:-translate-y-1 hover:duration-300 hover:bg-n-8/5 rounded-full p-2"
                >
                  <IoIosArrowRoundBack className="text-2xl" />
                </button>
                <button className="button text-n-1 bg-sky-600 hover:duration-300 h-[45px] mt-2 rounded-lg border border-sky-600 hover:text-sky-700 hover:bg-transparent px-5">
                {t("SIGNUP.signup")}
                </button>
              </div>
            </>
          )}
        </form>
        {verificationField && (
          <div className="fixed inset-0 flex justify-center items-center bg-n-8 bg-opacity-10">
            <div className="fixed my-auto mx-auto bg-n-1 text-n-8  shadow rounded-xl flex flex-col p-7 items-center">
              <div className="flex flex-col items-center">
                <div className="p-5 rounded-full bg-sky-600 w-max">
                  <MdOutlineVerifiedUser size={60} color="white" />
                </div>
                <h1 className="h5 font-bold mt-4">{t("SIGNUP.verification")}</h1>
              </div>
              <form
                onSubmit={userVerification}
                className="bg-n-1 rounded-xl flex flex-col items-center"
              >
                <div className="py-6">
                  {otpFields.map((item, index) => (
                    <input
                      key={index}
                      type="number"
                      className="bg-n-1 text-n-8 border h-[55px] w-[50px] lg:w-[70px] lg:h-[75px] rounded-md mx-1 lg:mx-3 text-center text-3xl outline-none focus:border-sky-700"
                      maxLength="1"
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          index > 0 &&
                          e.target.value === ""
                        ) {
                          inputRefs.current[index - 1].focus();
                        } else if (
                          e.key >= "0" &&
                          e.key <= "9" &&
                          index < otpFields.length - 1
                        ) {
                          inputRefs.current[index].focus();
                        }
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 1);
                        handleFieldChange(index, e.target.value);
                        if (e.target.value !== "") {
                          if (index < otpFields.length - 1) {
                            inputRefs.current[index + 1].focus();
                          }
                        }
                      }}
                      ref={(input) => (inputRefs.current[index] = input)} // store reference to the input field
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-sky-600 w-full py-2 text-n-1 font-bold tracking-wider rounded-md hover:bg-sky-700"
                >
                  {t("SIGNUP.verify")}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="flex mt-2 items-left w-[80%] lg:w-[60%]">
          <p className="text-n-8 text-sm">{t("SIGNUP.already")}</p>&nbsp;
          <Link to="/login" className="text-blue-700 text-sm font-semibold">
          {t("SIGNIN.signin")}
          </Link>
        </div>
      </div>
      <div className="fixed h-[100vh] hidden lg:w-[50%] lg:flex items-center justify-center right-0">
        <img
          src={registration}
          alt="Path"
          className="h-full w-full object-cover opacity-[1]"
        />
      </div>
    </div>
  );
};

export default SignupForm;
