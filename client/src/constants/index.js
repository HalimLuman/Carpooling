import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineQueryStats } from "react-icons/md";
import { SlSupport } from 'react-icons/sl';
import { LuPlusCircle } from 'react-icons/lu'
import { RiHistoryFill } from "react-icons/ri";

import { CiCircleInfo } from "react-icons/ci";
import { GoShieldLock } from "react-icons/go";
import { CiMoneyCheck1 } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { TfiStatsUp } from "react-icons/tfi";
import { CiCircleRemove } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { CiCirclePlus, CiMap, CiHome  } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";

import {
  discordBlack,
  telegram,
  instagram,
  facebook,
  twitter,

  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage1,
  benefitImage2,
  benefitImage3,
  benefitImage4,
  benefitImage5,
  benefitImage6,

  costSaving,
  ecoFriendly,
  schedule,
  socialConnection
} from '../assets';

export const navigation = [
    {
      id: "0",
      title: "Home",
      url: "/",
    },
    {
      id: "1",
      title: "Safety Guideline",
      url: "/safety-guideline",
    },
    {
      id: "2",
      title: "Explore",
      url: "/explore",
    },
  ];

  export const sidebar = [
    {
      links: [
        {
          name: 'home',
          icon: CiHome,
          to: '/',
        },
        {
          name: 'explore',
          icon: CiMap ,
          to: '/explore',
        },
      ],
    },
    {
      links: [
        {
          name: 'create',
          icon: CiCirclePlus,
          to: 'create-post',
        },
        {
          name: 'history',
          icon: CiViewList ,
          to: '/dashboard/history',
        },
        {
          name: 'travels',
          icon: CiClock2 ,
          to: '/dashboard/reservation',
        },
      ]
    },
    {
      links: [
        {
          name: 'settings',
          icon: CiSettings,
          to: '/account/settings',
        },
        {
          name: 'account',
          icon: CiUser,
          to: '/account',
        },
        {
          name: 'payment',
          icon: CiMoneyBill,
          to: '/account/payments',
        },
      ],
    },
    {
      links: [
        {
          name: 'support',
          icon: IoIosHelpCircleOutline,
          to: '/support',
        },
      ],
    },
  ];
  
  export const accountSettings = [
    {
      links: [
        {
          name: 'Personal Information',
          icon: CiCircleInfo,
          to: '/account/personal-information',
          description: 'Provide or update your personal information for a better profile'
        },
        {
          name: 'Security',
          icon: GoShieldLock,
          to: '/account/security',
          description: 'Manage your security settings including password'
        },
        {
          name: 'Payment & Tokens',
          icon: CiMoneyCheck1,
          to: '/account/payments-payouts',
          description: 'View and manage your payment method and buy tokens'
        },
        {
          name: 'Pending Requests',
          icon: CiClock2,
          to: '/account/pending-requests',
          description: 'Review and respond to pending requests from other users'
        },
        {
          name: 'Created Carpool History',
          icon: CiViewList,
          to: '/account/created-carpool-history',
          description: 'View the history of carpools you have created'
        },
        {
          name: 'Joined Carpool History',
          icon: CiViewList,
          to: '/account/joined-carpool-history',
          description: 'View the history of carpools you have joined'
        },
        {
          name: 'Account Stats',
          icon: TfiStatsUp,
          to: '/account/account-statistics',
          description: 'Analyze your account statistics and performance metrics'
        },
        {
          name: 'Deactivate Account',
          icon: CiCircleRemove,
          to: '/account/account-deactivation',
          description: 'Permanently deactivate your account if you no longer need it'
        },
      ],
    },
  ];
  


  export const socials = [
    {
      id: "0",
      title: "Discord",
      iconUrl: discordBlack,
      url: "#",
    },
    {
      id: "1",
      title: "Twitter",
      iconUrl: twitter,
      url: "#",
    },
    {
      id: "2",
      title: "Instagram",
      iconUrl: instagram,
      url: "#",
    },
    {
      id: "3",
      title: "Telegram",
      iconUrl: telegram,
      url: "#",
    },
    {
      id: "4",
      title: "Facebook",
      iconUrl: facebook,
      url: "#",
    },
  ];

  export const benefits = [
    {
      id: "0",
      title: "Verify Driver Information",
      text: "Before accepting a ride, verify the driver's information including their name, photo, and license plate number.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage1,
    },
    {
      id: "1",
      title: "Share Trip Details",
      text: "Share trip details with a trusted contact, including the driver's information and estimated time of arrival.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "2",
      title: "Meet in Public Locations",
      text: "Always meet the driver in a public, well-lit area, and avoid getting into the vehicle if you feel uncomfortable.",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage3,
    },
    {
      id: "3",
      title: "Buckle Up",
      text: "Wear your seatbelt during the entire ride, regardless of the distance or duration.",
      backgroundUrl: "./src/assets/benefits/card-4.svg",
      iconUrl: benefitIcon4,
      imageUrl: benefitImage4,
      light: true,
    },
    {
      id: "4",
      title: "Stay Alert",
      text: "Stay alert during the ride and trust your instincts. If something feels off, don't hesitate to speak up or request to end the trip.",
      backgroundUrl: "./src/assets/benefits/card-5.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage5,
    },
    {
      id: "5",
      title: "Rate and Review",
      text: "After the ride, rate and review the driver based on your experience. This helps maintain accountability within the community.",
      backgroundUrl: "./src/assets/benefits/card-6.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage6,
    },
  ];

  export const roadmap = [
    {
      id: "0",
      title: "Cost-saving Opportunities",
      text: "Save money on transportation costs by sharing rides, splitting fuel expenses, tolls, and parking fees with fellow travelers, making travel more affordable for everyone.",
      date: "May 2023",
      status: "done",
      imageUrl: costSaving,
      colorful: true,
    },
    {
      id: "1",
      title: "Social Connections",
      text: "Connect with like-minded individuals and expand your social network through shared rides, fostering meaningful relationships and memorable experiences along the way.",
      date: "May 2023",
      status: "progress",
      imageUrl: socialConnection,
    },
    {
      id: "2",
      title: "Flexible Scheduling",
      text: "Enjoy the flexibility to plan rides according to your schedule and preferences, offering convenient transportation options that adapt to your lifestyle and commitments.",
      date: "May 2023",
      status: "done",
      imageUrl: schedule,
    },
    {
      id: "3",
      title: "Eco-friendly Travel",
      text: "Promote environmental sustainability by traveling with eco-friendly vehicles, reducing pollution and carbon footprint while also cutting down travel costs for users.",
      date: "May 2023",
      status: "progress",
      imageUrl: ecoFriendly,
    },
  ];