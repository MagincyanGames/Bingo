import { useContext } from "react";
import { PageContext } from "../components/ModuleContext";

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('useModule debe usarse dentro de un <Page />');
  }
  return context;
};

