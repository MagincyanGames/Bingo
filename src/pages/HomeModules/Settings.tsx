import Title from "../../components/Title";
import { usePage } from "../../hooks/usePage";

export default function SettingsModule() {
  const { settings, setSettings } = usePage();
  return <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
    <Title text='Settings' />
    <div className="flex flex-col gap-2 w-full max-w-md bg-ctp-mantle p-4 rounded-2xl">
      <div className="flex items-center justify-between p-3 bg-ctp-surface0 rounded-xl">
        <span className="font-bold text-ctp-text">TTS</span>
        <button className={`px-3 py-1 
                  ${settings.tts ? 'bg-ctp-green-600 hover:bg-ctp-green-400 text-ctp-base' : 'bg-ctp-surface1 hover:bg-ctp-surface2 text-ctp-subtext0 '}
                  rounded-lg font-mono text-sm transition-colors cursor-pointer w-12`}
          onClick={() => setSettings(prev => ({ ...prev, tts: !prev.tts }))}>
          {settings.tts ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  </div>

}
