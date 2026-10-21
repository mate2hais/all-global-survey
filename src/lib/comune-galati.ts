// Browser-safe data shared by the coverage page and its (client-only) map.
export type Localitate = { name: string; lat: number; lng: number };

export const GALATI: Localitate = { name: "Municipiul Galați", lat: 45.4353, lng: 28.008 };

export const OVERVIEW_ZOOM = 10;
export const LOCALITY_ZOOM = 13;

export const COMUNE: Localitate[] = [
  { name: "Pechea", lat: 45.648, lng: 27.787 },
  { name: "Independența", lat: 45.478, lng: 27.752 },
  { name: "Șendreni", lat: 45.452, lng: 27.91 },
  { name: "Vânători", lat: 45.516, lng: 27.998 },
  { name: "Smârdan", lat: 45.568, lng: 27.923 },
  { name: "Tulucești", lat: 45.589, lng: 28.012 },
  { name: "Liești", lat: 45.626, lng: 27.596 },
  { name: "Ivești", lat: 45.685, lng: 27.518 },
  { name: "Matca", lat: 45.854, lng: 27.553 },
  { name: "Corod", lat: 45.941, lng: 27.636 },
  { name: "Cudalbi", lat: 45.777, lng: 27.697 },
  { name: "Umbrărești", lat: 45.712, lng: 27.448 },
  { name: "Braniștea", lat: 45.443, lng: 27.824 },
  { name: "Frumușița", lat: 45.664, lng: 28.098 },
  { name: "Foltești", lat: 45.725, lng: 28.084 },
  { name: "Măstăcani", lat: 45.785, lng: 28.043 },
  { name: "Nămoloasa", lat: 45.503, lng: 27.591 },
  { name: "Barcea", lat: 45.764, lng: 27.498 },
  { name: "Munteni", lat: 45.925, lng: 27.436 },
  { name: "Drăgănești", lat: 45.797, lng: 27.465 },
  { name: "Schela", lat: 45.517, lng: 27.853 },
  { name: "Costache Negri", lat: 45.705, lng: 27.739 },
  { name: "Piscu", lat: 45.528, lng: 27.725 },
  { name: "Slobozia Conachi", lat: 45.579, lng: 27.764 },
];
