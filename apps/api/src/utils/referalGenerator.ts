export function generateReferralCode(): string {
    const timestamp = Date.now().toString(36); // Mengubah timestamp menjadi base36
    const randomChars = Math.random().toString(36).substring(2, 7); // Menghasilkan 5 karakter acak
    return `${timestamp}${randomChars}`.toUpperCase(); // Menggabungkan timestamp dan karakter acak, lalu mengubahnya menjadi huruf kapital
  }