'use client';

import React from 'react';
import Image from 'next/image';
import useStore from '@/store';
import { FPLElement } from '@/data/models';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface PlayerDialogProps {
  children: React.ReactNode;
  element: FPLElement;
  className?: string;
}

export function PlayerDialog({ children, element, className }: PlayerDialogProps) {
  const element_type = useStore.getState().getElementType(element);
  const team = useStore.getState().getElementTeam(element);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={cn('flex items-center', className)}>{children}</button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {element.first_name} {element.second_name}
          </DialogTitle>
          <DialogDescription>{element_type?.singular_name}</DialogDescription>
        </DialogHeader>
        <Image
          src={useStore.getState().getElementPhoto(element)}
          alt='Player photo'
          width={200}
          height={200}
          priority
        />
        {team.name}
        <DialogFooter>{element.news}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
