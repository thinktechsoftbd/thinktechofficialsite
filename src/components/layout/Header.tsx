import { getServiceLinks } from "@/lib/data";
import { NavBar } from "./NavBar";

export async function Header() {
  const services = await getServiceLinks();
  return <NavBar services={services} />;
}
