'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { FC } from "react";
import { cn } from '@/app/utils/utils';
import { useSession } from 'next-auth/react';
import { roles } from '@/app/constants/constants';

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;

}

export const ActiveLink: FC<Props> = ({ children, href, className="" }) => {
  const pathname = usePathname()
  const { data: session, status  } = useSession();

  if (status === 'loading') {
    return (
      <div className="group inline-flex items-center border-b-2  py-4 text-sm font-medium animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-[70px]"></div>
      </div>
    );
  }

  if(!session){
    return <></>
  }
  // Hide private route if user is not an admin
  if(!session?.roles?.includes(roles.ADMIN) && href === '/private') {
    return <></>
  }


  return (
    <Link href={href} legacyBehavior >
      <a
        className={cn(
          '',
          pathname === href
            ? `border-indigo-500 text-indigo-600 text-indigo-500`
            : `border-transparent text-gray-300 hover:border-gray-100 hover:text-gray-700`,
           ' group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ',
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
};
