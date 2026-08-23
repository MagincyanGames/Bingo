import Title from "../../components/Title"
import type { State } from "../Home"

type BallModuleProps = {
  randomNumber: number | string,
  state: State,
  setState: (s: State) => void,
}

export function BallModule({ randomNumber, setState, state }: BallModuleProps) {
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
  </div>
}
