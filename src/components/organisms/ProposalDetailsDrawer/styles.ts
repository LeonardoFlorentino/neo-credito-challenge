import styled, { css } from "styled-components";

export const DrawerOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.45);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 40;

  ${({ $open }) =>
    $open &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

export const DrawerPanel = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: min(440px, 92vw);
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: -8px 0 24px rgba(17, 24, 39, 0.15);
  transform: translateX(100%);
  transition: transform 0.28s ease;
  z-index: 50;
  display: flex;
  flex-direction: column;

  ${({ $open }) =>
    $open &&
    css`
      transform: translateX(0);
    `}
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const DrawerTitleGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DrawerSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 13px;
`;

export const CloseButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
`;

export const DrawerContent = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FieldBlock = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FieldLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const FieldValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`;

export const SignatureLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const AttemptsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const AttemptItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray100};
  padding: ${({ theme }) => theme.spacing.md};
`;

export const AttemptMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 13px;
`;

export const AttemptOutcome = styled.span<{ $success: boolean }>`
  font-weight: 600;
  color: ${({ theme, $success }) =>
    $success ? theme.colors.success : theme.colors.danger};
`;
