export type PersonalityKey = 'reflective' | 'analytical' | 'collaborative' | 'visionary';

/** Derive result profile from self-discovery answers (values must match option `value` keys). */
export function determinePersonalityKey(answers: Record<number, string>): PersonalityKey {
  const values = Object.values(answers);
  const traits = {
    reflective: values.filter((v) => ['reflect', 'pause', 'authentic'].includes(v)).length,
    analytical: values.filter((v) => ['analyze', 'systems', 'clarity'].includes(v)).length,
    collaborative: values.filter((v) => ['discuss', 'people', 'empathy'].includes(v)).length,
    visionary: values.filter((v) => ['intuition', 'vision', 'creating'].includes(v)).length,
  };
  const primary = Object.entries(traits).sort((a, b) => b[1] - a[1])[0][0];
  return primary as PersonalityKey;
}
