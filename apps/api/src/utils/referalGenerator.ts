export function generateReferralCode(username: string): string {
  const maxLength = 8;
  const minLength = 6;
  
  if (username.length === 1) {
    const randomDigits = Math.floor(Math.random() * (10 ** maxLength - 10 ** (minLength - 1)) + 10 ** (minLength - 1));
    return username.toUpperCase() + randomDigits.toString();
  } else {
    const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randomDigits = Math.floor(Math.random() * (10 ** (randomLength - username.length) - 1) + 1);
    return username.substring(0, randomLength - randomDigits.toString().length).toUpperCase() + randomDigits.toString();
  }
}