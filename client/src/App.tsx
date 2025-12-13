import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Portal from "./components/portal/Portal";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarRefreshTrigger, setSidebarRefreshTrigger] = useState(0);

  return (
    <div className="w-screen h-screen flex flex-col font-sans bg-[var(--color-bg-primary)] text-[var(--color-fg-primary)]">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Portal triggerSidebarRefresh={setSidebarRefreshTrigger} />
        <Sidebar refreshTrigger={sidebarRefreshTrigger} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
