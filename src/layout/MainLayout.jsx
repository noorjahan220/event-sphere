import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/shared/Navbar';

const MainLayout = () => {
    return (
        <div class="max-w-7xl mx-auto">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;