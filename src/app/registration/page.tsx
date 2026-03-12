"use client";

import { useState } from "react";
import {
  Search,
  FileDown,
  Building2,
  User,
  MapPin,
  Shield,
  Eye,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import {
  sampleRegistrations,
  type RegistrationInfo,
} from "@/data/registrations";

type Step = "search" | "result" | "preview";

export default function RegistrationPage() {
  const [step, setStep] = useState<Step>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<RegistrationInfo | null>(null);
  const [suggestions, setSuggestions] = useState<RegistrationInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const results = sampleRegistrations.filter(
        (r) =>
          r.address.includes(searchQuery) ||
          r.detailAddress.includes(searchQuery) ||
          r.owner.includes(searchQuery)
      );
      setSuggestions(results.length > 0 ? results : sampleRegistrations.slice(0, 3));
      setIsSearching(false);
    }, 800);
  };

  const handleSelect = (reg: RegistrationInfo) => {
    setSelected(reg);
    setStep("result");
  };

  const generateDocument = () => {
    if (!selected) return;
    const content = `위 임 장

위임인 (매도인)
성명: ${selected.owner}
주민등록번호: ${selected.ownerIdMasked}

부동산의 표시
소재지: ${selected.address} ${selected.detailAddress}
부동산 종류: ${selected.propertyType}
면적: ${selected.area}
구조: ${selected.structure}
용도: ${selected.purpose}

등기 번호: ${selected.registrationNumber}

위 부동산에 관하여 소유권이전등기 신청 일체의 권한을
아래 수임인에게 위임합니다.

수임인
성명: _______________
주민등록번호: _______________
주소: _______________

위임일: ${new Date().toLocaleDateString("ko-KR")}

위임인: ${selected.owner} (인)
`;
    const blob = new Blob(["\uFEFF" + content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `위임장_${selected.owner}_${selected.address.split(" ").pop()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">등기 정보 조회</h1>
        <p className="text-slate-500 mt-1">
          부동산 주소를 입력하면 등기 정보를 조회하고 서식에 자동으로 입력합니다
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { key: "search", label: "주소 검색" },
          { key: "result", label: "등기 정보 확인" },
          { key: "preview", label: "서식 미리보기" },
        ].map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (s.key === "search") {
                  setStep("search");
                } else if (s.key === "result" && selected) {
                  setStep("result");
                } else if (s.key === "preview" && selected) {
                  setStep("preview");
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                step === s.key
                  ? "bg-blue-600 text-white shadow-md"
                  : selected || s.key === "search"
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                  : "bg-slate-50 text-slate-300 cursor-not-allowed"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                {i + 1}
              </span>
              {s.label}
            </button>
            {i < 2 && <ChevronRight className="w-4 h-4 text-slate-300" />}
          </div>
        ))}
      </div>

      {/* Step 1: Search */}
      {step === "search" && (
        <div className="animate-fade-in">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 max-w-2xl">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              부동산 주소 검색
            </h2>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="주소, 건물명, 소유자 이름으로 검색..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSearching ? "조회 중..." : "조회"}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {["강남구", "서초구", "판교", "해운대"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setTimeout(() => {
                      const results = sampleRegistrations.filter(
                        (r) => r.address.includes(tag) || r.detailAddress.includes(tag)
                      );
                      setSuggestions(results.length > 0 ? results : sampleRegistrations.slice(0, 3));
                    }, 300);
                  }}
                  className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-6 space-y-3 max-w-2xl animate-fade-in">
              <h3 className="text-sm font-medium text-slate-500">
                검색 결과 ({suggestions.length}건)
              </h3>
              {suggestions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => handleSelect(reg)}
                  className="w-full text-left bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {reg.address}
                        </p>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {reg.detailAddress}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                            <User className="w-3 h-3" />
                            {reg.owner}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" />
                            {reg.propertyType}
                          </span>
                          <span className="text-xs text-slate-400">
                            {reg.area}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Registration Detail */}
      {step === "result" && selected && (
        <div className="animate-fade-in space-y-6 max-w-3xl">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                등기 정보 상세
              </h2>
              <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                {selected.registrationNumber}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "소재지", value: `${selected.address} ${selected.detailAddress}` },
                { label: "부동산 종류", value: selected.propertyType },
                { label: "소유자", value: selected.owner },
                { label: "주민등록번호", value: selected.ownerIdMasked },
                { label: "면적", value: selected.area },
                { label: "용도", value: selected.purpose },
                { label: "구조", value: selected.structure },
                { label: "등기번호", value: selected.registrationNumber },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {selected.mortgages.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-amber-500" />
                <h3 className="font-semibold text-slate-900">
                  근저당권 설정 ({selected.mortgages.length}건)
                </h3>
              </div>
              <div className="space-y-3">
                {selected.mortgages.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {m.creditor}
                      </p>
                      <p className="text-xs text-slate-500">{m.date}</p>
                    </div>
                    <p className="text-sm font-semibold text-amber-700">
                      {m.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selected.liens.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-slate-900">
                  압류/가압류 ({selected.liens.length}건)
                </h3>
              </div>
              <div className="space-y-3">
                {selected.liens.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {l.type} - {l.holder}
                      </p>
                      <p className="text-xs text-slate-500">{l.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep("preview")}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              서식에 자동 입력
            </button>
            <button
              onClick={() => setStep("search")}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-200 transition-colors"
            >
              다시 검색
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Document Preview */}
      {step === "preview" && selected && (
        <div className="animate-fade-in max-w-3xl">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                위임장 미리보기
              </h2>
              <button
                onClick={generateDocument}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                다운로드
              </button>
            </div>

            <div className="border-2 border-slate-200 rounded-lg p-8 bg-white font-mono text-sm leading-relaxed">
              <h3 className="text-center text-xl font-bold mb-8 tracking-widest">
                위 임 장
              </h3>

              <div className="mb-6">
                <p className="font-bold text-slate-700 mb-2">
                  위임인 (매도인)
                </p>
                <div className="grid grid-cols-2 gap-2 ml-4">
                  <p>
                    성명:{" "}
                    <span className="text-blue-600 font-semibold bg-blue-50 px-1">
                      {selected.owner}
                    </span>
                  </p>
                  <p>
                    주민등록번호:{" "}
                    <span className="text-blue-600 font-semibold bg-blue-50 px-1">
                      {selected.ownerIdMasked}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-bold text-slate-700 mb-2">
                  부동산의 표시
                </p>
                <div className="ml-4 space-y-1">
                  <p>
                    소재지:{" "}
                    <span className="text-blue-600 font-semibold bg-blue-50 px-1">
                      {selected.address} {selected.detailAddress}
                    </span>
                  </p>
                  <p>
                    부동산 종류:{" "}
                    <span className="text-blue-600 font-semibold bg-blue-50 px-1">
                      {selected.propertyType}
                    </span>
                  </p>
                  <p>
                    면적:{" "}
                    <span className="text-blue-600 font-semibold bg-blue-50 px-1">
                      {selected.area}
                    </span>
                  </p>
                  <p>
                    구조:{" "}
                    <span className="text-blue-600 font-semibold bg-blue-50 px-1">
                      {selected.structure}
                    </span>
                  </p>
                  <p>
                    용도:{" "}
                    <span className="text-blue-600 font-semibold bg-blue-50 px-1">
                      {selected.purpose}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-bold text-slate-700 mb-2">등기 번호</p>
                <p className="ml-4">
                  <span className="text-blue-600 font-semibold bg-blue-50 px-1">
                    {selected.registrationNumber}
                  </span>
                </p>
              </div>

              <div className="mb-6 text-slate-600">
                <p>
                  위 부동산에 관하여 소유권이전등기 신청 일체의 권한을
                </p>
                <p>아래 수임인에게 위임합니다.</p>
              </div>

              <div className="mb-6">
                <p className="font-bold text-slate-700 mb-2">수임인</p>
                <div className="ml-4 space-y-1">
                  <p>성명: _________________</p>
                  <p>주민등록번호: _________________</p>
                  <p>주소: _________________</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p>위임일: {new Date().toLocaleDateString("ko-KR")}</p>
                <p className="mt-4">
                  위임인:{" "}
                  <span className="text-blue-600 font-semibold">
                    {selected.owner}
                  </span>{" "}
                  (인)
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 text-center">
              * 파란색으로 표시된 부분은 등기 정보에서 자동으로 입력된
              항목입니다
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
