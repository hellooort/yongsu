"use client";

import { useState } from "react";
import { Calculator, FileDown, RotateCcw, Info } from "lucide-react";

type PropertyType = "주택" | "주택외" | "토지";

interface CalcResult {
  acquisitionTax: number;
  acquisitionTaxRate: number;
  localEducationTax: number;
  localEducationTaxRate: number;
  registrationTax: number;
  registrationTaxRate: number;
  nationalHousingBond: number;
  stampTax: number;
  registrationFee: number;
  judicialFee: number;
  total: number;
}

const TAX_RATES: Record<
  PropertyType,
  { acquisition: number; localEdu: number; registration: number; bond: number }
> = {
  주택: { acquisition: 0.01, localEdu: 0.001, registration: 0.002, bond: 0.05 },
  주택외: { acquisition: 0.04, localEdu: 0.004, registration: 0.004, bond: 0.05 },
  토지: { acquisition: 0.04, localEdu: 0.004, registration: 0.004, bond: 0.03 },
};

function calculate(
  price: number,
  propertyType: PropertyType,
  isFirstHome: boolean
): CalcResult {
  const rates = TAX_RATES[propertyType];
  let acquisitionRate = rates.acquisition;

  if (propertyType === "주택" && isFirstHome) {
    if (price <= 600_000_000) acquisitionRate = 0.01;
    else if (price <= 900_000_000) acquisitionRate = 0.02;
    else acquisitionRate = 0.03;
  }

  if (propertyType === "주택" && !isFirstHome && price > 900_000_000) {
    acquisitionRate = 0.03;
  }

  const acquisitionTax = Math.floor(price * acquisitionRate);
  const localEducationTax = Math.floor(price * rates.localEdu);
  const registrationTax = Math.floor(price * rates.registration);
  const nationalHousingBond = Math.floor(price * rates.bond);
  const stampTax = price > 100_000_000 ? 150_000 : 0;
  const registrationFee = 30_000;
  const judicialFee = price > 500_000_000 ? 550_000 : price > 100_000_000 ? 330_000 : 220_000;

  const total =
    acquisitionTax +
    localEducationTax +
    registrationTax +
    nationalHousingBond +
    stampTax +
    registrationFee +
    judicialFee;

  return {
    acquisitionTax,
    acquisitionTaxRate: acquisitionRate,
    localEducationTax,
    localEducationTaxRate: rates.localEdu,
    registrationTax,
    registrationTaxRate: rates.registration,
    nationalHousingBond,
    stampTax,
    registrationFee,
    judicialFee,
    total,
  };
}

function formatKRW(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

function formatPercent(n: number) {
  return (n * 100).toFixed(1) + "%";
}

export default function CalculatorPage() {
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType>("주택");
  const [isFirstHome, setIsFirstHome] = useState(true);
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleCalculate = () => {
    const numPrice = parseInt(price.replace(/,/g, ""), 10);
    if (isNaN(numPrice) || numPrice <= 0) return;
    setResult(calculate(numPrice, propertyType, isFirstHome));
  };

  const handleReset = () => {
    setPrice("");
    setPropertyType("주택");
    setIsFirstHome(true);
    setResult(null);
  };

  const handlePriceInput = (val: string) => {
    const num = val.replace(/[^0-9]/g, "");
    if (num) {
      setPrice(parseInt(num, 10).toLocaleString("ko-KR"));
    } else {
      setPrice("");
    }
  };

  const exportResult = () => {
    if (!result) return;
    const numPrice = parseInt(price.replace(/,/g, ""), 10);
    const content = `등기 비용 계산 결과
==========================================
매매 금액: ${formatKRW(numPrice)}
부동산 종류: ${propertyType}
1주택 여부: ${isFirstHome ? "예" : "아니오"}
==========================================

항목별 내역
------------------------------------------
취득세 (${formatPercent(result.acquisitionTaxRate)}): ${formatKRW(result.acquisitionTax)}
지방교육세 (${formatPercent(result.localEducationTaxRate)}): ${formatKRW(result.localEducationTax)}
등록면허세 (${formatPercent(result.registrationTaxRate)}): ${formatKRW(result.registrationTax)}
국민주택채권 할인: ${formatKRW(result.nationalHousingBond)}
인지세: ${formatKRW(result.stampTax)}
등기신청수수료: ${formatKRW(result.registrationFee)}
법무사 수수료: ${formatKRW(result.judicialFee)}
------------------------------------------
합계: ${formatKRW(result.total)}

* 본 계산 결과는 참고용이며, 실제 비용은 다를 수 있습니다.
* 생성일: ${new Date().toLocaleDateString("ko-KR")}
`;
    const blob = new Blob(["\uFEFF" + content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `등기비용계산_${price}원_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">등기 비용 계산기</h1>
        <p className="text-slate-500 mt-1">
          매매 금액과 부동산 종류를 입력하면 예상 등기 비용을 자동으로 계산합니다
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            계산 조건 입력
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                매매 금액
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => handlePriceInput(e.target.value)}
                  placeholder="예: 500,000,000"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  원
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {["1억", "3억", "5억", "10억"].map((label) => {
                  const values: Record<string, string> = {
                    "1억": "100000000",
                    "3억": "300000000",
                    "5억": "500000000",
                    "10억": "1000000000",
                  };
                  return (
                    <button
                      key={label}
                      onClick={() => handlePriceInput(values[label])}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                부동산 종류
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["주택", "주택외", "토지"] as PropertyType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`py-3 rounded-lg text-sm font-medium border-2 transition-all ${
                      propertyType === type
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {propertyType === "주택" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  1주택 여부
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[true, false].map((val) => (
                    <button
                      key={String(val)}
                      onClick={() => setIsFirstHome(val)}
                      className={`py-3 rounded-lg text-sm font-medium border-2 transition-all ${
                        isFirstHome === val
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {val ? "1주택 (기본 세율)" : "다주택"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCalculate}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                <Calculator className="w-4 h-4" />
                계산하기
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                초기화
              </button>
            </div>
          </div>
        </div>

        {/* Result */}
        <div>
          {result ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  계산 결과
                </h2>
                <button
                  onClick={exportResult}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  내보내기
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    label: "취득세",
                    rate: formatPercent(result.acquisitionTaxRate),
                    value: result.acquisitionTax,
                  },
                  {
                    label: "지방교육세",
                    rate: formatPercent(result.localEducationTaxRate),
                    value: result.localEducationTax,
                  },
                  {
                    label: "등록면허세",
                    rate: formatPercent(result.registrationTaxRate),
                    value: result.registrationTax,
                  },
                  {
                    label: "국민주택채권 할인",
                    rate: "",
                    value: result.nationalHousingBond,
                  },
                  { label: "인지세", rate: "", value: result.stampTax },
                  {
                    label: "등기신청수수료",
                    rate: "",
                    value: result.registrationFee,
                  },
                  { label: "법무사 수수료", rate: "", value: result.judicialFee },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-700">
                        {item.label}
                      </span>
                      {item.rate && (
                        <span className="text-xs text-slate-400">
                          ({item.rate})
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {formatKRW(item.value)}
                    </span>
                  </div>
                ))}

                <div className="border-t-2 border-blue-100 pt-3 mt-3">
                  <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-blue-50">
                    <span className="text-base font-bold text-blue-900">
                      합계
                    </span>
                    <span className="text-xl font-bold text-blue-700">
                      {formatKRW(result.total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700">
                  본 계산 결과는 일반적인 세율 기준의 참고용입니다. 실제 비용은
                  지역, 조정대상지역 여부, 보유 주택 수 등에 따라 달라질 수
                  있습니다.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 flex flex-col items-center justify-center text-center h-full">
              <Calculator className="w-16 h-16 text-slate-200 mb-4" />
              <p className="text-slate-400 text-sm">
                좌측에서 매매 금액과 조건을 입력한 후
                <br />
                계산하기 버튼을 눌러주세요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
