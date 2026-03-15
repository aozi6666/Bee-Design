import { useEffect } from 'react';
function useClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            const el = ref?.current;
            if (!el)
                return;
            if (el.contains(event.target))
                return;
            handler(event);
        };
        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
