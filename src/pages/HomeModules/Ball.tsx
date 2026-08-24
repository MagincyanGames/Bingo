import Title from "../../components/Title"
import { usePage } from "../../hooks/usePage"
import type { State } from "../Home"

type BallModuleProps = {
  randomNumber: number | string,
  setRandomNumber: (e: number | string) => void,
  state: State,
  setState: (s: State) => void,
  fullNums: number[],
  setHistory: (h: number[]) => void,
  setNumbers: (h: number[]) => void,
}

export function BallModule({ randomNumber, setRandomNumber, setState, state, setHistory, setNumbers, fullNums }: BallModuleProps) {
  const { setModal } = usePage();

  return <div className='flex flex-col gap-8 items-center'>
    <Title text='BINGO' />
    <button className={`
      flex w-30 md:w-40 h-30 md:h-40 bg-ctp-surface0 rounded-full leading-none text-6xl font-bold text-ctp-lavender justify-center items-center
      cursor-pointer hover:bg-ctp-surface1 border-4 select-none
      ${state === 'IDLE'
        ? 'border-ctp-peach'
        : state === 'PLAYING'
          ? 'border-ctp-green' : ''}
      `}
      onClick={() => {
        if (state !== 'PLAYING')
          setState('PLAYING')
      }}>
      {randomNumber}
    </button>
    <button className="flex justify-center gap-1 bg-ctp-red hover:bg-ctp-red-400 px-3 py-1 rounded-xl text-ctp-base! items-center cursor-pointer"
      onClick={() => setModal(<div className="flex flex-col justify-center gap-10 text-xl items-center">
        <h1 className="text-ctp-text text-center">Are you sure about restarting the game?</h1>
        <button className="flex justify-center gap-1 bg-ctp-red hover:bg-ctp-red-400 px-3 py-1 rounded-xl text-ctp-base! items-center cursor-pointer w-20" onClick={() => {
          setNumbers(fullNums)
          setHistory([])
          setRandomNumber('!')
          setState('IDLE')
          setModal(undefined)
        }}>Restart</button>
      </div>)}
    >
      <span className="material-symbols-outlined inline-flex! items-center! justify-center! w-[1em]! h-[1em]! leading-none! text-ctp-base! font-bold! text-2xl!">
        restart_alt
      </span>
      <span className="h-fit text-xl font-bold">RESTART</span>
    </button>
  </div>
}
