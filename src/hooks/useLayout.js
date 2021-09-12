import { useContext, useEffect } from 'react';
import { LayoutContext } from '@contexts/LayoutContext';

export default function useLayout(onBack, onFooterClick) {
  const context = useContext(LayoutContext);

  useEffect(() => {
    if (context.backEvent) {
      typeof onBack === 'function' ? onBack() : '';
    }
  }, [context.backEvent]);

  useEffect(() => {
    if (context.footerEvent) {
      typeof onFooterClick === 'function' ? onFooterClick() : '';
    }
  }, [context.footerEvent]);

  return [ ];
}
