import React from "react";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const ExplanatoryBoxes = () => (
  <div className="grid grid-cols-1 gap-10">
    <ExplanatoryBox
      title="Important Notice"
      content="Deactivating your account will disable your profile and remove your access to our services."
      icon={<FaExclamationTriangle />}
    />
    <ExplanatoryBox
      title="Need Help?"
      content="If you have any questions or concerns about your account, please contact our support team before proceeding with deactivation."
      icon={<FaInfoCircle />}
    />
  </div>
);

const ExplanatoryBox = ({ title, content, icon }) => (
  <div className="p-5 lg:px-7 border dark:border-gray-700 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-start text-n-8 dark:text-n-1">
    <div className="mr-4 rounded-full bg-n-1 dark:bg-gray-800 text-2xl text-gray-800 dark:text-n-1">
      {icon}
    </div>
    <div className="pt-3">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm">{content}</p>
    </div>
  </div>
);

export default ExplanatoryBoxes;
