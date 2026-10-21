// Browser-only: imports Leaflet. Load via React.lazy behind <ClientOnly>.
import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { GALATI, LOCALITY_ZOOM, OVERVIEW_ZOOM, type Localitate } from "@/lib/comune-galati";

function FlyTo({ place, zoom }: { place: Localitate; zoom: number }) {
  const map = useMap();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    map.flyTo([place.lat, place.lng], zoom, { duration: 1.1 });
  }, [map, place, zoom]);
  return null;
}

export default function CoverageMap({ selected }: { selected: Localitate | null }) {
  const place = selected ?? GALATI;
  const zoom = selected ? LOCALITY_ZOOM : OVERVIEW_ZOOM;
  const markerRef = useRef<L.Marker | null>(null);

  const icon = useMemo(
    () =>
      L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    [],
  );

  useEffect(() => {
    if (selected) markerRef.current?.openPopup();
  }, [selected]);

  return (
    <MapContainer
      center={[GALATI.lat, GALATI.lng]}
      zoom={OVERVIEW_ZOOM}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker ref={markerRef} position={[place.lat, place.lng]} icon={icon}>
        <Popup>{place.name}</Popup>
      </Marker>
      <FlyTo place={place} zoom={zoom} />
    </MapContainer>
  );
}
