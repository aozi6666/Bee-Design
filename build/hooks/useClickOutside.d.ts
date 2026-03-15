import type { RefObject } from 'react';
declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: (event: MouseEvent) => void): void;
export default useClickOutside;
