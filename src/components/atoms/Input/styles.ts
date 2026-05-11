import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray900};
  background: ${({ theme }) => theme.colors.surface};
  caret-color: ${({ theme }) => theme.colors.gray900};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
    opacity: 1;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.gray300};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.gray900};
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.surface}
      inset;
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.surface} inset;
  }
`;
