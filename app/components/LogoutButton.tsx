'use client';

import { useRouter } from "next/navigation";
import { resetAuthCookies } from '../lib/actions';
import MenuLink from "./navbar/MenuLink";

interface LogoutButtonProps {
  onLogout?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    const router = useRouter();

    const submitLogout = async () => {
    try {
      //await resetAuthCookies(); // ✅ ensure cookies are cleared first
      await fetch('/api/auth/logout', { method: 'POST' }); // call server route
      if (onLogout) onLogout(); // ✅ let parent know we logged out
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
    return (
        <MenuLink
            label="Log out"
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;