// Helper functions for shareable links

export const generatePublicId = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const validateShareLink = (link: any): { valid: boolean; error?: string } => {
  if (!link) return { valid: false, error: 'Link not found' };
  
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return { valid: false, error: 'Link has expired' };
  }
  
  if (link.maxAttempts && link.currentAttempts >= link.maxAttempts) {
    return { valid: false, error: 'Maximum attempts reached' };
  }
  
  return { valid: true };
};

export const formatShareUrl = (publicId: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/quiz/shared/${publicId}`;
};