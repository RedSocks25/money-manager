import React from 'react'
import { SidebarOption } from './SidebarOption';
import { BsHouse } from 'react-icons/bs';
import { BiWallet } from 'react-icons/bi';

interface Props {
  title: string;
}

const SidebarMenuOptions = [
  { name: "Home", href: "/home", icon: <BsHouse /> },
  { name: "Accounts", href: "/accounts", icon: <BiWallet /> },
];

export const Sidebar = ({ title }: Props) => {
  return (
    <div className="h-screen w-64 bg-blue-600 text-white fixed top-0 left-0 shadow-xl">
      <div className="p-4">
        <h1 className="text-2xl font-bold justify-center flex">{ title }</h1>
      </div>
      <div>
        {SidebarMenuOptions.map((menu) => (
          <SidebarOption key={menu.name} name={menu.name} href={menu.href} icon={menu.icon} />
        ))}
      </div>
    </div>
  );
}
