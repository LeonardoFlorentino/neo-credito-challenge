import styled from "styled-components";

export const StyledFilterBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray900};
  background: ${({ theme }) => theme.colors.surface};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.gray300};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
