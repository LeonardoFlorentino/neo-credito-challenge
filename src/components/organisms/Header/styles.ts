import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
`;

export const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
`;

export const StyledProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  p {
    margin: 0;
  }

  span {
    margin: 0;
  }
`;
