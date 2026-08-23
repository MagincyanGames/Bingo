import { useState, type ReactNode } from "react";
import { useTailwindBreakpoints } from "../hooks/useMediaQuery";
import type { Module } from "../pages/Home";
import { PageContext, type Settings } from "./ModuleContext";
import { useLocation, useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";

type PageProps = {
  children: ReactNode,
}

export default function Page({ children }: PageProps) {
  const { isMd } = useTailwindBreakpoints();
  const [module, setModule] = useState<Module>('BALL');
  const [settings, setSettings] = useLocalStorage<Settings>('settings', {
    tts: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;



  function changeModule(module: Module) {

    if (currentPath !== '/')
      navigate('/');

    setModule(module);
  }

  return <PageContext.Provider value={{ module, setModule, settings, setSettings }}>
    <div className={`bg-ctp-base flex flex-col
     p-8 w-dvw h-dvh gap-8`}>
      <div className='flex flex-1 w-full h-full '>
        {children}
      </div>
      {!isMd && <div className='flex bg-ctp-mantle p-5 rounded-4xl text-ctp-text gap-5 text-5xl font-bold justify-center'>
        <span className='material-symbols-outlined bg-ctp-surface0 p-3 rounded-full' onClick={() => changeModule('BALL')}>counter_8</span>
        <span className='material-symbols-outlined bg-ctp-surface0 p-3 rounded-full' onClick={() => changeModule('TABLE')}>table</span>
        <span className='material-symbols-outlined bg-ctp-surface0 p-3 rounded-full' onClick={() => changeModule('HISTORY')}>history</span>
        <span className='material-symbols-outlined bg-ctp-surface0 p-3 rounded-full' onClick={() => changeModule('SETTINGS')}>settings</span>
      </div>}
    </div >
  </ PageContext.Provider>
}
