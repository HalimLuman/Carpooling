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
      title: "Home  ",
      url: "/",
    },
    {
      id: "1",
      title: "How to use",
      url: "/pricing",
    },
    {
      id: "2",
      title: "Safety Guideline",
      url: "/features",
    },
    {
      id: "3",
      title: "Explore",
      url: "/explore",
    },
  ];

  export const sidebar = [
    {
      title: 'DASHBOARD',
      links: [
        {
          name: 'Dashboard',
          icon: MdOutlineSpaceDashboard,
          to: '/dashboard',
        },
        {
          name: 'Explore',
          icon: MdOutlineExplore ,
          to: '/explore',
        },
        {
          name: 'Create Travel',
          icon: LuPlusCircle,
          to: 'create-post',
        },
        {
          name: 'History',
          icon: RiHistoryFill ,
          to: '/dashboard/history',
        },
        {
          name: 'Statistics',
          icon: MdOutlineQueryStats ,
          to: '/dashboard/statistics',
        },
      ],
    },
    {
      title: 'SETTINGS',
      links: [
        {
          name: 'Profile',
          icon: FaRegUser,
          to: '/dashboard/:id',
        },
        {
          name: 'Subscription',
          icon: BsCoin,
          to: 'subscription',
        },
        {
          name: 'Password',
          icon: MdOutlinePrivacyTip,
          to: 'change-password',
        },
      ],
    },
    {
      title: 'HELP CENTER',
      links: [
        {
          name: 'Support',
          icon: SlSupport,
          to: '/support',
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