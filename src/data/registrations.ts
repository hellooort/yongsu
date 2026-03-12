export interface RegistrationInfo {
  id: string;
  address: string;
  detailAddress: string;
  propertyType: string;
  owner: string;
  ownerIdMasked: string;
  registrationNumber: string;
  area: string;
  purpose: string;
  structure: string;
  mortgages: {
    creditor: string;
    amount: string;
    date: string;
  }[];
  liens: {
    type: string;
    holder: string;
    date: string;
  }[];
}

export const sampleRegistrations: RegistrationInfo[] = [
  {
    id: "REG-001",
    address: "서울특별시 강남구 테헤란로 123",
    detailAddress: "삼성빌딩 5층 501호",
    propertyType: "집합건물",
    owner: "김영수",
    ownerIdMasked: "800101-1******",
    registrationNumber: "1101-2024-001234",
    area: "84.92㎡",
    purpose: "업무시설",
    structure: "철근콘크리트조",
    mortgages: [
      {
        creditor: "국민은행",
        amount: "300,000,000원",
        date: "2023-05-15",
      },
    ],
    liens: [],
  },
  {
    id: "REG-002",
    address: "서울특별시 서초구 반포대로 45",
    detailAddress: "반포아파트 102동 1503호",
    propertyType: "집합건물",
    owner: "이미경",
    ownerIdMasked: "850320-2******",
    registrationNumber: "1101-2024-002345",
    area: "114.56㎡",
    purpose: "주거시설",
    structure: "철근콘크리트조",
    mortgages: [
      {
        creditor: "신한은행",
        amount: "500,000,000원",
        date: "2022-08-20",
      },
      {
        creditor: "하나은행",
        amount: "200,000,000원",
        date: "2023-11-10",
      },
    ],
    liens: [
      {
        type: "가압류",
        holder: "대한신용정보",
        date: "2024-01-05",
      },
    ],
  },
  {
    id: "REG-003",
    address: "경기도 성남시 분당구 판교로 256",
    detailAddress: "판교테크원타워 12층",
    propertyType: "집합건물",
    owner: "박진호",
    ownerIdMasked: "780515-1******",
    registrationNumber: "1341-2024-003456",
    area: "230.15㎡",
    purpose: "업무시설",
    structure: "철골철근콘크리트조",
    mortgages: [],
    liens: [],
  },
  {
    id: "REG-004",
    address: "서울특별시 마포구 월드컵북로 396",
    detailAddress: "상암동 1589번지",
    propertyType: "토지",
    owner: "최한나",
    ownerIdMasked: "900708-2******",
    registrationNumber: "1105-2024-004567",
    area: "520.30㎡",
    purpose: "대지",
    structure: "-",
    mortgages: [
      {
        creditor: "우리은행",
        amount: "1,200,000,000원",
        date: "2024-02-28",
      },
    ],
    liens: [],
  },
  {
    id: "REG-005",
    address: "부산광역시 해운대구 해운대로 570",
    detailAddress: "해운대자이아파트 201동 801호",
    propertyType: "집합건물",
    owner: "정수민",
    ownerIdMasked: "950220-1******",
    registrationNumber: "2101-2024-005678",
    area: "59.87㎡",
    purpose: "주거시설",
    structure: "철근콘크리트조",
    mortgages: [
      {
        creditor: "농협은행",
        amount: "250,000,000원",
        date: "2023-09-14",
      },
    ],
    liens: [],
  },
];
