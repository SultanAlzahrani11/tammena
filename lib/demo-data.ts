export const PATIENT_FLOW = [
  { hour: '06:00', arrivals: 18, discharged: 9, predicted: 20 },
  { hour: '08:00', arrivals: 42, discharged: 21, predicted: 39 },
  { hour: '10:00', arrivals: 67, discharged: 38, predicted: 64 },
  { hour: '12:00', arrivals: 74, discharged: 52, predicted: 78 },
  { hour: '14:00', arrivals: 61, discharged: 58, predicted: 63 },
  { hour: '16:00', arrivals: 69, discharged: 55, predicted: 72 },
  { hour: '18:00', arrivals: 83, discharged: 61, predicted: 86 },
  { hour: '20:00', arrivals: 77, discharged: 64, predicted: 81 },
  { hour: '22:00', arrivals: 49, discharged: 57, predicted: 52 },
]

export const WAIT_PREDICTION = [
  { time: 'الآن', actual: 34, predicted: 34, lower: 30, upper: 38 },
  { time: '+1س', actual: null, predicted: 41, lower: 35, upper: 47 },
  { time: '+2س', actual: null, predicted: 52, lower: 44, upper: 60 },
  { time: '+3س', actual: null, predicted: 58, lower: 48, upper: 68 },
  { time: '+4س', actual: null, predicted: 47, lower: 37, upper: 57 },
  { time: '+5س', actual: null, predicted: 39, lower: 29, upper: 49 },
  { time: '+6س', actual: null, predicted: 31, lower: 22, upper: 40 },
]

export const WAIT_HISTORY = [
  { time: '-6س', actual: 22, predicted: 24 },
  { time: '-5س', actual: 28, predicted: 27 },
  { time: '-4س', actual: 36, predicted: 34 },
  { time: '-3س', actual: 44, predicted: 41 },
  { time: '-2س', actual: 39, predicted: 40 },
  { time: '-1س', actual: 31, predicted: 33 },
]

export const DEPARTMENT_LOAD = [
  { dept: 'الطوارئ', load: 92, patients: 48, capacity: 52, wait: 14 },
  { dept: 'أمراض القلب', load: 78, patients: 29, capacity: 37, wait: 28 },
  { dept: 'الباطنة', load: 71, patients: 34, capacity: 48, wait: 42 },
  { dept: 'الأعصاب', load: 64, patients: 18, capacity: 28, wait: 35 },
  { dept: 'الصدرية', load: 58, patients: 15, capacity: 26, wait: 31 },
  { dept: 'العظام', load: 46, patients: 19, capacity: 41, wait: 46 },
  { dept: 'الجلدية', load: 32, patients: 8, capacity: 25, wait: 55 },
]

export const WEEKLY_TREND = [
  { day: 'السبت', patients: 318, avgWait: 38 },
  { day: 'الأحد', patients: 402, avgWait: 47 },
  { day: 'الإثنين', patients: 386, avgWait: 44 },
  { day: 'الثلاثاء', patients: 351, avgWait: 39 },
  { day: 'الأربعاء', patients: 364, avgWait: 41 },
  { day: 'الخميس', patients: 297, avgWait: 33 },
  { day: 'الجمعة', patients: 241, avgWait: 27 },
]

export const PRIORITY_MIX = [
  { level: 'critical', label: 'حرجة', value: 38, fill: 'var(--color-critical)' },
  { level: 'high', label: 'عالية', value: 94, fill: 'var(--color-high)' },
  { level: 'medium', label: 'متوسطة', value: 156, fill: 'var(--color-medium)' },
  { level: 'low', label: 'منخفضة', value: 124, fill: 'var(--color-low)' },
]

export const RECOMMENDATIONS = [
  {
    title: 'نقل ممرضَين من العظام إلى الطوارئ',
    detail: 'ذروة متوقعة بين 18:00 و20:00 بنسبة إشغال 97%. التحويل يخفض الانتظار بنحو 11 دقيقة.',
    impact: '-11 دقيقة',
    priority: 'high' as const,
    confidence: 93,
  },
  {
    title: 'فتح 4 أسرّة مراقبة إضافية',
    detail: 'إشغال الأسرّة سيتجاوز 90% خلال ساعتين وفق نموذج التنبؤ بالتدفق.',
    impact: '+4 أسرّة',
    priority: 'high' as const,
    confidence: 89,
  },
  {
    title: 'تحويل الحالات منخفضة الخطورة للعيادات الافتراضية',
    detail: '31% من حالات الباطنة مصنّفة منخفضة الخطورة ويمكن خدمتها عن بُعد.',
    impact: '-18% ضغط',
    priority: 'medium' as const,
    confidence: 86,
  },
  {
    title: 'جدولة خروج 9 مرضى قبل الساعة 16:00',
    detail: 'تسريع إجراءات الخروج يحرر سعة كافية لاستيعاب موجة المساء.',
    impact: '+9 أسرّة',
    priority: 'medium' as const,
    confidence: 81,
  },
]

export const LIVE_QUEUE = [
  { id: 'P-2841', age: 67, dept: 'أمراض القلب', score: 86, wait: 'فوري' },
  { id: 'P-2839', age: 34, dept: 'الطوارئ', score: 72, wait: '8 د' },
  { id: 'P-2836', age: 52, dept: 'الأعصاب', score: 61, wait: '17 د' },
  { id: 'P-2833', age: 8, dept: 'الباطنة', score: 44, wait: '32 د' },
  { id: 'P-2830', age: 29, dept: 'العظام', score: 27, wait: '51 د' },
]

export const KPIS = {
  patientsToday: 412,
  patientsDelta: 8.4,
  avgWait: 34,
  avgWaitDelta: -12.6,
  bedOccupancy: 84,
  bedsUsed: 218,
  bedsTotal: 260,
  modelAccuracy: 94.2,
}
