import type { State } from "../Home"

type TableModuleProps = {
  numbers: number[],
  randomNumber: number | string,
  state: State,
  setState: (s: State) => void,
}

export default function TableModule({ numbers, randomNumber, state }: TableModuleProps) {
  return <div className='flex items-center justify-center w-full md:w-220 h-[97%] @container-[size] bg-ctp-mantle rounded-2xl md:rounded-4xl'>
    <div
      className='grid grid-cols-10 grid-rows-9 gap-2 md:gap-4 p-3 md:p-6 h-full'
      style={{
        width: 'min(100cqw, calc(100cqh * 10 / 9))',
        height: 'min(100cqh, calc(100cqw * 9 / 10))',
      }}
    >
      {Array.from({ length: 90 }, (_, index) => index).map((i) => (
        <div
          key={i}
          className={`flex rounded-full text-sm md:text-xl select-none leading-none justify-center items-center font-bold ${numbers.includes(i + 1) ? 'bg-ctp-surface0/30 text-ctp-subtext0/25' : 'bg-ctp-surface0 text-ctp-text'
            } ${randomNumber === i + 1 && state === 'SHOW' ? 'border-2 md:border-3 border-ctp-lavender' : ''}`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  </div>
}
