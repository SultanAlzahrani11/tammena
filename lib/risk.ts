export type Gender = 'male' | 'female'

export type AssessmentInput = {
  age: number | null
  gender: Gender | null
  symptoms: string[]
  pain: number
  conditions: string[]
}

type Department = {
  id: string
  name: string
  baseWait: number
}

export const DEPARTMENTS: Record<string, Department> = {
  emergency: { id: 'emergency', name: 'الطوارئ', baseWait: 12 },
  cardiology: { id: 'cardiology', name: 'أمراض القلب', baseWait: 28 },
  neurology: { id: 'neurology', name: 'الأعصاب', baseWait: 35 },
  internal: { id: 'internal', name: 'الباطنة العامة', baseWait: 42 },
  pulmonary: { id: 'pulmonary', name: 'الأمراض الصدرية', baseWait: 31 },
  gastro: { id: 'gastro', name: 'الجهاز الهضمي', baseWait: 38 },
  ortho: { id: 'ortho', name: 'العظام', baseWait: 46 },
  derma: { id: 'derma', name: 'الجلدية', baseWait: 55 },
}

export type Symptom = { id: string; label: string; weight: number; dept: string }

export const SYMPTOMS: Symptom[] = [
  { id: 'chest_pain', label: 'ألم في الصدر', weight: 28, dept: 'cardiology' },
  { id: 'breath', label: 'ضيق في التنفس', weight: 24, dept: 'pulmonary' },
  { id: 'numbness', label: 'خدر أو ضعف في الأطراف', weight: 26, dept: 'neurology' },
  { id: 'palpitations', label: 'خفقان القلب', weight: 18, dept: 'cardiology' },
  { id: 'dizziness', label: 'دوخة أو إغماء', weight: 16, dept: 'neurology' },
  { id: 'injury', label: 'إصابة أو اشتباه كسر', weight: 15, dept: 'ortho' },
  { id: 'abdominal', label: 'ألم في البطن', weight: 14, dept: 'gastro' },
  { id: 'headache', label: 'صداع شديد', weight: 12, dept: 'neurology' },
  { id: 'fever', label: 'حمّى وارتفاع حرارة', weight: 10, dept: 'internal' },
  { id: 'vomiting', label: 'غثيان وقيء', weight: 9, dept: 'gastro' },
  { id: 'cough', label: 'سعال مستمر', weight: 8, dept: 'pulmonary' },
  { id: 'rash', label: 'طفح جلدي', weight: 5, dept: 'derma' },
]

export type Condition = { id: string; label: string; weight: number }

export const CONDITIONS: Condition[] = [
  { id: 'heart', label: 'أمراض القلب', weight: 12 },
  { id: 'diabetes', label: 'السكري', weight: 8 },
  { id: 'hypertension', label: 'ارتفاع ضغط الدم', weight: 8 },
  { id: 'kidney', label: 'أمراض الكلى', weight: 9 },
  { id: 'immuno', label: 'ضعف المناعة', weight: 9 },
  { id: 'pregnancy', label: 'حمل', weight: 10 },
  { id: 'asthma', label: 'الربو', weight: 7 },
]

export type Factor = { label: string; impact: number; detail: string }

export type Priority = {
  id: 'critical' | 'high' | 'medium' | 'low'
  label: string
  action: string
  tone: 'destructive' | 'warning' | 'primary' | 'success'
}

export function getPriority(score: number): Priority {
  if (score >= 75)
    return { id: 'critical', label: 'حرجة', action: 'توجّه إلى الطوارئ فوراً', tone: 'destructive' }
  if (score >= 55)
    return { id: 'high', label: 'عالية', action: 'مراجعة الطبيب خلال ساعة', tone: 'warning' }
  if (score >= 35)
    return { id: 'medium', label: 'متوسطة', action: 'حجز موعد اليوم', tone: 'primary' }
  return { id: 'low', label: 'منخفضة', action: 'رعاية منزلية ومتابعة', tone: 'success' }
}

function ageFactor(age: number | null): number {
  if (age === null) return 0
  if (age < 5) return 12
  if (age < 12) return 6
  if (age < 40) return 2
  if (age < 60) return 8
  if (age < 75) return 14
  return 20
}

export function computeRisk(input: AssessmentInput) {
  const factors: Factor[] = []

  const agePts = ageFactor(input.age)
  if (input.age !== null) {
    factors.push({
      label: 'العمر',
      impact: agePts,
      detail:
        agePts >= 12
          ? `الفئة العمرية (${input.age} سنة) ترفع احتمالية المضاعفات`
          : `الفئة العمرية (${input.age} سنة) ذات تأثير محدود`,
    })
  }

  const selectedSymptoms = SYMPTOMS.filter((s) => input.symptoms.includes(s.id)).sort(
    (a, b) => b.weight - a.weight,
  )
  let symptomPts = 0
  selectedSymptoms.forEach((s, i) => {
    const pts = Math.round(s.weight * (i === 0 ? 1 : i === 1 ? 0.6 : 0.35))
    symptomPts += pts
  })
  symptomPts = Math.min(symptomPts, 45)
  if (selectedSymptoms.length) {
    factors.push({
      label: 'الأعراض',
      impact: symptomPts,
      detail: `${selectedSymptoms[0].label}${selectedSymptoms.length > 1 ? ` و${selectedSymptoms.length - 1} أعراض أخرى` : ''}`,
    })
  }

  const painPts = Math.round(input.pain * 2.4)
  if (input.pain > 0) {
    factors.push({
      label: 'شدة الألم',
      impact: painPts,
      detail: `مستوى الألم ${input.pain} من 10`,
    })
  }

  const selectedConditions = CONDITIONS.filter((c) => input.conditions.includes(c.id))
  const conditionPts = Math.min(
    selectedConditions.reduce((sum, c) => sum + c.weight, 0),
    20,
  )
  if (selectedConditions.length) {
    factors.push({
      label: 'الأمراض المزمنة',
      impact: conditionPts,
      detail: selectedConditions.map((c) => c.label).join('، '),
    })
  }

  let synergyPts = 0
  const has = (id: string) => input.symptoms.includes(id)
  const hasCond = (id: string) => input.conditions.includes(id)
  if (has('chest_pain') && (hasCond('heart') || hasCond('hypertension') || hasCond('diabetes')))
    synergyPts += 10
  if (has('numbness') && (has('headache') || has('dizziness'))) synergyPts += 8
  if (has('breath') && hasCond('asthma')) synergyPts += 6
  if (synergyPts > 0) {
    factors.push({
      label: 'تداخل عوامل الخطر',
      impact: synergyPts,
      detail: 'نمط مركّب رصده النموذج يرفع الأولوية السريرية',
    })
  }

  const score = Math.max(
    0,
    Math.min(100, agePts + symptomPts + painPts + conditionPts + synergyPts),
  )

  const priority = getPriority(score)

  const primaryDept =
    score >= 75
      ? DEPARTMENTS.emergency
      : selectedSymptoms.length
        ? DEPARTMENTS[selectedSymptoms[0].dept]
        : DEPARTMENTS.internal

  const priorityMultiplier =
    priority.id === 'critical' ? 0 : priority.id === 'high' ? 0.5 : priority.id === 'medium' ? 1 : 1.35
  const waitMinutes = Math.max(2, Math.round(primaryDept.baseWait * priorityMultiplier))

  const filled =
    (input.age !== null ? 1 : 0) +
    (input.gender ? 1 : 0) +
    (selectedSymptoms.length ? 1 : 0) +
    (input.pain > 0 ? 1 : 0) +
    1
  const confidence = Math.min(97, 72 + filled * 3 + Math.min(selectedSymptoms.length, 3) * 2)

  return {
    score,
    priority,
    department: primaryDept,
    waitMinutes,
    confidence,
    factors: factors.sort((a, b) => b.impact - a.impact),
    selectedSymptoms,
    selectedConditions,
  }
}

export type RiskResult = ReturnType<typeof computeRisk>

export function toneClasses(tone: Priority['tone']) {
  switch (tone) {
    case 'destructive':
      return { text: 'text-destructive', bg: 'bg-destructive', soft: 'bg-destructive/15', border: 'border-destructive/40' }
    case 'warning':
      return { text: 'text-warning', bg: 'bg-warning', soft: 'bg-warning/15', border: 'border-warning/40' }
    case 'primary':
      return { text: 'text-primary', bg: 'bg-primary', soft: 'bg-primary/15', border: 'border-primary/40' }
    default:
      return { text: 'text-success', bg: 'bg-success', soft: 'bg-success/15', border: 'border-success/40' }
  }
}

export function scoreTone(score: number): Priority['tone'] {
  return getPriority(score).tone
}

export function encodeAssessment(input: AssessmentInput) {
  const params = new URLSearchParams()
  if (input.age !== null) params.set('age', String(input.age))
  if (input.gender) params.set('gender', input.gender)
  if (input.symptoms.length) params.set('s', input.symptoms.join(','))
  params.set('pain', String(input.pain))
  if (input.conditions.length) params.set('c', input.conditions.join(','))
  return params.toString()
}

export function decodeAssessment(
  params: Record<string, string | string[] | undefined>,
): AssessmentInput {
  const get = (k: string) => {
    const v = params[k]
    return Array.isArray(v) ? v[0] : v
  }
  const ageNum = Number(get('age'))
  const age = Number.isFinite(ageNum) && ageNum > 0 && ageNum <= 120 ? Math.round(ageNum) : null
  const g = get('gender')
  const gender: Gender | null = g === 'male' || g === 'female' ? g : null
  const validSymptoms = new Set(SYMPTOMS.map((s) => s.id))
  const validConditions = new Set(CONDITIONS.map((c) => c.id))
  const symptoms = (get('s') ?? '').split(',').filter((s) => validSymptoms.has(s))
  const conditions = (get('c') ?? '').split(',').filter((c) => validConditions.has(c))
  const painNum = Number(get('pain'))
  const pain = Number.isFinite(painNum) ? Math.max(0, Math.min(10, Math.round(painNum))) : 0
  return { age, gender, symptoms, pain, conditions }
}

export const HOSPITALS = [
  { name: 'مجمع الشفاء الطبي', distanceKm: 3.2, rating: 4.8, load: 0.62, depts: ['emergency', 'cardiology', 'neurology', 'internal', 'pulmonary'] },
  { name: 'مستشفى النخبة التخصصي', distanceKm: 5.7, rating: 4.9, load: 0.48, depts: ['cardiology', 'neurology', 'gastro', 'ortho', 'derma', 'internal'] },
  { name: 'مركز الرعاية المتقدمة', distanceKm: 2.1, rating: 4.5, load: 0.81, depts: ['emergency', 'internal', 'ortho', 'pulmonary', 'gastro'] },
]

export function recommendHospital(deptId: string, baseWait: number) {
  const scored = HOSPITALS.filter((h) => h.depts.includes(deptId))
    .map((h) => ({
      ...h,
      wait: Math.max(2, Math.round(baseWait * (0.6 + h.load))),
      score: h.distanceKm * 2 + h.load * 30 - h.rating * 4,
    }))
    .sort((a, b) => a.score - b.score)
  return scored.length ? scored : HOSPITALS.map((h) => ({ ...h, wait: baseWait, score: 0 }))
}

export function formatWait(minutes: number) {
  if (minutes <= 5) return 'فوري'
  if (minutes < 60) return `${minutes} دقيقة`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} ساعة و${m} دقيقة` : `${h} ساعة`
}
