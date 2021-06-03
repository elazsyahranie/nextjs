import Link from "next/Link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login"); // Kalau pakai query param, jadikan template literals
  };
  return (
    <>
      <Link href="/">Home</Link> |<Link href="profile">Profile</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
