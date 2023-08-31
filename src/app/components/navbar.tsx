import dynamic from "next/dynamic";
const DynamicNavbarClient = dynamic(() => import('@/app/client/navbar/navbarClient'),
  {
    ssr: false,
    loading: () => (
      <aside className="flex items-center">
        <div className="flex items-center animate-pulse">
          <div className="bg-[#E3E3E6] z-10 w-8 h-8 flex items-center justify-center rounded-full mr-3 hover:bg-[#E3E3E6] relative">
          </div>
          <div className="bg-[#E3E3E6] w-8 h-8 flex items-center justify-center rounded-full mr-1 hover:bg-[#E3E3E6]">
          </div>
        </div>
        <div className="flex items-center">
          <div className="">
            <hr className="mx-3 w-0 border h-8" />
          </div>
          <div className="bg-[#E3E3E6] w-8 h-8 flex items-center justify-center rounded-full mr-2 hover:bg-[#E3E3E6] animate-pulse">
          </div>
          <div className="w-20 rounded-md h-6 bg-[#E3E3E6] animate-pulse"></div>
        </div>
      </aside>
    )
  });

export default function Navbar() {
  return (
    <div className="w-full h-full dark:bg-[#111827] dark:text-white dark:opacity-95">
      <div className="flex justify-between items-center px-4 w-full border-b h-full dark:border-[#686C76]">
        <aside>
          <h1 className="font-semibold text-lg">CHATLOOM</h1>
        </aside>
        <DynamicNavbarClient />
      </div>
    </div>
  );
};