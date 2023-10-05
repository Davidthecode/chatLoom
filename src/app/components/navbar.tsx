import dynamic from "next/dynamic";
import NavbarMobile from "../client/navbar/navbarMobile";
import SideBarToggle from "../client/navbar/sidebarToggle";
import {NavBarSkeleton} from '@/app/components/skeleton'

const DynamicNavbarClient = dynamic(() => import('@/app/client/navbar/navbarClient'),
  {
    ssr: false,
    loading: () => (
      <NavBarSkeleton />
    )
  });

export default function Navbar() {
  return (
    <div className="w-full h-full dark:bg-[#1D1D1D] dark:text-white font-mulish">
      <div className="flex justify-between items-center px-3 w-full border-b h-full dark:border-opacity-30 dark:border-[#686C76]">
        <aside className="flex items-center">
          <div className="md:hidden smallTablet:block narrowDesktop:block mr-2">
            <SideBarToggle />
          </div>
          <h1 className="text-lg dark:opacity-95">CHATLOOM</h1>
        </aside>
        <div className="md:hidden ml-auto">
          <NavbarMobile />
        </div>
        <DynamicNavbarClient />
      </div>
    </div>
  );
};