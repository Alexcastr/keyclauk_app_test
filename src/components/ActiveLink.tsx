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

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  if(!session){
    return null
  }
  // Hide private route if user is not an admin
  if(session?.roles?.includes(roles.EMPLOYEE) && href === '/private') {
    return null
  }


  return (
    <Link href={href} legacyBehavior>
      <a
        className={cn(
          '',
          pathname === href
            ? `block py-2.5 px-4 bg-[#646b69] text-gray-800 rounded transition duration-200`
            : `block py-2.5 px-4 hover:bg-[#B6EADA] hover:text-gray-800 rounded transition duration-200`,
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
};
