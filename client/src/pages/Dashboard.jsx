import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar.jsx'

const Dashboard = () => {
  return (
    <div className='m-0 p-0 bg-n-8/10'>
        <div className='flex'>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <Navbar/>   
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard