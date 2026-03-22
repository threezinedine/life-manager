import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div id="app-root">
      <Outlet />
    </div>
  );
}
