import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/shared/Navbar';

const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <Outlet />
            <footer className="text-center text-sm text-slate-500 py-6">
                © {new Date().getFullYear()} EventSphere. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;