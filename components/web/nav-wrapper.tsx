'use client';

import { usePathname } from "next/navigation";
import Nav from "./nav";

export default function NavWrapper() {
  const pathname = usePathname();
  
  // Hide main navigation on all admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return <Nav />;
}
