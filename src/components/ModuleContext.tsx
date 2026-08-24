import { createContext, type ReactNode } from "react";
import type { Module } from "../pages/Home";

export interface PageContextType {
  module: Module;
  setModule: React.Dispatch<React.SetStateAction<Module>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  modal: ReactNode;
  setModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export interface Settings {
  tts: boolean,
  ballPlayingSpeed: number,
  ballPlayingTime: number,
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

