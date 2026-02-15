/* ── 상수 ─────────────────────────────────────── */
export const MAX_SIMULATION_MONTHS = 12 * 80; // 최대 80년

/* ── 타입 ─────────────────────────────────────── */
export interface Inputs {
  currentAge: number | "";
  totalAssets: number | "";
  monthlyExpenses: number | "";
  monthlySavings: number | "";
  expectedReturn: number | "";
}

export interface Result {
  fireNumber: number;
  currentAssets: number;
  progressPercent: number;
  monthsToFire: number;
  yearsToFire: number;
  fireAge: number;
  fireYear: number;
  fireMonth: number;
  monthlyExpenses: number;
  monthlySavings: number;
  annualExpenses: number;
  savingsRate: number;
  alreadyFired: boolean;
  reachable: boolean;
}

export interface Grade {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}

/* ── 등급 시스템 ──────────────────────────────── */
export function getGrade(result: Result): Grade {
  if (result.alreadyFired)
    return {
      title: "이미 FIRE 달성!",
      subtitle:
        "축하합니다! 이미 경제적 자유를 달성하셨습니다. 회사에 다니고 계시다면... 그건 취미인 거죠?",
      emoji: "🏖️",
      color: "#FFD700",
    };
  if (!result.reachable)
    return {
      title: "대수술이 필요합니다",
      subtitle:
        "현재 속도로는 은퇴가 좀... 요원합니다. 하지만 가장 중요한 건 '지금 시작하는 것'! 배달앱 삭제가 위대한 첫 걸음입니다.",
      emoji: "🔧",
      color: "#DC2626",
    };
  if (result.yearsToFire <= 5)
    return {
      title: "거의 다 왔다!",
      subtitle:
        "퇴사 버튼에 손이 가는 건 자연스러운 현상입니다. 조금만 더 버티세요, 사표의 맛이 달콤해집니다!",
      emoji: "🚀",
      color: "#10B981",
    };
  if (result.yearsToFire <= 10)
    return {
      title: "FIRE 고속도로 탑승",
      subtitle:
        "10년 안에 은퇴라니, 동료들이 들으면 시기 질투의 눈빛을 보낼 겁니다. 절대 말하지 마세요!",
      emoji: "🏎️",
      color: "#059669",
    };
  if (result.yearsToFire <= 20)
    return {
      title: "꾸준함이 답이다",
      subtitle:
        "마라톤 러너처럼 꾸준히 달리고 계시네요. 중간에 치킨 시켜먹어도 됩니다, 멈추지만 않으면!",
      emoji: "🏃",
      color: "#F59E0B",
    };
  if (result.yearsToFire <= 30)
    return {
      title: "아직 갈 길이 멀다",
      subtitle:
        "걱정 마세요, 저축률을 5%만 높여도 은퇴 시점이 확 당겨집니다. 배달앱 삭제가 첫 걸음입니다!",
      emoji: "🧗",
      color: "#EA580C",
    };
  return {
    title: "대수술이 필요합니다",
    subtitle:
      "현재 속도로는 은퇴가 좀... 요원합니다. 하지만 가장 중요한 건 '지금 시작하는 것'! 오늘이 가장 빠른 날입니다.",
    emoji: "🔧",
    color: "#DC2626",
  };
}

/* ── 계산 로직 (4% 룰 + 월별 복리) ────────────── */
export function calculate(inputs: Inputs): Result | null {
  const age = Number(inputs.currentAge);
  const assets = Number(inputs.totalAssets);
  const expenses = Number(inputs.monthlyExpenses);
  const savings = Number(inputs.monthlySavings);
  const annualReturn = Number(inputs.expectedReturn);

  if (!age || !expenses) return null;

  const fireNumber = expenses * 300;
  const annualExpenses = expenses * 12;
  const totalMonthly = expenses + savings;
  const savingsRate =
    totalMonthly > 0 ? Math.round((savings / totalMonthly) * 100) : 0;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (assets >= fireNumber) {
    return {
      fireNumber,
      currentAssets: assets,
      progressPercent: 100,
      monthsToFire: 0,
      yearsToFire: 0,
      fireAge: age,
      fireYear: currentYear,
      fireMonth: currentMonth,
      monthlyExpenses: expenses,
      monthlySavings: savings,
      annualExpenses,
      savingsRate,
      alreadyFired: true,
      reachable: true,
    };
  }

  const monthlyRate = annualReturn / 100 / 12;
  let cur = assets;
  let months = 0;

  while (months < MAX_SIMULATION_MONTHS) {
    months++;
    cur = cur * (1 + monthlyRate) + savings;
    if (cur >= fireNumber) break;
  }

  const reachable = cur >= fireNumber;
  const yearsToFire = reachable ? Math.round((months / 12) * 10) / 10 : -1;
  const fireAge = reachable ? age + Math.ceil(months / 12) : -1;

  let fireYear = -1;
  let fireMonth = -1;
  if (reachable) {
    const totalMonths = (currentYear * 12 + currentMonth - 1) + months;
    fireYear = Math.floor(totalMonths / 12);
    fireMonth = (totalMonths % 12) + 1;
  }

  return {
    fireNumber,
    currentAssets: assets,
    progressPercent: Math.min(Math.round((assets / fireNumber) * 100), 99),
    monthsToFire: reachable ? months : -1,
    yearsToFire,
    fireAge,
    fireYear,
    fireMonth,
    monthlyExpenses: expenses,
    monthlySavings: savings,
    annualExpenses,
    savingsRate,
    alreadyFired: false,
    reachable,
  };
}

/* ── 포맷 헬퍼 ────────────────────────────────── */
export function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

export function formatWon(man: number): string {
  if (man >= 10000) {
    const eok = Math.floor(man / 10000);
    const remainder = man % 10000;
    if (remainder === 0) return `${eok}억`;
    return `${eok}억 ${formatNumber(remainder)}만`;
  }
  return `${formatNumber(man)}만`;
}
