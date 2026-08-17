// Web app manifest. Google reads this for the icon it shows beside search
// results, and Android uses it for the home-screen icon — a favicon alone is
// not enough for either. Regenerate the referenced PNGs with
// `npm run gen:logo`.
export default function manifest() {
  return {
    name: 'Gosarvam Global — Harvesting Heritage, Exporting Trust',
    short_name: 'Gosarvam',
    description:
      'Indian export house supplying premium agri and eco products — Assam Tea, Jute, Fox Nuts, Jaggery, Moringa, Psyllium Husk, Cow Dung Eco Solutions and Food Essentials — to buyers across 30+ countries.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#111111',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      // `maskable` lets Android crop to its own shape without clipping the mark.
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
