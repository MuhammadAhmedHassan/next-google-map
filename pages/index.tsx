import { useLoadScript } from '@react-google-maps/api';
import type { NextPage } from 'next';
import Maps from '../components/Maps';

const Home: NextPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Maps />;
};

export default Home;
