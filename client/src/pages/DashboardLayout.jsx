import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx';
import NavbarDashboard from '../components/NavbarDashboard.jsx'
import FooterDashboard from '../components/FooterDashboard.jsx';

const Dashboard = () => {
  return (
    <div className=' bg-[#f8f8f8] min-h-[100vh]'>
        <div className='flex justify-center lg:justify-start'>
            <Sidebar />
            <div className='flex flex-col w-full px-2 xl:px-6 lg:ml-[15rem] pb-[3rem] xl:pb-0'>
                <NavbarDashboard />   
                <Outlet />
            </div>
        </div>
        <div className='lg:ml-[15rem]'>
          <FooterDashboard/>
        </div>
    </div>
  )
}

export default Dashboard