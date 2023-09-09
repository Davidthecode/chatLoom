import './globals.css';
import type { Metadata } from 'next';
import { UseAuthContext } from './state/auth/authContext';
import { ThemeProvider } from './state/themeState/themeProvider';
import { UseSidebarContext } from './state/sidebar/toggleSidebar';
import { UseMobileNavContext } from './state/navbar/mobileNavProvider'
import { Mulish } from 'next/font/google'

const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
})


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
              <UseMobileNavContext>
                {children}
              </UseMobileNavContext>
            </UseSidebarContext>
          </UseAuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
};
