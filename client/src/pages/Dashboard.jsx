import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IoCarOutline } from "react-icons/io5";
import { VscPerson } from "react-icons/vsc";
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const chartRef = useRef(null);

  const sampleData = [
    { x: new Date('2024-05-01').getTime(), y: 180 },
    { x: new Date('2024-05-02').getTime(), y: 150 },
    { x: new Date('2024-05-03').getTime(), y: 120 },
    { x: new Date('2024-05-04').getTime(), y: 250 },
    { x: new Date('2024-05-05').getTime(), y: 130 },
  ];

  const barChartOptions = {
    series: [{ data: sampleData }],
    chart: { type: 'bar', height: 350, zoom: { enabled: false } },
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth' },
    title: { text: 'Cost Reduced as a car owner', align: 'left' },
    subtitle: { text: 'In MKD', align: 'left' },
    xaxis: { type: 'datetime' },
    yaxis: { opposite: true },
    legend: { horizontalAlign: 'left' }
  };

  const lineChartOptions = {
    series: [{ name: "Money", data: [150, 130, 250, 170, 170, 260, 200, 150, 240] }],
    chart: { height: 350, type: 'line', zoom: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    title: { text: 'Money saved as traveler', align: 'left' },
    subtitle: { text: 'In MKD', align: 'left' },
    grid: { row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 } },
    xaxis: { categories: ['May 01', 'May 02', 'May 03', 'May 04', 'May 05', 'May 06', 'May 07', 'May 08', 'May 02'] }
  };

  useEffect(() => {
    // Update chart data here if needed
  }, [userInfo]);

  return (
    <div>
      <div className='flex justify-between mt-3'>
        <div className='relative bg-dashboard-pattern bg-cover bg-center rounded-lg p-5 w-[100%] shadow-md'>
          <div className='absolute inset-0 bg-n-8/40 opacity-50 rounded-lg'></div>
          <div className='relative z-1 p-4'>
            <h1 className='h5 font-bold'>Create and join carpool services</h1>
            <p className='body-2 ml-1 mt-2'>We create the perfect opportunity to reduce travel cost</p>
            <div className='mt-5'>
              <button className='bg-sky-700 border border-transparent text-sm hover:border-n-1 py-3 px-5 rounded-md mr-4'>Explore Travels</button>
              <button className='bg-[rgba(0,0,0,0.3)] border py-3 px-5 rounded-md text-sm hover:bg-n-8/60 mt-2 xl:mt-0'>Create Travel</button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10 w-full'>
        <h1 className='h5 font-bold tracking-wider text-n-8/70 ml-3'>My statistics</h1>
        <div className='w-full text-n-8 flex flex-col xl:flex-row max-xl:items-center justify-between mt-5' id='deneme1'>
          <div className='w-[100%] xl:w-[39%] my-3 xl:my-0 shadow rounded-md p-4'>
            <Chart options={barChartOptions} series={barChartOptions.series} type="bar" height={350} width='100%' />
          </div>
          <div className='w-[100%] xl:w-[39%] my-3 xl:my-0 shadow rounded-md p-4'>
            <Chart options={lineChartOptions} series={lineChartOptions.series} type="line" height={350} width='100%' />
          </div>
          <div className='w-[100%] xl:w-[19%] my-3 xl:my-0 rounded-md flex flex-col justify-between text-n-1' id='deneme'>
            <div className='bg-green-600/80 h-[49%] py-5 xl:py-0 rounded-lg flex flex-col items-center justify-center mb-3 xl:mb-0'>
              <div className='p-3 bg-green-600 rounded-full shadow-lg'><IoCarOutline size={40}/></div>
              <h2 className='h2 font-bold mt-2 drop-shadow-xl'>22</h2>
              <h3 className='body-2 italic'>Car Travels Created</h3>
            </div>
            <div className='bg-sky-600/80 h-[49%] py-5 xl:py-0 rounded-lg flex flex-col items-center justify-center'>
              <div className='p-3 bg-sky-600 rounded-full shadow-lg'><VscPerson size={40}/></div>
              <h2 className='h2 font-bold mt-2 drop-shadow-xl'>10</h2>
              <h3 className='body-2 italic'>Travels Joined</h3>
            </div>
          </div>
        </div>
        <Link to='/dashboard' className='text-n-8/70 bg-n-8/10 px-6 py-4 flex items-center w-max my-5 rounded-lg hover:text-n-8/70 mx-auto hover:shadow '>
          <span className='body-2 font-bold'>Click to see more stats</span>
          <GoArrowRight className='ml-2'/>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
