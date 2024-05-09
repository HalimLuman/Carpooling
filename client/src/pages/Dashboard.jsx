import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar.jsx'

const Dashboard = () => {
  return (
    <div className='lg:px-5 lg:py-5 bg-[#f8f8f8] min-h-[100vh]'>
        <div className='flex justify-center lg:justify-start'>
            <Sidebar />
            <div className='flex flex-col w-full px-2 xl:px-6 lg:ml-[15rem] pb-[3rem] xl:pb-0'>
                <Navbar/>   
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard