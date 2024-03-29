import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Transition } from '@headlessui/react';
import { IconType } from 'react-icons';
import { FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { Search } from './Search';
import { TopBar } from './TopBar';
import { MegaMenu } from './MegaMenu';
import { Collections } from 'types';
import { BottomNavigation } from 'components/Layouts/BottomNavigation/BottomNavigation';
import { useSession, signOut } from 'next-auth/react';
import { IoMdArrowDropright } from 'react-icons/io';
import clsx from 'clsx';
import path from 'path';
const AnnouncementBar = dynamic(() => import('./AnnouncementBar'), {
  ssr: false,
});

export interface NavLink {
  name: 'men' | 'women' | 'kids' | 'sale' | 'blog' | 'contacts';
  href: string;
  collapsible?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'men', href: '/products/men', collapsible: true },
  { name: 'women', href: '/products/women', collapsible: true },
  { name: 'kids', href: '/products/kids' },
  { name: 'sale', href: '/sale' },
  { name: 'blog', href: '/blog' },
  { name: 'contacts', href: '/contacts' },
];

export const sideNavLinks: [string, IconType][] = [
  ['/wishlist', FiHeart],
  ['/cart', FiShoppingBag],
  ['/signin', FiUser],
];

export const Header = ({
  collections,
  isLoading,
}: {
  collections: Collections;
  isLoading: boolean;
}) => {
  const { t } = useTranslation('header');

  const router = useRouter();

  const { data: session } = useSession();

  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();

  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  return (
    <header>
      <AnnouncementBar />
      <TopBar />
      <div className="relative h-14 bg-white shadow-md shadow-gray-200">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <div className="mr-5 flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                priority
                src="/ic-modishop.png"
                alt="logo"
                width={35}
                height={35}
              />
              <span className="text-xl font-semibold">Modishop</span>
            </Link>
          </div>
          <ul className="ml-auto hidden h-full md:flex">
            {navLinks.map((item, index) => (
              <li
                className={clsx(
                  `flex items-center font-medium text-neutral-700 transition-colors`,
                  hoveredNavLink === item && ' bg-violet-100 text-violet-700'
                )}
                key={index}
                onMouseEnter={() => handleShowMenu(item)}
                onMouseLeave={handleCloseMenu}
              >
                {item.collapsible && (
                  <IoMdArrowDropright
                    onClick={() => {
                      hoveredNavLink === item
                        ? handleCloseMenu()
                        : handleShowMenu(item);
                    }}
                    className={clsx(
                      '-mr-3 text-black/60 hover:bg-black/10',
                      hoveredNavLink === item &&
                        'rotate-90 rounded-full hover:text-violet-700',
                      'transition-all duration-300 ease-in-out',
                      'h-7 w-7'
                    )}
                  />
                )}
                <Link
                  href={item.href}
                  className="flex h-full items-center px-5"
                  onClick={handleCloseMenu}
                >
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-auto items-center md:flex">
            <Search onSearch={value => console.log(value)} />
            {sideNavLinks.map(([url, Icon]) => (
              <Link key={url} href={url} className="ml-5 hidden md:block">
                <Icon
                  className="text-neutral-700 transition-colors hover:text-violet-700"
                  size="20px"
                />
              </Link>
            ))}
            {session && (
              <button
                className="ml-5 hidden rounded-full border border-solid border-violet-700 p-[2px] md:block"
                onClick={() => signOut()}
              >
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="user profile image"
                    width={30}
                    height={30}
                    className="overflow-hidden rounded-full"
                    quality={100}
                  />
                )}
              </button>
            )}
          </ul>
        </div>
        <Transition show={Boolean(hoveredNavLink?.collapsible)}>
          {hoveredNavLink && (
            <MegaMenu
              type={hoveredNavLink.name === 'men' ? 'MEN' : 'WOMEN'}
              collections={collections}
              onShowMenu={() => handleShowMenu(hoveredNavLink)}
              onCloseMenu={handleCloseMenu}
              isLoading={isLoading}
            />
          )}
        </Transition>
      </div>
      <BottomNavigation navLinks={navLinks} collections={collections} />
    </header>
  );
};

