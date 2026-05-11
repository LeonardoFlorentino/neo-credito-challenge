import {
  MiniMapContainer,
  MiniMapFrame,
  MiniMapGrid,
  MiniMapLegend,
  MiniMapMarker,
} from "./styles";

type MiniMapProps = {
  lat: number;
  lng: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toMapPosition(lat: number, lng: number) {
  const top = ((90 - lat) / 180) * 100;
  const left = ((lng + 180) / 360) * 100;

  return {
    top: clamp(top, 8, 92),
    left: clamp(left, 8, 92),
  };
}

export function MiniMap({ lat, lng }: MiniMapProps) {
  const marker = toMapPosition(lat, lng);

  return (
    <MiniMapContainer>
      <MiniMapFrame aria-label="Mini mapa da localização da proposta">
        <MiniMapGrid />
        <MiniMapMarker $top={marker.top} $left={marker.left} />
      </MiniMapFrame>
      <MiniMapLegend>
        Coordenadas aproximadas: {lat.toFixed(5)}, {lng.toFixed(5)}
      </MiniMapLegend>
    </MiniMapContainer>
  );
}
