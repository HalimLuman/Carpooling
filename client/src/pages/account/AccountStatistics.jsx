import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Section from '../../components/design/Section';
import AccountHeader from '../../components/AccountHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchPostsQuery } from '../../slices/apiSlice';
import { useTranslation } from 'react-i18next';

Chart.register(...registerables);

const AccountStatistics = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: posts = [], isLoading, isError, refetch } = useFetchPostsQuery();
  const { t } = useTranslation();
  const joined = posts.filter(post => userInfo?.joinedPosts?.includes(post._id));
  const created = posts.filter(post => userInfo?.posts?.includes(post._id));
  let moneySpent = 0;
  let moneyEarned = 0;
  joined.forEach(post => {
    moneySpent += post.price;
  });
  created.forEach(post => {
    moneyEarned += post.price * post.reservations.length;
  });

  const barData = {
    labels: [`${t("ACCOUNT.Pages.stats.created")}`, `${t("ACCOUNT.Pages.stats.joined")}`],
    datasets: [
      {
        label: `${t("ACCOUNT.Pages.stats.numberOfTravels")}`,
        data: [userInfo?.posts?.length || 0, userInfo?.joinedPosts?.length || 0],
        backgroundColor: ['#4CAF50', '#FF6384'],
      },
    ],
  };

  const pieData = {
    labels: [`${t("ACCOUNT.Pages.stats.earned")}`, `${t("ACCOUNT.Pages.stats.spent")}`],
    datasets: [
      {
        label: 'Money',
        data: [moneyEarned, moneySpent],
        backgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  const handleGoToProfile = () => {
    if (userInfo?._id) {
      navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
    }
  };

  const headerElements = [
    { label: `${t("ACCOUNT.Links.homeSM")}`, link: '/' },
    { label: `${t("ACCOUNT.Links.accountSM")}`, link: '/account' },
    { label: `${t("ACCOUNT.Pages.stats.title")}` },
  ];

  return (
    <Section>
      <div className='container mx-auto px-4 text-n-8 dark:text-white min-h-[72vh]'>
        <div className='flex flex-wrap container'>
          <div className='w-full'>
            <AccountHeader elements={headerElements} handleGoToProfile={handleGoToProfile} />
            <div className='flex flex-col xl:flex-row gap-8 w-full xl:w-[90%] mx-auto dark:text-n-1'>
              <div className='bg-white dark:bg-neutral-800 p-6 rounded-lg shadow w-full xl:w-2/3'>
                <h2 className='text-xl mb-5 '>{t("ACCOUNT.Pages.stats.travelsOverview")}</h2>
                <Bar data={barData} options={{ responsive: true }} />
              </div>
              <div className='bg-white dark:bg-neutral-800 p-6 rounded-lg shadow w-full xl:w-1/3'>
                <h2 className='text-xl mb-5'>{t("ACCOUNT.Pages.stats.financialOverview")}</h2>
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
          <div className='w-full xl:w-[90%] mx-auto mt-10 dark:text-n-1'>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-full'>
              <div className='bg-white dark:bg-neutral-800 p-6 rounded-lg shadow text-center'>
                <h3 className='text-2xl'>{t("ACCOUNT.Pages.stats.travelsCreated")}</h3>
                <p className='text-4xl'>{userInfo?.posts?.length || 0}</p>
              </div>
              <div className='bg-white dark:bg-neutral-800 p-6 rounded-lg shadow text-center'>
                <h3 className='text-2xl'>{t("ACCOUNT.Pages.stats.travelsJoined")}</h3>
                <p className='text-4xl'>{userInfo?.joinedPosts?.length || 0}</p>
              </div>
              <div className='bg-white dark:bg-neutral-800 p-6 rounded-lg shadow text-center'>
                <h3 className='text-2xl'>{t("ACCOUNT.Pages.stats.moneyEarned")}</h3>
                <p className='text-4xl'>${moneyEarned}</p>
              </div>
              <div className='bg-white dark:bg-neutral-800 p-6 rounded-lg shadow text-center'>
                <h3 className='text-2xl'>{t("ACCOUNT.Pages.stats.moneySpent")}</h3>
                <p className='text-4xl'>${moneySpent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AccountStatistics;
