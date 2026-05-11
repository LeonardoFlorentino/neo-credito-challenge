import {
  MiniMapContainer,
  MiniMapFrame,
  MiniMapIframe,
  MiniMapLegend,
} from "./styles";

type MiniMapProps = {
  lat: number;
  lng: number;
};

function toEmbedUrl(lat: number, lng: number) {
  const delta = 0.02;
  const minLng = lng - delta;
  const minLat = lat - delta;
  const maxLng = lng + delta;
  const maxLat = lat + delta;

  const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lng}`;
}

export function MiniMap({ lat, lng }: MiniMapProps) {
  const embedUrl = toEmbedUrl(lat, lng);

  return (
    <MiniMapContainer>
      <MiniMapFrame aria-label="Mini mapa da localização da proposta">
        <MiniMapIframe
          title="Mapa da localização aproximada"
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </MiniMapFrame>
      <MiniMapLegend>
        Coordenadas aproximadas: {lat.toFixed(5)}, {lng.toFixed(5)}
      </MiniMapLegend>
    </MiniMapContainer>
  );
}
