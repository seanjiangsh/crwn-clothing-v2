import { Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <div>
        <h1>Nav bar</h1>
      </div>
      <Outlet />
    </div>
  );
}
