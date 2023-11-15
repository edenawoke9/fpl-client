/* Store with zustand

References:

  [Tutorial] Zustand: A Simple and Powerful State Management Solution
  https://medium.com/@joris.l/tutorial-zustand-a-simple-and-powerful-state-management-solution-9ad4d06d5334

  React-Redux boilerplate makes you mad? Try Zustand!
  https://medium.com/@nfailla93/react-redux-boilerplate-makes-you-mad-try-zustand-f7710032510f

  Did NextJS 13 Break State Management?
  https://www.youtube.com/watch?v=OpMAH2hzKi8
  https://github.com/jherr/nextjs13-state-zustand

More useStore Examples:

  removeItem: (id: number) => void;
  removeItem: (id: number) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

Usage

  // For React Server Component (RSC)
    if (!useStore.getState().fetched) {
      const bootstrap_static = await getBootstrapStatic();
      const entry = await getEntry(parseInt(`${process.env.ENTRY_ID}`));
      const fixtures = await getFixtures();
      useStore.setState({
        bootstrap_static: bootstrap_static,
        entry: entry,
        fixtures: fixtures,
        fetched: true,
      });
    }

  // Works on React Server Component (RSC)
    const bootstrap_static = await getBootstrapStatic();
    const entry = await getEntry();
    const data = {
      bootstrap_static: bootstrap_static,
      entry: entry,
    };
    useStore.setState(data);

  // Not Working:
  // On Client Only?:
    const bootstrap_static = await getBootstrapStatic();
    const entry = await getEntry();

    const setBoostrapStatic = useStore((state) => state.setBoostrapStatic);
    const setEntry = useStore((state) => state.setEntry);

    setBoostrapStatic(bootstrap_static);
    setEntry(entry);

  // Not Working:
  // On Client Only?:
    const bootstrap_static = await getBootstrapStatic();

    useStore.setState().setBoostrapStatic(bootstrap_static);
    useStore.setBoostrapStatic(bootstrap_static);

  // Not Working:
  // On Client Only?:
    const store = useStore();

    store.setBoostrapStatic(bootstrap_static);
    store.setEntry(entry);

    const teams = store.getTeams();

*/
import { create, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { FPLElementStatus, FPLElementStatuses, zeroBootstrapStatic } from '@/data/models';
import { FPLEvent, FPLTeam, FPLElement, FPLElementStat, FPLElementType, FPLBoostrapStatic } from '@/data/models';
import {
  searchElements,
  getElement,
  getElementType,
  getElementStats,
  getElementAvailabilities,
  getElementStat,
  getElementShirt,
  getElementPhoto,
  getTeam,
  getTeamBadge,
  getEvent,
  getCurrentEvent,
  getElementAvailability,
} from '@/data/helpers';

interface Store {
  bootstrap_static: FPLBoostrapStatic;
  // Setters
  setBoostrapStatic: (bootstrap_static: FPLBoostrapStatic) => void;
  // Getters
  getEvent: (id: number) => FPLEvent | undefined;
  getTeam: (id: number) => FPLTeam | undefined;
  getTeamBadge: (team: FPLTeam) => string;
  getTeams: () => FPLTeam[];
  getElement: (id: number) => FPLElement | undefined;
  getElements: () => FPLElement[];
  getElementSearchByName: (name: string) => FPLElement[];
  getElementTeam: (element: FPLElement) => FPLTeam;
  getElementShirt: (element: FPLElement) => string;
  getElementPhoto: (element: FPLElement) => string;
  getElementType: (element: FPLElement) => FPLElementType | undefined;
  getElementTypes: () => FPLElementType[];
  getElementStat: (name: string) => FPLElementStat | undefined;
  getElementStats: () => FPLElementStat[];
  getElementAvailability: (name: string) => FPLElementStat | undefined;
  getElementAvailabilities: () => FPLElementStat[];
  getElementStatus: (element: FPLElement) => FPLElementStatus;
  getCurrentEvent: () => FPLEvent;
}

const zeroStore = {
  bootstrap_static: zeroBootstrapStatic,
} as Store;

const store = (set: StoreApi<Store>['setState'], get: StoreApi<Store>['getState']): Store => ({
  ...zeroStore,
  // Setters
  setBoostrapStatic: (bootstrap_static) =>
    set((state) => ({
      ...state,
      bootstrap_static: bootstrap_static,
    })), // or setBoostrapStatic: (bootstrap_static) => set({ bootstrap_static }), ?
  // Getters
  getEvent: (id) => getEvent(get().bootstrap_static.events, id),
  getTeam: (id) => getTeam(get().bootstrap_static.teams, id),
  getTeamBadge: (team) => getTeamBadge(team),
  getTeams: () => get().bootstrap_static.teams,
  getElement: (id) => getElement(get().bootstrap_static.elements, id),
  getElements: () => get().bootstrap_static.elements,
  getElementSearchByName: (name) => searchElements(get().bootstrap_static.elements, name),
  getElementTeam: (element) => get().bootstrap_static.teams[element.team - 1],
  getElementShirt: (element) => getElementShirt(element),
  getElementPhoto: (element) => getElementPhoto(element),
  getElementType: (element) => getElementType(get().bootstrap_static.element_types, element),
  getElementTypes: () => get().bootstrap_static.element_types,
  getElementStat: (name) => getElementStat(get().bootstrap_static.element_stats, name),
  getElementStats: () => getElementStats(get().bootstrap_static.element_stats),
  getElementAvailability: (name) => getElementAvailability(name),
  getElementAvailabilities: () => getElementAvailabilities(),
  getElementStatus: (element) => FPLElementStatuses[element.chance_of_playing_next_round] || FPLElementStatuses[100],
  getCurrentEvent: () => getCurrentEvent(get().bootstrap_static.events),
});

const useStore = create(
  devtools<Store>(
    // devtools(immer<Store>(
    store
    // )
  )
);

export default useStore;
