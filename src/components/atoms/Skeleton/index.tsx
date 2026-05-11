import type { CSSProperties } from "react";

import { StyledSkeleton } from "./styles";

type SkeletonProps = {
  width?: string;
  height?: string;
  radius?: string;
  className?: string;
  style?: CSSProperties;
};

export function Skeleton({ width, height, radius, className, style }: SkeletonProps) {
  return (
    <StyledSkeleton
      className={className}
      style={style}
      $width={width}
      $height={height}
      $radius={radius}
      aria-hidden="true"
    />
  );
}
