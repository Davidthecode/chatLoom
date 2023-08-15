import dynamic from "next/dynamic"
const DynamicNavbarClient = dynamic(() => import('@/app/client/navbarClient'), { ssr: false })

export default function Navbar() {  
  return (
    <div className="w-full">
      <div className="flex justify-between h-12 items-center px-4 w-full border-b">
        <aside>
          <h1 className="font-semibold text-lg">CHATLOOM</h1>
        </aside>
        <DynamicNavbarClient />
      </div>
    </div>
  )
}