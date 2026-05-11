import styled from "styled-components";

export const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray100};
`;

export const ScoreRing = styled.div<{ $value: number; $color: string }>`
  --size: 72px;

  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: ${({ $value, $color, theme }) =>
    `conic-gradient(${$color} ${$value * 360}deg, ${theme.colors.gray300} ${$value * 360}deg)`};
  display: grid;
  place-items: center;
  flex-shrink: 0;
`;

export const ScoreRingInner = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  display: grid;
  place-items: center;
`;

export const ScorePercent = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 13px;
  font-weight: 700;
`;

export const ScoreMeta = styled.div`
  display: grid;
  gap: 2px;
`;

export const ScoreLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 600;
`;

export const ScoreText = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
`;

export const ScoreHint = styled.span`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 12px;
`;
