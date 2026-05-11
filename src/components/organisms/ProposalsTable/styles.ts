import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Table = styled.table`
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    text-align: left;
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  }

  th {
    color: ${({ theme }) => theme.colors.gray700};
    font-weight: 600;
    background: ${({ theme }) => theme.colors.gray100};
  }

  tbody tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.gray100};
  }

  tbody tr {
    cursor: pointer;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }

  tbody tr:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;
