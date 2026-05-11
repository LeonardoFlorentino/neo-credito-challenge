"use client";

import { useEffect, useState } from "react";

import {
  EvidenceCard,
  EvidenceImage,
  EvidenceLabel,
  ViewerContainer,
  ViewerGrid,
  ZoomClose,
  ZoomHeader,
  ZoomImage,
  ZoomOverlay,
  ZoomPanel,
  ZoomTitle,
} from "./styles";

type ZoomTarget = "selfie" | "documento" | null;

type EvidenceViewerProps = {
  selfieUrl: string;
  documentoUrl: string;
};

export function EvidenceViewer({ selfieUrl, documentoUrl }: EvidenceViewerProps) {
  const [zoomTarget, setZoomTarget] = useState<ZoomTarget>(null);

  useEffect(() => {
    if (!zoomTarget) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomTarget(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [zoomTarget]);

  const isOpen = zoomTarget !== null;
  const zoomImageUrl = zoomTarget === "selfie" ? selfieUrl : documentoUrl;
  const zoomTitle = zoomTarget === "selfie" ? "Selfie" : "Foto do Documento";

  return (
    <ViewerContainer>
      <ViewerGrid>
        <EvidenceCard type="button" onClick={() => setZoomTarget("selfie")}>
          <EvidenceLabel>Selfie</EvidenceLabel>
          <EvidenceImage src={selfieUrl} alt="Selfie do assinante" loading="lazy" />
        </EvidenceCard>

        <EvidenceCard type="button" onClick={() => setZoomTarget("documento")}>
          <EvidenceLabel>Foto do Documento</EvidenceLabel>
          <EvidenceImage
            src={documentoUrl}
            alt="Foto do documento do assinante"
            loading="lazy"
          />
        </EvidenceCard>
      </ViewerGrid>

      <ZoomOverlay
        $open={isOpen}
        onClick={() => setZoomTarget(null)}
        aria-hidden={!isOpen}
      >
        <ZoomPanel onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
          <ZoomHeader>
            <ZoomTitle>{zoomTitle}</ZoomTitle>
            <ZoomClose type="button" onClick={() => setZoomTarget(null)} aria-label="Fechar zoom">
              x
            </ZoomClose>
          </ZoomHeader>
          <ZoomImage src={zoomImageUrl} alt={`Visualização ampliada de ${zoomTitle}`} />
        </ZoomPanel>
      </ZoomOverlay>
    </ViewerContainer>
  );
}
