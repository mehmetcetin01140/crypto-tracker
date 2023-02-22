import { useState, useEffect } from 'react';

export function useMediaQuery(query:string) {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleMediaQueryChange =( e:MediaQueryListEvent) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, [query]);

  return matches;
}