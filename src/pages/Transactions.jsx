import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Tabs from "../components/transactions/Tabs";
import TransactionList from "../components/transactions/TransactionList";
import Pagination from "../components/transactions/Pagination";
import TransactionModal from "../components/transactions/TransactionModal";
import Error from "../components/common/Error";
import LoadingSpinners from "../components/common/LoadingSpinners";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchTrans from "../hooks/useFetchTrans";
import {
  createExpend,
  updateExpend,
  deleteExpend,
} from "../api/expendAPI";
import {
  createIncome,
  updateIncome,
  deleteIncome,
} from "../api/incomeAPI";

export default function Transactions() {
  const [activeTab, setActiveTab] = useState("전체");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("expend");
  const [editingTransaction, setEditingTransaction] = useState(null);

  const queryClient = useQueryClient();
  const itemsPerPage = 9;
  const currentMonth = currentDate.getMonth() + 1;

  const { data: transactions, isLoading: isExpendLoading, error: expendError } =
    useFetchTrans("/api/expend/list", { month: currentMonth });

  const { data: incomeList, isLoading: isIncomeLoading, error: incomeError } =
    useFetchTrans("/api/income/list", { month: currentMonth });

  const addTransaction = useMutation({
    mutationFn: (data) =>
      modalType === "income" ? createIncome(data) : createExpend(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      alert("거래가 추가되었습니다!");
    },
    onError: (error) => {
      console.error("추가 실패:", error.response?.data || error.message);
      alert("거래 추가에 실패했습니다.");
    },
  });

  const updateTransaction = useMutation({
    mutationFn: ({ id, data, type }) =>
      type === "income" ? updateIncome(id, data) : updateExpend(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      alert("거래가 수정되었습니다!");
    },
    onError: (error) => {
      console.error("수정 실패:", error.response?.data || error.message);
      alert("거래 수정에 실패했습니다.");
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: ({ id, type }) =>
      type === "income" ? deleteIncome(id) : deleteExpend(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      alert("거래가 삭제되었습니다!");
    },
    onError: (error) => {
      console.error("삭제 실패:", error.response?.data || error.message);
      alert("거래 삭제에 실패했습니다.");
    },
  });

  const displayedTransactions = (() => {
    if (activeTab === "전체") {
      const combinedData = [
        ...(transactions || []).map((item) => ({
          ...item,
          type: "지출",
          transactionDate: item.expendDate,
          amount: item.cost,
        })),
        ...(incomeList || []).map((item) => ({
          ...item,
          type: "수입",
          transactionDate: item.incomeDate,
          amount: item.amount,
        })),
      ];

      return combinedData.sort((a, b) => {
        const dateDiff =
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime();
        if (dateDiff !== 0) return dateDiff;
        return b.amount - a.amount;
      });
    }

    return activeTab === "수입" ? incomeList || [] : transactions || [];
  })();

  const handleOpenModal = (type, transaction = null) => {
    setModalType(type);
    setEditingTransaction(transaction || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const handleSubmitTransaction = (formData) => {
    if (editingTransaction) {
      const id = editingTransaction.incomeId || editingTransaction.expendId;
      const type = editingTransaction.incomeId ? "income" : "expend";
      updateTransaction.mutate({ id, data: formData, type });
    } else {
      addTransaction.mutate(formData);
    }
    handleCloseModal();
  };

  const handleDeleteTransaction = (id, type) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteTransaction.mutate({ id, type });
    }
  };

  return (
    <Layout>
      <OuterContainer>
        <Header>
          <Title>최근 거래 내역</Title>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </Header>
        <InnerContainer>
          <MonthNavigation>
            <NavButton
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
                )
              }
            >
              ‹
            </NavButton>
            <MonthDisplay>
              {currentDate.toISOString().slice(0, 7).replace("-", "년 ") + "월"}
            </MonthDisplay>
            <NavButton
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
                )
              }
            >
              ›
            </NavButton>
          </MonthNavigation>
          {expendError || incomeError ? (
            <Error />
          ) : isExpendLoading || isIncomeLoading ? (
            <LoadingSpinners />
          ) : (
            <>
              <ContentWrapper>
                <TransactionList
                  transactions={displayedTransactions}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onEdit={(transaction) =>
                    handleOpenModal(
                      transaction.incomeId ? "income" : "expend",
                      transaction
                    )
                  }
                  onDelete={handleDeleteTransaction}
                />
              </ContentWrapper>
              <Footer>
                <PaginationWrapper>
                  <Pagination
                    currentPage={currentPage}
                    totalItems={displayedTransactions?.length || 0}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </PaginationWrapper>
                {activeTab !== "전체" && (
                  <ActionButton
                    onClick={() =>
                      handleOpenModal(
                        activeTab === "수입" ? "income" : "expend"
                      )
                    }
                  >
                    작성하기
                  </ActionButton>
                )}
              </Footer>
            </>
          )}
        </InnerContainer>
      </OuterContainer>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTransaction}
        type={modalType}
        editData={editingTransaction}
      />
    </Layout>
  );
}

const OuterContainer = styled.div`
  margin-top: 20px;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-left: 20px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.gray03};
`;

const InnerContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 93%;
  margin: 0 auto;
  min-height: 630px;
  display: flex;
  flex-direction: column;
`;

const MonthNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  margin: 0 16px;
  color: ${({ theme }) => theme.colors.black};
`;

const MonthDisplay = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin: 0 90px;
  color: ${({ theme }) => theme.colors.black};
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 60px;
  margin-top: 20px;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ActionButton = styled.button`
  position: absolute;
  right: 30px;
  height: 40px;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;
