import {
  ScoreContainer,
  ScoreHint,
  ScoreLabel,
  ScoreMeta,
  ScorePercent,
  ScoreRing,
  ScoreRingInner,
  ScoreText,
} from "./styles";
import { useTheme } from "styled-components";

import type { AppTheme } from "@/styles/theme";

type SimilarityScoreProps = {
  value: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getScoreColor(value: number) {
  if (value >= 0.8) return "success";
  if (value >= 0.6) return "secondary";
  return "danger";
}

function getScoreLabel(value: number) {
  if (value >= 0.8) return "Alta confiança";
  if (value >= 0.6) return "Média confiança";
  return "Baixa confiança";
}

export function SimilarityScore({ value }: SimilarityScoreProps) {
  const theme = useTheme() as AppTheme;
  const safeValue = clamp(value, 0, 1);
  const percentage = (safeValue * 100).toFixed(1);
  const scoreColorToken = getScoreColor(safeValue);
  const scoreColor = theme.colors[scoreColorToken];
  const scoreLabel = getScoreLabel(safeValue);

  return (
    <ScoreContainer aria-label={`Similaridade de ${percentage}%`}>
      <ScoreRing $value={safeValue} $color={scoreColor}>
        <ScoreRingInner>
          <ScorePercent $color={scoreColor}>
            {percentage}%
          </ScorePercent>
        </ScoreRingInner>
      </ScoreRing>

      <ScoreMeta>
        <ScoreLabel>Similaridade</ScoreLabel>
        <ScoreText $color={scoreColor}>{scoreLabel}</ScoreText>
        <ScoreHint>Score biométrico do dossiê</ScoreHint>
      </ScoreMeta>
    </ScoreContainer>
  );
}
