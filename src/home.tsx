import { Outlet } from "@tanstack/react-location";
import { useShared } from "./modules/shared/store/active";

export function Home() {

  const { active_month } = useShared();
  
  return <Outlet />;
}
