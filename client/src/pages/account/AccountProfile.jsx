import React, { useEffect, useState } from "react";
import Section from "../../components/design/Section";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { FaInfoCircle, FaShieldAlt, FaSyncAlt } from "react-icons/fa";
import "../../css/form.css";
import AccountHeader from "../../components/AccountHeader";
import { useTranslation } from "react-i18next";

const AccountProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [editState, setEditState] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    dateOfBirth: "",
    tokens: "",
  });
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: userInfo.name || "",
      surname: userInfo.surname || "",
      email: userInfo.email || "",
      phone: userInfo.phone || "",
      city: userInfo.city || "",
      address: userInfo.address || "",
      dateOfBirth: userInfo.dateOfBirth || "",
      tokens: userInfo.tokens || "",
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
    try {
      const res = await updateUser({
        _id: userInfo._id,
        ...formData,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully", {
        autoClose: 1000,
        pauseOnHover: false,
      });
      toggleEdit(field);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleGoToProfile = () => {
    navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
  };
  const headerElements = [
    { label: `${t("ACCOUNT.Links.homeSM")}`, link: "/" },
    { label: `${t("ACCOUNT.Links.accountSM")}`, link: "/account" },
    { label: `${t("ACCOUNT.Pages.personalInfo.title")}` },
  ];

  return (
    <Section>
      <div className="container mx-auto px-4 text-n-8 min-h-screen">
        <AccountHeader
          elements={headerElements}
          handleGoToProfile={handleGoToProfile}
        />
        <div className="flex flex-wrap container">
          <div className="w-full xl:w-3/5">
            <ProfileForm
              formData={formData}
              editState={editState}
              toggleEdit={toggleEdit}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="w-full xl:w-2/5 xl:pl-15 mt-10 xl:mt-0">
            <ExplanatoryBoxes />
          </div>
        </div>
      </div>
    </Section>
  );
};

const ProfileForm = ({
  formData,
  editState,
  toggleEdit,
  handleChange,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const fields = [
    {
      name: "name",
      label: `${t("ACCOUNT.Pages.personalInfo.name")}`,
      description: "",
      editable: false,
    },
    {
      name: "surname",
      label: `${t("ACCOUNT.Pages.personalInfo.surname")}`,
      description: "",
      editable: false,
    },
    {
      name: "email",
      label: `${t("ACCOUNT.Pages.personalInfo.email")}`,
      description: "",
      editable: false,
    },
    {
      name: "phone",
      label: `${t("ACCOUNT.Pages.personalInfo.phone")}`,
      description: `${t("ACCOUNT.Pages.personalInfo.phoneDesc")}`,
      editable: true,
    },
    {
      name: "city",
      label: `${t("ACCOUNT.Pages.personalInfo.city")}`,
      description: `${t("ACCOUNT.Pages.personalInfo.cityDesc")}`,
      editable: true,
    },
    {
      name: "address",
      label: `${t("ACCOUNT.Pages.personalInfo.address")}`,
      description: `${t("ACCOUNT.Pages.personalInfo.addressDesc")}`,
      editable: true,
    },
    {
      name: "dateOfBirth",
      label: `${t("ACCOUNT.Pages.personalInfo.birth")}`,
      description: "",
      editable: false,
    },
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
          t={t}
        />
      ))}
    </form>
  );
};

const ProfileField = ({
  field,
  value,
  editState,
  toggleEdit,
  handleChange,
  handleSubmit,
  t,
}) => (
  <div className="border-b dark:border-gray-600 pb-2 px-1 mt-10 text-n-8 dark:text-n-1">
    <div className="flex justify-between">
      <h2>{field.label}</h2>
      {field.editable && (
        <span className="underline cursor-pointer" onClick={toggleEdit}>
          {editState ? `${t('ACCOUNT.Pages.personalInfo.cancel')}` : `${t('ACCOUNT.Pages.personalInfo.edit')}`}
        </span>
      )}
    </div>
    {field.editable ? (
      editState ? (
        <div>
          <h3 className="body-2 mt-1 text-sm">{field.description}</h3>
          <div
            className={`flex items-center py-5 transition-all duration-300 ease-in-out ${
              editState ? "opacity-100" : "opacity-0"
            } `}
          >
            <input
              type={
                field.name === "email"
                  ? "email"
                  : field.name === "dateOfBirth"
                  ? "date"
                  : "text"
              }
              name={field.name}
              value={value}
              onChange={handleChange}
              className="bg-white dark:bg-neutral-800 border outline-none hover:border-sky-700 focus:border-sky-700 border-gray-300 dark:border-neutral-700 py-3 rounded-md px-3 h-[50px] w-full dark:focus:border-sky-600"
            />
            <button
              type="button"
              className="border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600 ml-3 "
              onClick={handleSubmit}
            >
              {`${t('ACCOUNT.Pages.personalInfo.save')}`}
            </button>
          </div>
        </div>
      ) : (
        <h3 className="body-2 text-sm">
          {field.name === "phone" ? `+389 ${value}` : value}
        </h3>
      )
    ) : (
      <h3 className="body-2 text-sm">
        {field.name === "phone" ? `+389 ${value}` : value}
      </h3>
    )}
  </div>
);

const ExplanatoryBoxes = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 gap-10">
      <ExplanatoryBox
        title={`${t('ACCOUNT.Pages.personalInfo.firstBox')}`}
        content={`${t('ACCOUNT.Pages.personalInfo.firstBoxDesc')}`}
        icon={<FaInfoCircle />}
      />
      <ExplanatoryBox
        title={`${t('ACCOUNT.Pages.personalInfo.secondBox')}`}
        content={`${t('ACCOUNT.Pages.personalInfo.secondBoxDesc')}`}
        icon={<FaShieldAlt />}
      />
      <ExplanatoryBox
        title={`${t('ACCOUNT.Pages.personalInfo.thirdBox')}`}
        content={`${t('ACCOUNT.Pages.personalInfo.thirdBoxDesc')}`}
        icon={<FaSyncAlt />}
      />
    </div>
  );
};

const ExplanatoryBox = ({ title, content, icon }) => (
  <div className="p-5 lg:px-7 border dark:border-neutral-800 dark:bg-neutral-800 rounded-lg shadow-lg flex flex-col items-start text-n-8 dark:text-n-1">
    <div className="mr-4 rounded-full bg-n-1 dark:bg-neutral-800 text-2xl text-neutral-800 dark:text-n-1">
      {icon}
    </div>
    <div className="pt-3">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm">{content}</p>
    </div>
  </div>
);

export default AccountProfile;
