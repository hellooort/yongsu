"use client";

import Link from "next/link";
import {
  Search,
  FileText,
  Calculator,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const features = [
  {
    href: "/registration",
    icon: Search,
    title: "등기 정보 조회",
    description: "부동산 주소로 등기 정보를 조회하고 서식에 자동 입력",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
  },
  {
    href: "/forms",
    icon: FileText,
    title: "서식 관리",
    description: "카테고리별 서식 파일 업로드 및 검색, 다운로드",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
  },
  {
    href: "/calculator",
    icon: Calculator,
    title: "비용 계산기",
    description: "취득세, 등록면허세, 수수료 등 등기 비용 자동 계산",
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
  },
  {
    href: "/cases",
    icon: Briefcase,
    title: "사건 관리",
    description: "고객별 사건 등록 및 진행 상태 추적 관리",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
  },
];

const stats = [
  { label: "진행 중 사건", value: "12", icon: Clock, trend: "+3 이번 주" },
  { label: "완료된 사건", value: "48", icon: CheckCircle2, trend: "+8 이번 달" },
  { label: "등록 서식", value: "10", icon: FileText, trend: "5개 카테고리" },
  { label: "보류 사건", value: "2", icon: AlertCircle, trend: "확인 필요" },
];

export default function Dashboard() {
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">대시보드</h1>
        <p className="text-slate-500 mt-1">
          법무 관리 시스템 전체 현황을 한눈에 확인하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">
                {stat.label}
              </span>
              <stat.icon className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-slate-500">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">핵심 기능</h2>
        <p className="text-sm text-slate-500 mt-1">
          각 기능을 클릭하여 바로 사용할 수 있습니다
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div
                className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <h3 className="text-lg font-semibold mb-2">시연 시나리오</h3>
        <p className="text-blue-100 text-sm mb-4">
          아래 순서대로 앱의 핵심 기능을 체험해 보세요
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: "1", text: "등기 정보 조회 및 서식 자동 입력" },
            { step: "2", text: "서식 관리에서 카테고리별 검색" },
            { step: "3", text: "비용 계산기로 등기 비용 산출" },
            { step: "4", text: "사건 관리 화면 확인" },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3"
            >
              <span className="w-7 h-7 bg-white text-blue-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {item.step}
              </span>
              <span className="text-sm text-blue-50">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
