import { createContext } from 'react';
import { ThemeValue } from '@/types';

export default createContext<
  | {
      theme: ThemeValue;
      setTheme: React.Dispatch<React.SetStateAction<ThemeValue>>;
    }
  | undefined
>(undefined);
