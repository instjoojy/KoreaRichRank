export function formatWon(v: number): string {
  if (v === 0) return "0원";
  const neg = v < 0;
  const abs = Math.abs(v);
  const eok = Math.floor(abs / 10000);
  const man = abs % 10000;
  let s = "";
  if (eok > 0) s += `${eok.toLocaleString()}억`;
  if (eok > 0 && man > 0) s += " ";
  if (man > 0) s += `${man.toLocaleString()}만`;
  s += "원";
  return neg ? `-${s}` : s;
}
