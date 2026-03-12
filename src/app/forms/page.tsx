"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Download,
  Upload,
  FileText,
  Filter,
  Plus,
  X,
} from "lucide-react";
import { sampleForms, formCategories, type FormTemplate } from "@/data/forms";

export default function FormsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "real-estate",
    description: "",
  });
  const [localForms, setLocalForms] = useState<FormTemplate[]>(sampleForms);

  const filteredForms = useMemo(() => {
    return localForms.filter((form) => {
      const matchCategory =
        activeCategory === "all" || form.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        form.name.includes(searchQuery) ||
        form.description.includes(searchQuery) ||
        form.subcategory.includes(searchQuery);
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, localForms]);

  const handleDownload = (form: FormTemplate) => {
    const content = `[샘플 서식 파일]

서식명: ${form.name}
카테고리: ${formCategories.find((c) => c.id === form.category)?.name}
분류: ${form.subcategory}
설명: ${form.description}

---
이 파일은 데모 목적의 샘플 파일입니다.
실제 운영 환경에서는 실제 HWP/DOCX 파일이 다운로드됩니다.
`;
    const blob = new Blob(["\uFEFF" + content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    if (!uploadForm.name.trim()) return;
    const newForm: FormTemplate = {
      id: `FORM-${String(localForms.length + 1).padStart(3, "0")}`,
      name: uploadForm.name,
      category: uploadForm.category,
      subcategory: "사용자 등록",
      format: "HWP",
      size: "0KB",
      updatedAt: new Date().toISOString().split("T")[0],
      description: uploadForm.description || "사용자가 업로드한 서식",
    };
    setLocalForms((prev) => [newForm, ...prev]);
    setShowUploadModal(false);
    setUploadForm({ name: "", category: "real-estate", description: "" });
  };

  const formatBadgeColor: Record<string, string> = {
    HWP: "bg-sky-100 text-sky-700",
    DOCX: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">서식 관리</h1>
          <p className="text-slate-500 mt-1">
            카테고리별 서식 파일을 검색하고 다운로드할 수 있습니다
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          서식 업로드
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter className="w-4 h-4 text-slate-400 mr-1" />
        {formCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {cat.name}
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
          placeholder="서식명, 설명으로 검색..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
        />
      </div>

      {/* Forms List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wider">
          <div className="col-span-5">서식명</div>
          <div className="col-span-2">카테고리</div>
          <div className="col-span-1">형식</div>
          <div className="col-span-1">크기</div>
          <div className="col-span-2">수정일</div>
          <div className="col-span-1 text-right">작업</div>
        </div>

        {filteredForms.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>검색 결과가 없습니다</p>
          </div>
        ) : (
          filteredForms.map((form) => (
            <div
              key={form.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-50 hover:bg-blue-50/30 transition-colors items-center"
            >
              <div className="col-span-5">
                <p className="text-sm font-medium text-slate-900">
                  {form.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {form.description}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-slate-500">
                  {formCategories.find((c) => c.id === form.category)?.name}
                </span>
              </div>
              <div className="col-span-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    formatBadgeColor[form.format] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {form.format}
                </span>
              </div>
              <div className="col-span-1 text-xs text-slate-500">
                {form.size}
              </div>
              <div className="col-span-2 text-xs text-slate-500">
                {form.updatedAt}
              </div>
              <div className="col-span-1 text-right">
                <button
                  onClick={() => handleDownload(form)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="다운로드"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-slate-400 mt-4">
        총 {filteredForms.length}개 서식
      </p>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">
                서식 업로드
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  서식명
                </label>
                <input
                  type="text"
                  value={uploadForm.name}
                  onChange={(e) =>
                    setUploadForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="서식 이름을 입력하세요"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  카테고리
                </label>
                <select
                  value={uploadForm.category}
                  onChange={(e) =>
                    setUploadForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {formCategories
                    .filter((c) => c.id !== "all")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  설명
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) =>
                    setUploadForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="서식에 대한 간단한 설명"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                />
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                <Plus className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">
                  파일을 드래그하거나 클릭하여 업로드
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  HWP, DOCX, PDF (데모 환경)
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleUpload}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                업로드
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
