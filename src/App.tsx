import { useCallback, useEffect, useState, useRef } from 'react'
import { useTailwindBreakpoints } from './hooks/useMediaQuery';

type State = 'IDLE' | 'PLAYING' | 'SHOW';
type Module = 'BALL' | 'TABLE' | 'HISTORY';

function App() {
  const [numbers, setNumbers] = useState<number[]>(Array.from({ length: 90 }, (_, i) => i + 1));
  const [randomNumber, setRandomNumber] = useState<number | string>('!');
  const [state, setState] = useState<State>('IDLE');
  const [module, setModule] = useState<Module>('BALL');
  const { isMd } = useTailwindBreakpoints();

  // TODO: Delete Hack
  const hack = true;
  const hackNums = useRef<number[]>([1, 9, 20, 27, 32, 43, 45, 50, 51, 53, 60, 61, 74, 84, 86]);

  const [history, setHistory] = useState<number[]>([]);

  const selectRandomNumber = useCallback((last: boolean = false) => {
    setNumbers((prevNumbers) => {
      if (prevNumbers.length === 0) return prevNumbers;

      let randomIndex = Math.floor(Math.random() * prevNumbers.length);

      if (last && hack && hackNums.current.length > 0 && prevNumbers.length % 7 === 0) {
        const hackResponse = hackNums.current[Math.floor(Math.random() * hackNums.current.length)];

        if (prevNumbers.includes(hackResponse)) {
          randomIndex = prevNumbers.indexOf(hackResponse);
        }
      }

      const pickedNumber = prevNumbers[randomIndex];

      setRandomNumber(pickedNumber);

      if (last) {
        hackNums.current = hackNums.current.filter(i => i !== pickedNumber);
        setHistory(prev => [pickedNumber, ...prev]);

        return prevNumbers.filter(n => n !== pickedNumber);
      }

      return prevNumbers;
    });
  }, []);

  function onKeyPress(ev: KeyboardEvent) {
    if (ev.code === 'Space' && state !== 'PLAYING')
      setState('PLAYING');
  }

  useEffect(() => {
    window.addEventListener('keypress', onKeyPress);
    return () => window.removeEventListener('keypress', onKeyPress);
  }, [])

  useEffect(() => {
    if (state === 'PLAYING') {
      const int = setInterval(() => {
        selectRandomNumber();
      }, 50);

      const timeout = setTimeout(() => {
        clearInterval(int);
        selectRandomNumber(true);
        setState('SHOW');
      }, 2000);

      return () => {
        clearInterval(int);
        clearTimeout(timeout);
      };
    }
  }, [state, selectRandomNumber]);

  return (
    <div className="bg-ctp-base flex flex-col md:flex-row justify-center items-center p-2 md:p-8 gap-20 w-full h-dvh">
      <div className="absolute text-md font-mono text-ctp-subtext0 right-4 bottom-2">v{__APP_VERSION__}</div>
      {(isMd || (!isMd && module === 'BALL')) && <div className='flex flex-col gap-8 items-center'>
        <h1 className='text-ctp-lavender text-5xl md:text-6xl font-bold'>BINGO</h1>
        <div className={`
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
        </div>
      </div>}
      {(isMd || (!isMd && module === 'TABLE')) && <div className='grid grid-cols-10 text-ctp-text gap-2 md:gap-4 bg-ctp-mantle p-3 md:p-6 rounded-2xl md:rounded-4xl w-full md:w-200 h-[60%] md:h-full'>
        {Array.from({ length: 90 }, (_, index) => index)
          .map((i) =>
            <div key={i} className={
              `flex rounded-full text-sm md:text-xl select-none shrink-0
              ${numbers.includes(i + 1)
                ? 'bg-ctp-surface0/30 text-ctp-subtext0/25'
                : 'bg-ctp-surface0 text-ctp-text'
              }
              ${randomNumber === i + 1 && state === 'SHOW'
                ? 'border-2 md:border-3 border-ctp-lavender'
                : ''}
              leading-none w-7 md:w-16 h-7 md:h-16 justify-center items-center font-bold`
            }>{i + 1}</div>
          )}
      </div>}
      {(isMd || (!isMd && module === 'HISTORY')) && <div className='flex flex-col bg-ctp-mantle p-9 rounded-4xl  md:h-full w-40 overflow-y-auto gap-4 items-center'>
        {history.map(e => <div
          className={`
            flex rounded-full text-ctp-subtext0 shrink-0 w-14 h-14 text-xl bg-ctp-surface0 leading-none justify-center items-center font-bold
              ${randomNumber === e && state === 'SHOW'
              ? 'border-3 border-ctp-lavender'
              : ''}
            `}
          key={e}>{e}</div>)}
      </div>}
      {!isMd && <div className='flex bg-ctp-mantle p-6 rounded-3xl text-ctp-text gap-6 text-xl font-bold items-center'>
        <span className='bg-ctp-surface0 p-2 rounded-2xl' onClick={() => setModule('BALL')}>BALL</span>
        <span className='bg-ctp-surface0 p-2 rounded-2xl' onClick={() => setModule('TABLE')}>TABLE</span>
        <span className='bg-ctp-surface0 p-2 rounded-2xl' onClick={() => setModule('HISTORY')}>HIST</span>
      </div>}
    </div >
  )
}

export default App
