export interface FormTemplate {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  format: string;
  size: string;
  updatedAt: string;
  description: string;
}

export const formCategories = [
  { id: "all", name: "전체" },
  { id: "real-estate", name: "부동산 등기" },
  { id: "commercial", name: "상업 등기" },
  { id: "civil", name: "민사" },
  { id: "criminal", name: "형사" },
  { id: "etc", name: "기타" },
];

export const sampleForms: FormTemplate[] = [
  {
    id: "FORM-001",
    name: "부동산 소유권이전 위임장",
    category: "real-estate",
    subcategory: "소유권이전",
    format: "HWP",
    size: "45KB",
    updatedAt: "2024-12-15",
    description: "매매로 인한 소유권이전등기 신청 시 사용하는 위임장 양식",
  },
  {
    id: "FORM-002",
    name: "근저당권설정 신청서",
    category: "real-estate",
    subcategory: "근저당권",
    format: "HWP",
    size: "52KB",
    updatedAt: "2024-11-20",
    description: "근저당권설정등기 신청 시 사용하는 표준 양식",
  },
  {
    id: "FORM-003",
    name: "법인설립 등기신청서",
    category: "commercial",
    subcategory: "법인설립",
    format: "DOCX",
    size: "68KB",
    updatedAt: "2024-10-05",
    description: "주식회사 설립등기 신청 시 사용하는 양식",
  },
  {
    id: "FORM-004",
    name: "임원변경 등기신청서",
    category: "commercial",
    subcategory: "임원변경",
    format: "HWP",
    size: "38KB",
    updatedAt: "2024-09-18",
    description: "법인 임원(이사, 감사 등) 변경등기 신청 양식",
  },
  {
    id: "FORM-005",
    name: "민사소송 위임장",
    category: "civil",
    subcategory: "소송대리",
    format: "HWP",
    size: "32KB",
    updatedAt: "2024-12-01",
    description: "민사소송 사건 소송대리 위임장 양식",
  },
  {
    id: "FORM-006",
    name: "지급명령 신청서",
    category: "civil",
    subcategory: "지급명령",
    format: "DOCX",
    size: "41KB",
    updatedAt: "2024-08-22",
    description: "지급명령 신청 시 사용하는 표준 양식",
  },
  {
    id: "FORM-007",
    name: "고소장 양식",
    category: "criminal",
    subcategory: "고소",
    format: "HWP",
    size: "35KB",
    updatedAt: "2024-07-30",
    description: "형사 고소장 표준 양식",
  },
  {
    id: "FORM-008",
    name: "부동산 매매계약서",
    category: "real-estate",
    subcategory: "매매",
    format: "HWP",
    size: "58KB",
    updatedAt: "2024-12-10",
    description: "부동산 매매 시 사용하는 표준 계약서 양식",
  },
  {
    id: "FORM-009",
    name: "확인서면 양식",
    category: "etc",
    subcategory: "확인",
    format: "HWP",
    size: "28KB",
    updatedAt: "2024-11-05",
    description: "각종 확인서면 작성용 표준 양식",
  },
  {
    id: "FORM-010",
    name: "본인서명사실확인서",
    category: "etc",
    subcategory: "본인확인",
    format: "DOCX",
    size: "22KB",
    updatedAt: "2024-10-15",
    description: "본인서명사실 확인서 양식",
  },
];
