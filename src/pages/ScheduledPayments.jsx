import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import Pagination from "../components/transactions/Pagination";
import ScheduledModal from "../components/ScheduledModal";
import Error from "../components/common/Error";
import LoadingSpinners from "../components/common/LoadingSpinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchSch from "../hooks/useFetchSch";
import {
  createScheduledPayment,
  updateScheduledPayment,
  deleteScheduledPayment,
} from "../api/scheduleAPI";

function ScheduledPayments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const queryClient = useQueryClient();
  const itemsPerPage = 5;

  const { data: payments = [], isLoading, isError, error } = useFetchSch();

  const addPayment = useMutation({
    mutationFn: createScheduledPayment,
    onSuccess: () => {
      queryClient.invalidateQueries(["scheduledPayments"]);
      alert("결제 예정이 성공적으로 추가되었습니다.");
    },
    onError: (error) => {
      console.error("결제 예정 추가 실패:", error.response?.data || error.message);
      alert("결제 예정 추가에 실패했습니다.");
    },
  });

  const updatePayment = useMutation({
    mutationFn: async ({ id, data }) => updateScheduledPayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["scheduledPayments"]);
      alert("결제 예정이 성공적으로 수정되었습니다.");
    },
    onError: (error) => {
      console.error("결제 예정 수정 실패:", error.response?.data || error.message);
      alert("결제 예정 수정에 실패했습니다.");
    },
  });

  const deletePayment = useMutation({
    mutationFn: deleteScheduledPayment,
    onSuccess: () => {
      queryClient.invalidateQueries(["scheduledPayments"]);
      alert("결제 예정이 성공적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("결제 예정 삭제 실패:", error.response?.data || error.message);
      alert("결제 예정 삭제에 실패했습니다.");
    },
  });

  const openModal = (payment = null) => {
    setEditingPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingPayment(null);
    setIsModalOpen(false);
  };

  const handleSave = (paymentData) => {
    if (
      !paymentData.paymentDetail ||
      !paymentData.dueDate ||
      !paymentData.lastPayment ||
      !paymentData.cost ||
      !paymentData.tradeName
    ) {
      alert("모든 필드를 입력해야 합니다.");
      return;
    }
  
    if (editingPayment) {
      updatePayment.mutate({
        id: editingPayment.paymentId,
        data: paymentData,
      });
    } else {
      addPayment.mutate(paymentData);
    }
    closeModal();
  };

  const handleDelete = (paymentId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePayment.mutate(paymentId);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <Container>
        <PageTitle>결제 예정</PageTitle>
        <ContentWrapper>
          <Table>
            <thead>
              <tr>
                <Th>결제 예정일</Th>
                <Th>상호</Th>
                <Th>상세내역</Th>
                <Th>마지막 결제</Th>
                <Th>금액</Th>
                <Th>편집</Th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <Td colSpan="6">
                    <LoadingSpinners />
                  </Td>
                </tr>
              ) : isError ? (
                <tr>
                  <Td colSpan="6">서버와의 연결에 문제가 발생했습니다.</Td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <Td colSpan="6">결제 예정 내역이 없습니다.</Td>
                </tr>
              ) : (
                currentItems.map((payment) => (
                  <Tr key={payment.paymentId}>
                    <Td>{payment.dueDate}</Td>
                    <Td>{payment.tradeName}</Td>
                    <Td>{payment.paymentDetail}</Td>
                    <Td>{payment.lastPayment}</Td>
                    <Td>{payment.cost.toLocaleString()}원</Td>
                    <Td>
                      <ButtonGroup>
                        <EditButton onClick={() => openModal(payment)}>수정</EditButton>
                        <DeleteButton onClick={() => handleDelete(payment.paymentId)}>
                          삭제
                        </DeleteButton>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))
              )}
            </tbody>
          </Table>
        </ContentWrapper>
        <Footer>
          <PaginationWrapper>
            <Pagination
              currentPage={currentPage}
              totalItems={payments.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </PaginationWrapper>
          <ActionButton onClick={() => openModal()}>작성하기</ActionButton>
        </Footer>
      </Container>
      {isModalOpen && (
        <ScheduledModal
          closeModal={closeModal}
          editPayment={editingPayment}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
}

export default ScheduledPayments;

// Styled components
const Container = styled.div`
  margin-top: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-left: 20px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.gray03};
`;

const ContentWrapper = styled.div`
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

const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray03};
  font-size: 18px;
  margin: 50px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th`
  padding: 10px;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black02};
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td`
  padding: 12px 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray05};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

const EditButton = styled.button`
  padding: 5px 15px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.gray06};
  }
`;

const DeleteButton = styled.button`
  padding: 5px 15px;
  border: none;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray06};
  }
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
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 20px;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;