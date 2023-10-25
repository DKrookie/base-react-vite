import { useRef } from 'react';

function useInputChange<
  T extends Element = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
>(
  callback: (arg: EventTarget & T) => void,
): {
  onChange: React.ChangeEventHandler<T>;
  onCompositionStart: React.CompositionEventHandler<T>;
  onCompositionEnd: React.CompositionEventHandler<T>;
} {
  const compositionFlag = useRef(false);

  return {
    onChange: (e: React.ChangeEvent<T>) => {
      if (!compositionFlag.current) {
        callback(e.currentTarget);
      }
    },
    onCompositionStart: () => {
      compositionFlag.current = true;
    },
    onCompositionEnd: (e) => {
      compositionFlag.current = false;
      callback(e.currentTarget);
    },
  };
}

export default useInputChange;
