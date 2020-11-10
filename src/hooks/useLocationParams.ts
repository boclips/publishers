import { useLocation } from 'react-router-dom';

export const useLocationParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
