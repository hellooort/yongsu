"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  X,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import {
  sampleCases,
  statusColors,
  type CaseItem,
  type CaseStatus,
} from "@/data/cases";

const statusOptions: CaseStatus[] = ["접수", "진행", "완료", "보류"];

export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>(sampleCases);
  const [filterStatus, setFilterStatus] = useState<CaseStatus | "전체">("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [newCase, setNewCase] = useState({
    clientName: "",
    caseType: "소유권이전",
    title: "",
    memo: "",
  });

  const filteredCases = cases.filter((c) => {
    const matchStatus = filterStatus === "전체" || c.status === filterStatus;
    const matchSearch =
      !searchQuery ||
      c.clientName.includes(searchQuery) ||
      c.title.includes(searchQuery) ||
      c.id.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  const statusCounts = {
    전체: cases.length,
    접수: cases.filter((c) => c.status === "접수").length,
    진행: cases.filter((c) => c.status === "진행").length,
    완료: cases.filter((c) => c.status === "완료").length,
    보류: cases.filter((c) => c.status === "보류").length,
  };

  const handleAddCase = () => {
    if (!newCase.clientName || !newCase.title) return;
    const today = new Date().toISOString().split("T")[0];
    const newItem: CaseItem = {
      id: `CASE-${new Date().getFullYear()}-${String(cases.length + 1).padStart(3, "0")}`,
      clientName: newCase.clientName,
      caseType: newCase.caseType,
      title: newCase.title,
      status: "접수",
      registeredAt: today,
      updatedAt: today,
      assignee: "담당자A",
      memo: newCase.memo,
    };
    setCases((prev) => [newItem, ...prev]);
    setShowNewModal(false);
    setNewCase({ clientName: "", caseType: "소유권이전", title: "", memo: "" });
  };

  const handleStatusChange = (caseId: string, newStatus: CaseStatus) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] }
          : c
      )
    );
    if (selectedCase?.id === caseId) {
      setSelectedCase((prev) =>
        prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] } : null
      );
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">사건 관리</h1>
          <p className="text-slate-500 mt-1">
            고객별 사건을 등록하고 진행 상태를 추적합니다
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          사건 등록
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Filter className="w-4 h-4 text-slate-400" />
        {(["전체", ...statusOptions] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterStatus === status
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
            }`}
          >
            {status}
            <span className="ml-1.5 text-xs opacity-70">
              ({statusCounts[status]})
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="고객명, 사건번호, 제목으로 검색..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
        />
      </div>

      {/* Case List */}
      <div className="space-y-3">
        {filteredCases.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>해당하는 사건이 없습니다</p>
          </div>
        ) : (
          filteredCases.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className={`bg-white rounded-xl shadow-sm border p-5 cursor-pointer transition-all hover:shadow-md ${
                selectedCase?.id === c.id
                  ? "border-blue-300 ring-1 ring-blue-200"
                  : "border-slate-100 hover:border-blue-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-slate-400">
                      {c.id}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status]}`}
                    >
                      {c.status}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                      {c.caseType}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {c.clientName}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {c.registeredAt}
                    </span>
                    <span>담당: {c.assignee}</span>
                  </div>
                </div>

                <div className="relative ml-4 shrink-0">
                  <select
                    value={c.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(c.id, e.target.value as CaseStatus);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 pr-7 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {c.memo && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500">{c.memo}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-slate-400 mt-4">
        총 {filteredCases.length}건
      </p>

      {/* Detail Slide-over */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto animate-slide-in">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                사건 상세
              </h3>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedCase.status]}`}
                >
                  {selectedCase.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">사건번호</p>
                <p className="text-sm font-mono text-slate-900">
                  {selectedCase.id}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">사건명</p>
                <p className="text-sm font-medium text-slate-900">
                  {selectedCase.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">고객명</p>
                  <p className="text-sm text-slate-900">
                    {selectedCase.clientName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">사건 유형</p>
                  <p className="text-sm text-slate-900">
                    {selectedCase.caseType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">접수일</p>
                  <p className="text-sm text-slate-900">
                    {selectedCase.registeredAt}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">최종 수정일</p>
                  <p className="text-sm text-slate-900">
                    {selectedCase.updatedAt}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">담당자</p>
                  <p className="text-sm text-slate-900">
                    {selectedCase.assignee}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">메모</p>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-700">
                    {selectedCase.memo || "메모 없음"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-2">상태 변경</p>
                <div className="grid grid-cols-4 gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedCase.id, s)}
                      className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                        selectedCase.status === s
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Case Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                새 사건 등록
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  고객명
                </label>
                <input
                  type="text"
                  value={newCase.clientName}
                  onChange={(e) =>
                    setNewCase((prev) => ({
                      ...prev,
                      clientName: e.target.value,
                    }))
                  }
                  placeholder="고객 이름"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  사건 유형
                </label>
                <select
                  value={newCase.caseType}
                  onChange={(e) =>
                    setNewCase((prev) => ({
                      ...prev,
                      caseType: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {[
                    "소유권이전",
                    "근저당권설정",
                    "근저당권말소",
                    "법인설립",
                    "임원변경",
                    "기타",
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  사건명
                </label>
                <input
                  type="text"
                  value={newCase.title}
                  onChange={(e) =>
                    setNewCase((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="사건 제목을 입력하세요"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  메모
                </label>
                <textarea
                  value={newCase.memo}
                  onChange={(e) =>
                    setNewCase((prev) => ({ ...prev, memo: e.target.value }))
                  }
                  placeholder="참고 사항"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAddCase}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
