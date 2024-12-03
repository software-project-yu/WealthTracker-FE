import React from "react";
import styled from "styled-components";

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  const endPage = Math.min(totalPages, startPage + maxPages - 1);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  return (
    <Container>
      <NavButton
        $isDisabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        &lt;
      </NavButton>

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map((page) => (
        <PageButton
          key={page}
          $isActive={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PageButton>
      ))}

      <NavButton
        $isDisabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        &gt;
      </NavButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const NavButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: ${({ $isDisabled, theme }) =>
    $isDisabled ? theme.colors.gray02 : theme.colors.white};
  border: 1px solid ${({ $isDisabled, theme }) =>
    $isDisabled ? theme.colors.gray02 : theme.colors.gray04};
  border-radius: 4px;
  color: ${({ $isDisabled, theme }) =>
    $isDisabled ? theme.colors.gray03 : theme.colors.black01};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled(NavButton)`
  border: 1px solid ${({ $isActive, theme }) =>
    $isActive ? theme.colors.blue : theme.colors.gray02};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.blue : theme.colors.black01};
  font-weight: bold;
  font-size: 14px;
`;