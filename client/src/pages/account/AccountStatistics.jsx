import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Section from '../../components/design/Section';
import AccountHeader from '../../components/AccountHeader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchPostsQuery } from '../../slices/apiSlice';

Chart.register(...registerables);

const AccountStatistics = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: posts = [], isLoading, isError, refetch } = useFetchPostsQuery();

  const joined = posts.filter(post => userInfo.joinedPosts.includes(post._id));
  const created = posts.filter(post => userInfo.posts.includes(post._id));
  let moneySpent = 0;
  let moneyEarned = 0;
  joined.forEach(post => {
    moneySpent += post.price;
  });
  created.forEach(post => {
    moneyEarned += post.price;
  });

  const barData = {
    labels: ['Created', 'Joined'],
    datasets: [
      {
        label: 'Number of Travels',
        data: [userInfo.posts.length, userInfo.joinedPosts.length],
        backgroundColor: ['#4CAF50', '#FF6384'],
      },
    ],
  };

  const pieData = {
    labels: ['Earned', 'Spent'],
    datasets: [
      {
        label: 'Money',
        data: [moneyEarned, moneySpent],  // Assuming you fetch earnings similarly, set earnings value instead of 0
        backgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  const handleGoToProfile = () => {
    navigate(`/profiles/${userInfo._id}`, { state: { postOwner: userInfo } });
  }

  const headerElements = [
    { label: 'Home', link: '/' },
    { label: 'Account', link: '/account' },
    { label: 'Statistics' }
  ];

  return (
    <Section>
      <div className='container mx-auto px-4 text-n-8 dark:text-white min-h-[72vh]'>
        <div className='flex flex-wrap container'>
          <div className='w-full'>
            <AccountHeader elements={headerElements} handleGoToProfile={handleGoToProfile}/>
            <div className='flex flex-col xl:flex-row gap-8 w-full xl:w-[90%] mx-auto dark:text-n-1'>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full xl:w-2/3'>
                <h2 className='text-xl mb-5 '>Travels Overview</h2>
                <Bar data={barData} options={{ responsive: true }} />
              </div>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full xl:w-1/3'>
                <h2 className='text-xl mb-5'>Financial Overview</h2>
                <Pie data={pieData} options={{ responsive: true }} />
              </div>
            </div>
          </div>
          <div className='w-full xl:w-[90%] mx-auto mt-10 dark:text-n-1'>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 w-full'>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center'>
                <h3 className='text-2xl'>Travels Created</h3>
                <p className='text-4xl'>{userInfo.posts.length}</p>
              </div>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center'>
                <h3 className='text-2xl'>Travels Joined</h3>
                <p className='text-4xl'>{userInfo.joinedPosts.length}</p>
              </div>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center'>
                <h3 className='text-2xl'>Money Earned</h3>
                <p className='text-4xl'>${moneyEarned}</p>  {/* Set actual earned amount */}
              </div>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center'>
                <h3 className='text-2xl'>Money Spent</h3>
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
