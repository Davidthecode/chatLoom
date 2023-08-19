import dynamic from "next/dynamic";
const DynamicNavbarClient = dynamic(() => import('@/app/client/navbarClient'), { ssr: false });

export default function Navbar() {
  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center px-4 w-full border-b h-full">
        <aside>
          <h1 className="font-semibold text-lg">CHATLOOM</h1>
        </aside>
        <DynamicNavbarClient />
      </div>
    </div>
  );
};