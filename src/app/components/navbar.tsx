import dynamic from "next/dynamic";
import NavbarMobile from "../client/navbar/navbarMobile";
import SideBarToggle from "../client/navbar/sidebarToggle";

const DynamicNavbarClient = dynamic(() => import('@/app/client/navbar/navbarClient'),
  {
    ssr: false,
    loading: () => (
      <aside className="flex items-center">
        <div className="flex items-center animate-pulse">
          <div className="bg-[#E3E3E6] dark:bg-[#616161] z-10 w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] relative">
          </div>
          <div className="bg-[#E3E3E6] dark:bg-[#616161] w-8 h-8 flex items-center justify-center rounded-full mr-1 hover:bg-[#E3E3E6]">
          </div>
        </div>
        <div className="flex items-center">
          <div className="">
            <hr className="mx-3 w-0 border h-8" />
          </div>
          <div className="bg-[#E3E3E6] dark:bg-[#616161] w-8 h-8 flex items-center justify-center rounded-full mr-2 hover:bg-[#E3E3E6] animate-pulse">
          </div>
          <div className="w-20 rounded-md h-6 bg-[#E3E3E6] dark:bg-[#616161] animate-pulse"></div>
        </div>
      </aside>
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