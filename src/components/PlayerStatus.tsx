import React from 'react';
import Image from 'next/image';
import useStore from '@/store';
import { FPLElement } from '@/data/models';

export function PlayerStatus({ element }: { element: FPLElement }) {
  const status = useStore.getState().getElementStatus(element);
  return (
    <div className='flex w-5 justify-center'>
      <Image src={status.src} alt={status.title} title={status.title} width={status.width} height={status.height} />
    </div>
  );
}
