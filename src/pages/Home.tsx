import { useCallback, useEffect, useState, useRef } from 'react'
import { useTailwindBreakpoints } from '../hooks/useMediaQuery';
import { usePage } from '../hooks/usePage';
import { HistoryModule } from './HomeModules/History';
import TableModule from './HomeModules/Table';
import { BallModule } from './HomeModules/Ball';
import SettingsModule from './HomeModules/Settings';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type State = 'IDLE' | 'PLAYING' | 'SHOW';


export type Module = 'BALL' | 'TABLE' | 'HISTORY' | 'SETTINGS';
export default function Home() {


  const fullNums = Array.from({ length: 90 }, (_, i) => i + 1)
  const [numbers, setNumbers] = useLocalStorage<number[]>('balls', fullNums);
  const [history, setHistory] = useLocalStorage<number[]>('h-balls', []);
  const [randomNumber, setRandomNumber] = useState<number | string>(history[0]);
  const [state, setState] = useState<State>(history[0] ? 'SHOW' : 'IDLE');
  const { isMd } = useTailwindBreakpoints();
  const { module, setModule, settings } = usePage();

  // TODO: Delete Hack
  const hack = true;
  const hackNums = useRef<number[]>([1, 9, 20, 27, 32, 43, 45, 50, 51, 53, 60, 61, 74, 84, 86]);


  const speak = useCallback((text: string) => {
    console.log('tts', settings.tts)
    if (!settings.tts) return;

    console.log('speaking')
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.75;

    window.speechSynthesis.speak(utterance);
  }, [])

  const selectRandomNumber = useCallback((last: boolean = false) => {
    setNumbers((prevNumbers: number[]) => {
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

        speak(`Ha salido el número ${pickedNumber}, ${pickedNumber.toString().length > 1 ? `${pickedNumber.toString()[0]}, ${pickedNumber.toString()[1]}` : ''}`);

        return prevNumbers.filter(n => n !== pickedNumber);
      }

      return prevNumbers;
    });
  }, [speak, hack]);

  useEffect(() => {
    if (settings.tts)
      speak('La función TTS ha sido activada')
  }, [speak, settings])

  function onKeyPress(ev: KeyboardEvent) {
    if ((ev.code === 'Space' || ev.code === 'Enter' || ev.code.startsWith('Digit')) && state !== 'PLAYING') {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
      setState('PLAYING');
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', onKeyPress);
    return () => window.removeEventListener('keypress', onKeyPress);
  }, [])

  useEffect(() => {
    if (state === 'PLAYING') {
      const int = setInterval(() => {
        selectRandomNumber();
      }, settings.ballPlayingSpeed);

      const timeout = setTimeout(() => {
        clearInterval(int);
        selectRandomNumber(true);
        setState('SHOW');
      }, settings.ballPlayingTime);

      return () => {
        clearInterval(int);
        clearTimeout(timeout);
      };
    }
  }, [state, selectRandomNumber]);


  return (
    <div className="flex flex-1 flex-col md:flex-row justify-center items-center h-full w-full gap-8 md:gap-20">
      <div className="absolute text-md font-mono text-ctp-subtext0 right-4 bottom-2 select-none">v{__APP_VERSION__}</div>
      {(isMd || (!isMd && module === 'BALL')) &&
        <BallModule
          randomNumber={randomNumber}
          state={state}
          setState={setState}
        />}
      {(isMd || (!isMd && module === 'TABLE')) &&
        <TableModule
          numbers={numbers}
          randomNumber={randomNumber}
          state={state}
          setState={setState}
        />}
      {(isMd || (!isMd && module === 'HISTORY')) &&
        <HistoryModule
          history={history}
          randomNumber={randomNumber}
          state={state}
        />}
      {(!isMd && module === 'SETTINGS') &&
        <SettingsModule
        />}
      {(isMd && module === 'SETTINGS') &&
        <div className="absolute flex justify-center items-center h-dvh w-dvw bg-ctp-crust/50 top-0" onClick={() => setModule('BALL')}>
          <div className="relative bg-ctp-surface0 w-[70%] h-[70%] rounded-4xl justify-center items-center flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-6 right-6 
              material-symbols-outlined cursor-pointer rounded-full bg-ctp-lavender hover:bg-ctp-lavender-800 p-3 text-ctp-base font-extrabold!"
              onClick={() => setModule('BALL')}
            >
              close
            </button>
            <SettingsModule />
          </div>
        </div>}
    </div >
  )
}
