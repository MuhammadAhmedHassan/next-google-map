import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

type LatLngLiteral = google.maps.LatLngLiteral;
interface IProps {
  setOffice: (position: LatLngLiteral) => void;
}

function Places({ setOffice }: IProps) {
  return <div>Places</div>;
}

export default Places;
