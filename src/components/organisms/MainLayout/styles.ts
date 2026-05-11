import styled from "styled-components";

export const StyledMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const StyledContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const StyledContent = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;
