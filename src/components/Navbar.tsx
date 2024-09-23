
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { EmptyUser } from '@/components/icons/icons';
import { ActiveLink } from '@/components/ActiveLink';
import { ProfileOptions } from '@/components/ProfileOptions';

import {authToggleOptions} from '@/app/constants/constants';

import {getServerSession} from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MobileActiveLink } from '@/components/MobileActiveLink';
import Login from '@/components/Login';
import Logout from '@/components/Logout';


const navigation = [
  { name: 'Home', href: '/'},
  { name: 'Private route', href: '/private'}
];
const userNavigationDropdown = [
  { name: 'Sign out', 
    type: authToggleOptions.LOGOUT },
  {
    name: 'Sign in',
    type: authToggleOptions.LOGIN
  }
];



export default async function Navbar({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);
  // console.log("session", session)
  return (
    <>
      <div className="min-h-full">
        {session ? (
          <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => {
                      return (
                        <ActiveLink key={item.name} href={item.href}>
                          {item.name}
                        </ActiveLink>
                      );
                    })}
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <div>{session ? session?.user?.name : ''}</div>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-lg hover:text-indigo-600 hover:scale-110 transition-all duration-200">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <EmptyUser className="h-8 w-8 rounded-full border " />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white cursor-pointer group hover:bg-indigo-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {userNavigationDropdown.map((item) => (
                          <ProfileOptions
                            key={item.name}
                            name={item.name}
                            type={item.type}
                          />
                        ))}
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="block h-6 w-6 group-data-[open]:hidden"
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="hidden h-6 w-6 group-data-[open]:block"
                    />
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <MobileActiveLink
                    key={item.name}
                    name={item.name}
                    href={item.href}
                  >
                    {item.name}
                  </MobileActiveLink>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                {session ? (
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <EmptyUser className="h-8 w-8 rounded-full border " />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {session?.user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {session?.user?.email}
                      </div>
                    </div>
                    <Logout className="text-white  text-base hover:text-indigo-600 transition-colors duration-200" />
                  </div>
                ) : (
                  <Login className="text-white  text-base hover:text-indigo-600 transition-colors duration-200" />
                )}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ) : (
          <> </>
        )}

        <header className="bg-white shadow"></header>
        <main>
          <div className="w-full">{children}</div>
        </main>
      </div>
    </>
  );
}
