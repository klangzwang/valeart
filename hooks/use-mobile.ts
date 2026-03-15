import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

export function useDeviceOrientation() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait');

  React.useEffect(() => {

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const orientationQuery = window.matchMedia('(orientation: portrait)');

    const updateState = () => {
      setIsMobile(mobileQuery.matches);
      setOrientation(orientationQuery.matches ? 'portrait' : 'landscape');
    };

    updateState();

    mobileQuery.addEventListener('change', updateState);
    orientationQuery.addEventListener('change', updateState);

    return () => {
      mobileQuery.removeEventListener('change', updateState);
      orientationQuery.removeEventListener('change', updateState);
    };
  }, []);

  return { isMobile, orientation };
}
