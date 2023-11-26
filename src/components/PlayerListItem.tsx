import React from 'react';
import Image from 'next/image';
import useStore from '@/store';
import { FPLElement } from '@/data/models';

export function PlayerListItem({ element }: { element: FPLElement }) {
  return (
    <div className='flex items-center gap-2'>
      <Image
        src={useStore.getState().getElementShirt(element)}
        alt='Player shirt'
        width={24}
        height={32}
        className='flex-shrink-0'
      />
      <div className='flex-grow'>
        <div className='flex flex-col items-start justify-center'>
          <strong className=''>{element.web_name}</strong>
          {useStore.getState().getElementType(element)?.singular_name_short}{' '}
          {useStore.getState().getElementTeam(element).short_name}
        </div>
      </div>
    </div>
  );
}
