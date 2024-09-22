'use client'
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import {classNames} from '@/app/constants/constants';
import {
  
  DisclosureButton,
  
} from '@headlessui/react';

interface Props {
  children: React.ReactNode;
  href: string;
  name: string;

}
export const MobileActiveLink: FC<Props> = ({ children, name, href,} )  => {

  const pathname = usePathname()
  return (
    <DisclosureButton
    key={name}
    as="a"
    href={href}
    aria-current={ pathname === href ? 'page' : undefined}
    className={classNames(
       pathname === href
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
      'block rounded-md px-3 py-2 text-base font-medium'
    )}
  >
    {children}
  </DisclosureButton>
  )
}
