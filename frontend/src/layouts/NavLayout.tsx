import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

const NavLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer /> {/* This will stay at the bottom of the page */}
    </div>
  );
};

export default NavLayout;
