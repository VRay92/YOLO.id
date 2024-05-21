export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function getAgeGroup(age: number): string {
    if (age < 18) return '<18';
    if (age >= 18 && age <= 24) return '18-24';
    if (age >= 25 && age <= 34) return '25-34';
    if (age >= 35 && age <= 44) return '35-44';
    if (age >= 45 && age <= 54) return '45-54';
    if (age >= 55 && age <= 64) return '55-64';
    return '65+';
  }
