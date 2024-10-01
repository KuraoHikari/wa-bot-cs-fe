import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import ReactQueryProvider from "./context/ReactQueryProvider";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";
import router from "./route";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
 return (
  <>
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ReactQueryProvider>
     <TooltipProvider>
      <RouterProvider router={router} />
      <Toaster />
     </TooltipProvider>
    </ReactQueryProvider>
   </ThemeProvider>
  </>
 );
}

export default App;
