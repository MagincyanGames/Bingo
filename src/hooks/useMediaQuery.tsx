import { useMediaQuery } from 'react-responsive';

// Breakpoints por defecto de Tailwind CSS
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const useTailwindBreakpoints = () => {
  const isSm = useMediaQuery({ minWidth: breakpoints.sm });
  const isMd = useMediaQuery({ minWidth: breakpoints.md });
  const isLg = useMediaQuery({ minWidth: breakpoints.lg });
  const isXl = useMediaQuery({ minWidth: breakpoints.xl });

  // Mobile-First: es móvil si no alcanza el breakpoint 'md'
  const isMobile = useMediaQuery({ maxWidth: '767px' });

  return { isSm, isMd, isLg, isXl, isMobile };
};
