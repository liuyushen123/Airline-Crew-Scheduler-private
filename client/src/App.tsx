import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Portal from './components/portal/Portal';
import Sidebar from './components/Sidebar';

function App() {
  const [refreshTrigger, triggerSidebarRefresh] = useState<number>(0);

  return (
    <div className="w-screen h-screen flex flex-col flex-1 font-sans bg-bg-primary">
      
      <Header />

      <div className="flex flex-row flex-1 h-[77.5%] px-2 py-4">
        <Portal triggerSidebarRefresh={triggerSidebarRefresh}/>
        <Sidebar refreshTrigger={refreshTrigger}/>
      </div>

      <Footer />
    </div>
  );
}

export default App;
