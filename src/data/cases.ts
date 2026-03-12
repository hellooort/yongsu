export type CaseStatus = "접수" | "진행" | "완료" | "보류";

export interface CaseItem {
  id: string;
  clientName: string;
  caseType: string;
  title: string;
  status: CaseStatus;
  registeredAt: string;
  updatedAt: string;
  assignee: string;
  memo: string;
}

export const sampleCases: CaseItem[] = [
  {
    id: "CASE-2024-001",
    clientName: "김영수",
    caseType: "소유권이전",
    title: "강남구 테헤란로 123 소유권이전등기",
    status: "진행",
    registeredAt: "2024-12-01",
    updatedAt: "2024-12-20",
    assignee: "담당자A",
    memo: "매수인 서류 수취 완료, 잔금일 1월 5일 예정",
  },
  {
    id: "CASE-2024-002",
    clientName: "이미경",
    caseType: "근저당권설정",
    title: "서초구 반포대로 45 근저당권설정",
    status: "완료",
    registeredAt: "2024-11-15",
    updatedAt: "2024-12-10",
    assignee: "담당자B",
    memo: "등기완료, 등기권리증 발급 완료",
  },
  {
    id: "CASE-2024-003",
    clientName: "박진호",
    caseType: "법인설립",
    title: "㈜판교테크 법인설립등기",
    status: "접수",
    registeredAt: "2024-12-18",
    updatedAt: "2024-12-18",
    assignee: "담당자A",
    memo: "정관 및 주주명부 수령 대기중",
  },
  {
    id: "CASE-2024-004",
    clientName: "최한나",
    caseType: "소유권이전",
    title: "마포구 상암동 토지 소유권이전",
    status: "진행",
    registeredAt: "2024-12-05",
    updatedAt: "2024-12-19",
    assignee: "담당자C",
    memo: "토지거래허가 신청 완료, 허가 대기중",
  },
  {
    id: "CASE-2024-005",
    clientName: "정수민",
    caseType: "근저당권말소",
    title: "해운대구 해운대로 570 근저당권말소",
    status: "보류",
    registeredAt: "2024-12-12",
    updatedAt: "2024-12-15",
    assignee: "담당자B",
    memo: "채권자 말소서류 미발급 상태",
  },
  {
    id: "CASE-2024-006",
    clientName: "강민정",
    caseType: "임원변경",
    title: "㈜그린솔루션 임원변경등기",
    status: "완료",
    registeredAt: "2024-11-28",
    updatedAt: "2024-12-08",
    assignee: "담당자A",
    memo: "변경등기 완료, 등기사항전부증명서 발급",
  },
];

export const statusColors: Record<CaseStatus, string> = {
  접수: "bg-blue-100 text-blue-800",
  진행: "bg-yellow-100 text-yellow-800",
  완료: "bg-green-100 text-green-800",
  보류: "bg-red-100 text-red-800",
};
