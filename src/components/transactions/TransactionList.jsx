import React from "react";
import styled from "styled-components";
import { formatDate, formatAmount } from "../../utils/formatters";

export default function TransactionList({
  transactions,
  currentPage,
  itemsPerPage,
  hideEditButtons,
  onEdit,
  onDelete,
}) {
  if (!transactions || transactions.length === 0) {
    return <p>표시할 거래 내역이 없습니다.</p>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Table>
      <thead>
        <tr>
          <Th>날짜</Th>
          <Th>금액</Th>
          <Th>분류</Th>
          <Th>자산</Th>
          <Th>내용</Th>
          {!hideEditButtons && <Th>편집</Th>}
        </tr>
      </thead>
      <tbody>
        {paginatedTransactions.map((transaction) => {
          const isIncome = "incomeId" in transaction;
          const uniqueKey = isIncome
            ? `income-${transaction.incomeId}`
            : `expend-${transaction.expendId}`;
          return (
            <Tr key={uniqueKey}>
              <Td>
                {formatDate(isIncome ? transaction.incomeDate : transaction.expendDate)}
              </Td>
              <Td $isBold $isIncome={isIncome}>
                {formatAmount(transaction.cost)}
              </Td>
              <Td>{transaction.category}</Td>
              <Td>{transaction.asset}</Td>
              <Td $isBold>
                {isIncome ? transaction.incomeName : transaction.expendName}
              </Td>
              {!hideEditButtons && (
                <Td>
                  <Button $edit onClick={() => onEdit(transaction)}>
                    수정
                  </Button>
                  <Button
                    onClick={() =>
                      onDelete(
                        isIncome ? transaction.incomeId : transaction.expendId,
                        isIncome ? "income" : "expense"
                      )
                    }
                  >
                    삭제
                  </Button>
                </Td>
              )}
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  table-layout: fixed;
  margin-bottom: 13px;
`;

const Th = styled.th`
  padding: 10px;
  text-align: center;
  font-weight: bold;
  width: 20%;
  color: ${({ theme }) => theme.colors.black02};
`;

const Tr = styled.tr`
  height: 50px;
`;

const Td = styled.td`
  padding: 12px 8px;
  text-align: center;
  word-wrap: break-word;
  font-weight: ${({ $isBold }) => ($isBold ? "bold" : "normal")};
  color: ${({ theme, $isIncome }) =>
    $isIncome
      ? theme.colors.blue
      : $isIncome === false
      ? theme.colors.red
      : theme.colors.gray05};
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 15px;
  font-size: 10px;
  border: ${({ $edit, theme }) =>
    $edit ? `1px solid ${theme.colors.black}` : "none"};
  background-color: ${({ $edit, theme }) =>
    $edit ? "transparent" : theme.colors.black};
  color: ${({ $edit, theme }) => ($edit ? theme.colors.black : theme.colors.white)};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ $edit, theme }) =>
      $edit ? "transparent" : theme.colors.gray06};
    color: ${({ $edit, theme }) => ($edit ? theme.colors.gray06 : theme.colors.white)};
  }
`;