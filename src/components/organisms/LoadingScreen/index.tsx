import {
  StyledLoadingContent,
  StyledLoadingLogo,
  StyledLoadingScreen,
  StyledLoadingText,
  StyledSpinner,
} from "./styles";

type LoadingScreenProps = {
  isVisible: boolean;
};

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  return (
    <StyledLoadingScreen $isVisible={isVisible}>
      <StyledLoadingContent>
        <StyledLoadingLogo>Neo Crédito</StyledLoadingLogo>
        <StyledSpinner />
        <StyledLoadingText>Carregando aplicação...</StyledLoadingText>
      </StyledLoadingContent>
    </StyledLoadingScreen>
  );
}
