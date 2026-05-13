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

export const SignatureActionButton = styled.button`
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(95, 99, 211, 0.08)"
      : "rgba(111, 109, 255, 0.18)"};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(95, 99, 211, 0.14)"
        : "rgba(111, 109, 255, 0.26)"};
  }
`;

export const CertificateOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.35);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 55;

  ${({ $open }) =>
    $open &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

export const CertificatePanel = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: min(420px, 92vw);
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: -10px 0 28px rgba(17, 24, 39, 0.22);
  transform: translateX(100%);
  transition: transform 0.28s ease;
  z-index: 60;
  display: flex;
  flex-direction: column;

  ${({ $open }) =>
    $open &&
    css`
      transform: translateX(0);
    `}
`;

export const CertificateContent = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CertificateCard = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray100};
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CertificateRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  span:first-child {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 600;
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    font-weight: 600;
    text-align: right;
  }
`;

export const ValiditySeal = styled.div`
  justify-self: center;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.success};
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(31, 138, 77, 0.1)"
      : "rgba(47, 190, 143, 0.16)"};
  text-align: center;
  font-weight: 700;
  line-height: 1.1;
  font-size: 12px;
`;

export const CertificateFooterNote = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 12px;
  line-height: 1.5;
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
