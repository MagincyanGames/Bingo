import { useState } from "react";
import Title from "../../components/Title";
import { usePage } from "../../hooks/usePage";

interface SettingsEntryProps {
  title: string;
  description?: string;
  type: 'BOOL' | 'BUTTON' | 'NUM';
  value: unknown;
  info?: any;
  warning: 'NONE' | 'HIGH';
  onClick: (arg0: any) => void;
}

export function SettingsEntry({ title, description, type, warning, value, onClick, info }: SettingsEntryProps) {

  let entryButton = <div></div>

  switch (type) {
    case "BOOL":
      entryButton = <button className={`px-3 py-1 
                  ${value ? 'bg-ctp-green-600 hover:bg-ctp-green-400 text-ctp-base' : 'bg-ctp-surface1 hover:bg-ctp-surface2 text-ctp-subtext0 '}
                  rounded-lg font-mono text-sm transition-colors cursor-pointer`}
        onClick={onClick}>
        {value ? 'ON' : 'OFF'}
      </button>
      break;

    case "BUTTON":
      entryButton = <button className={`px-3 py-1 
                  ${warning === 'HIGH' ? 'bg-ctp-red-600 hover:bg-ctp-red-400 text-ctp-base font-bold' : 'bg-ctp-lavender-600 hover:bg-ctp-lavender-400 text-ctp-base'}
                  rounded-lg font-mono text-sm transition-colors cursor-pointer`}
        onClick={onClick}>
        {value as string}
      </button>
      break

    case "NUM":
      entryButton =
        <input
          type="number"
          max={info?.max}
          min={info?.min}
          value={value as number}
          className={`px-3 py-2 
                  ${warning === 'HIGH' ? 'bg-ctp-red-600 hover:bg-ctp-red-400 text-ctp-base font-bold' : 'bg-ctp-lavender-600 hover:bg-ctp-lavender-400 text-ctp-base'}
                  rounded-lg font-mono text-sm transition-colors w-20`}
          onChange={onClick} />
      break
  }

  return <div className="flex items-center justify-between gap-6 p-3 bg-ctp-surface0 rounded-xl">
    <span className="flex flex-col">
      <span className="font-bold text-ctp-text">{title}</span>
      {description && <span className="font-normal text-ctp-subtext0 text-sm">{description}</span>}
    </span>
    {entryButton}
  </div>

}

export default function SettingsModule() {
  const { settings, setSettings } = usePage();
  const [deleteSelected, setDeleteSelected] = useState(false);

  return <div className="h-full w-full flex flex-col gap-6 items-center justify-center">
    <Title text='Settings' />
    <div className="flex flex-col gap-4 w-full md:w-[60%] min-h-0 bg-ctp-mantle p-4 rounded-2xl overflow-y-auto">
      <SettingsEntry
        title="TTS"
        description="Enable narrator which is going to tell the numbers."
        type="BOOL"
        value={settings.tts}
        warning="NONE"
        onClick={() => setSettings(prev => ({ ...prev, tts: !prev.tts }))}
      />
      <SettingsEntry
        title="Ball Playing Speed"
        type="NUM"
        description="Indicates the time between 2 random numbers in the playing state"
        value={settings.ballPlayingSpeed}
        warning="NONE"
        info={{ min: 0, max: 100 }}
        onClick={
          (arg0: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            console.log('Changed', arg0.target.value as unknown as number)
            setSettings(
              prev =>
                ({ ...prev, ballPlayingSpeed: Number(arg0.target.value) })
            )
          }
        } />
      <SettingsEntry
        title="Ball Playing Speed"
        type="NUM"
        description="Indicates the time between 2 random numbers in the playing state"
        value={settings.ballPlayingTime}
        warning="NONE"
        info={{ min: 0, max: 5000 }}
        onClick={
          (arg0: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            console.log('Changed', arg0.target.value as unknown as number)
            setSettings(
              prev =>
                ({ ...prev, ballPlayingTime: Number(arg0.target.value) })
            )
          }
        } />
      <SettingsEntry
        title="Delete"
        description="Delete all data stored by the app."
        type="BUTTON"
        value={deleteSelected ? "SURE?" : "WIPE"}
        warning={deleteSelected ? 'HIGH' : 'NONE'}
        onClick={() => {
          if (deleteSelected) {
            localStorage.clear();
            window.location.reload()
          }
          else
            setDeleteSelected(prev => !prev)
        }} />
    </div>
  </div >

}
