import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx';
import NavbarDashboard from '../components/NavbarDashboard.jsx'
import FooterDashboard from '../components/FooterDashboard.jsx';

const Dashboard = () => {
  return (
    <div className=' bg-n-8/5 min-h-[100vh]'>
        <div className='flex justify-center lg:justify-start'>
            <Sidebar />
            <div className='flex flex-col w-full mx-[1rem] xl:px-8 xl:py-4 lg:ml-[19rem] mt-5 bg-n-1 rounded-xl shadow mb-[4rem] xl:mb-0'>
                <Outlet className="rounded-xl"/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard