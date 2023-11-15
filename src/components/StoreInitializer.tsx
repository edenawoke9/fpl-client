'use client';

import useStore from '@/store';
import { useRef } from 'react';
import { FPLBoostrapStatic } from '@/data/models';

function StoreInitializer({ bootstrap_static }: { bootstrap_static: FPLBoostrapStatic }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ bootstrap_static });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
