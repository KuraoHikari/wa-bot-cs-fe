import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import { authLoader } from "./loaders/authLoader";
import { DashboardLayout } from "./layout/DasboardLayout";
import { BotIcon, ChartBar, Store } from "lucide-react";
import { dashboardLoader } from "./loaders/dashboardLoader";
import HomePage from "./pages/HomePage";
import StatisticPage from "./pages/StatisticPage";
import GptSetting from "./pages/GptSetting";

export const authRoute = [
 {
  name: "Home",
  path: "/",
  element: <DashboardLayout />,
  icon: <Store className="h-5 w-5" />,
  loader: dashboardLoader,
  children: [
   {
    index: true,
    element: <HomePage />,
   },
  ],
 },

 {
  name: "Record",
  path: "/record",
  element: <DashboardLayout />,
  icon: <ChartBar className="h-5 w-5" />,
  loader: dashboardLoader,
  children: [
   {
    index: true,
    element: <StatisticPage />,
   },
  ],
 },
 {
  name: "GptSetting",
  path: "/gpt-setting",
  element: <DashboardLayout />,
  icon: <BotIcon className="h-5 w-5" />,
  loader: dashboardLoader,
  children: [
   {
    index: true,
    element: <GptSetting />,
   },
  ],
 },
];
const router = createBrowserRouter([
 ...authRoute,
 {
  path: "/auth",
  element: <AuthLayout />,
  loader: authLoader,
 },
]);

export default router;
