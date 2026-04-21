"use client";

import { BottomNavItem } from "./BottomNavItem";
import { Home, Calendar, Book, ShoppingCart, User } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div
        className="
          mx-auto
          max-w-md
          rounded-2xl
          border
          bg-white
          shadow-lg
        "
      >
        <nav className="flex items-center justify-between px-4 py-2">
          <BottomNavItem href="/home" label="Home" icon={<Home size={20} />} />

          <BottomNavItem
            href="/plan"
            label="Plan"
            icon={<Calendar size={20} />}
          />

          <BottomNavItem
            href="/diary"
            label="Diary"
            icon={<Book size={20} />}
          />

          <BottomNavItem
            href="/shopping"
            label="Shop"
            icon={<ShoppingCart size={20} />}
          />

          <BottomNavItem
            href="/profile"
            label="Profile"
            icon={<User size={20} />}
          />
        </nav>
      </div>
    </div>
  );
}
