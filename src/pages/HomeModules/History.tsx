import { usePage } from "../../hooks/usePage";
import { useTailwindBreakpoints } from "../../hooks/useMediaQuery";
import type { State } from "../Home"
import SettingsModule from "./Settings";

type HistoryModuleProps = {
  history: number[],
  randomNumber: number | string,
  state: State,
}

export function HistoryModule({ history, randomNumber, state }: HistoryModuleProps) {
  const { isMd } = useTailwindBreakpoints();
  const { setModule, setModal } = usePage();

  return <div className='flex flex-col h-[97%] gap-4'>
    <div className='flex-1 grid grid-cols-2 justify-center content-start justify-items-center bg-ctp-mantle p-9 rounded-4xl w-60 overflow-y-auto gap-4 '>
      {history.map(e => <div
        className={`
            flex rounded-full text-ctp-subtext0 shrink-0 w-14 h-14 
            text-xl bg-ctp-surface0 leading-none justify-center items-center font-bold
            select-none
              ${randomNumber === e && state === 'SHOW'
            ? 'border-3 border-ctp-lavender'
            : ''}
            `}
        key={e}>{e}</div>)}
    </div>
    {isMd && <div className='flex flex-row justify-center bg-ctp-surface0 w-full rounded-4xl p-4'>
      <span className='material-symbols-outlined text-3xl! text-ctp-text 
            bg-ctp-surface1 hover:bg-ctp-surface2 
            p-2 leading-none rounded-full select-none cursor-pointer' onClick={() => { setModule('SETTINGS'); setModal(<SettingsModule />) }}>
        settings
      </span>
    </div>}
  </div>
}
