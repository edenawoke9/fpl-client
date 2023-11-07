'use client';

import { useRef } from 'react';
import useStore from '@/store';
import { FPLBoostrapStatic, FPLEntry, FPLFixture } from '@/data/models';

function StoreInitializer({
  bootstrap_static,
  fixtures,
  entry,
}: {
  bootstrap_static: FPLBoostrapStatic;
  fixtures: FPLFixture[];
  entry: FPLEntry;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    const fetched = true;
    useStore.setState({ bootstrap_static, fixtures, entry, fetched });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
