import "./globals.css";
import type { Metadata } from "next";
import { UseAuthContext } from "./state/auth/authContext";
import { ThemeProvider } from "./state/themeState/themeProvider";
import { UseSidebarContext } from "./state/sidebar/toggleSidebar";
import { UseMobileNavContext } from "./state/navbar/mobileNavProvider";
import { UseProfileContext } from "@/app/state/chats/profileProvider";
import { UseGroupSidebarContext } from "@/app/state/groups/showSidebar"
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});


export const metadata: Metadata = {
  title: "ChatLoom",
  description: "The ultimate chatapp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} dark:bg-[#1D1D1D]`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UseAuthContext>
            <UseSidebarContext>
              <UseGroupSidebarContext>
                <UseMobileNavContext>
                  <UseProfileContext>
                    {children}
                  </UseProfileContext>
                </UseMobileNavContext>
              </UseGroupSidebarContext>
            </UseSidebarContext>
          </UseAuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
};
