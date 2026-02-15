// 2026년 최저임금: 10,030원
export const MIN_WAGE_2026 = 10_030;
export const WORK_DAYS_PER_MONTH = 22;
export const WORK_DAYS_PER_YEAR = 264;

export interface Inputs {
  monthlySalary: number | "";
  regularHours: number | "";
  commuteHours: number | "";
  overtimeHours: number | "";
  afterWorkMinutes: number | "";
  prepHours: number | "";
}

export interface Result {
  realHourlyWage: number;
  officialHourlyWage: number;
  minWageRatio: number;
  totalDailyHours: number;
  hiddenHours: number;
  monthlyHiddenHours: number;
  monthlyLostWon: number;
  yearlyCommuteHours: number;
  yearlyCommuteWon: number;
  yearlyHiddenHours: number;
  yearlyLostWon: number;
}

export interface Grade {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}

export function getGrade(minWageRatio: number): Grade {
  if (minWageRatio < 70)
    return { title: "기부 천사", subtitle: "회사에 재능 기부 중이시군요? 아니, 돈까지 기부하고 계셨네요! 사장님이 당신을 볼 때마다 눈물을 흘리는 이유, 감동이 아니라 감사였습니다.", emoji: "😇", color: "#DC2626" };
  if (minWageRatio < 100)
    return { title: "삼각김밥 사장님", subtitle: "편의점 알바가 진심으로 부럽습니다. 사장님 삼각김밥 하나만요... 시급 따지면 편의점 알바보다 못한 건 국가기밀로 해주세요.", emoji: "🍙", color: "#EA580C" };
  if (minWageRatio < 150)
    return { title: "이직 포털 즐겨찾기", subtitle: "퇴근 후 잡플래닛 켜는 거 다 보여요. 이직각입니다 이직각! 면접관 앞에서 이 시급 결과 보여주면 동정표 받을 수 있습니다.", emoji: "🧳", color: "#D97706" };
  if (minWageRatio < 200)
    return { title: "야근 후유증 주의보", subtitle: "시급은 괜찮은데 병원비로 다 나갑니다. 제발 운동하세요! 야근 수당이 아니라 야근 치료비를 회사에 청구해야 할 판입니다.", emoji: "💊", color: "#059669" };
  if (minWageRatio < 300)
    return { title: "워라밸 수호자", subtitle: "칼퇴 후 넷플릭스 켜는 여유... 부럽다 정말 부럽다! 이 정도면 '연봉이 높아서가 아니라 삶의 질이 높은 겁니다'라고 당당히 말할 수 있어요.", emoji: "🔥", color: "#10B981" };
  return { title: "시급 재벌", subtitle: "혹시 대표님이세요? 아니라면 연봉 협상의 신이십니다! 시간당 벌이가 너무 좋아서 일이 아니라 취미처럼 느껴지시는 분.", emoji: "👑", color: "#FFD700" };
}

export function calculate(inputs: Inputs): Result | null {
  const salary = Number(inputs.monthlySalary);
  const regular = Number(inputs.regularHours);
  const commute = Number(inputs.commuteHours);
  const overtime = Number(inputs.overtimeHours);
  const afterWorkMin = Number(inputs.afterWorkMinutes);
  const prep = Number(inputs.prepHours);

  if (!salary || !regular) return null;

  const afterWorkHours = afterWorkMin / 60;
  const totalDailyHours = regular + overtime + commute + afterWorkHours + prep;
  const hiddenHours = totalDailyHours - regular;

  const realHourlyWage = Math.round(
    salary / (WORK_DAYS_PER_MONTH * totalDailyHours)
  );
  const officialHourlyWage = Math.round(
    salary / (WORK_DAYS_PER_MONTH * regular)
  );

  const minWageRatio = Math.round((realHourlyWage / MIN_WAGE_2026) * 100);
  const monthlyHiddenHours = Math.round(hiddenHours * WORK_DAYS_PER_MONTH * 10) / 10;
  const monthlyLostWon = Math.round(hiddenHours * WORK_DAYS_PER_MONTH * realHourlyWage);

  const yearlyCommuteHours = Math.round(commute * WORK_DAYS_PER_YEAR * 10) / 10;
  const yearlyCommuteWon = Math.round(commute * WORK_DAYS_PER_YEAR * realHourlyWage);
  const yearlyHiddenHours = Math.round(hiddenHours * WORK_DAYS_PER_YEAR * 10) / 10;
  const yearlyLostWon = Math.round(hiddenHours * WORK_DAYS_PER_YEAR * realHourlyWage);

  return {
    realHourlyWage,
    officialHourlyWage,
    minWageRatio,
    totalDailyHours,
    hiddenHours,
    monthlyHiddenHours,
    monthlyLostWon,
    yearlyCommuteHours,
    yearlyCommuteWon,
    yearlyHiddenHours,
    yearlyLostWon,
  };
}

export function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}
