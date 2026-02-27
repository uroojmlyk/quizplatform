'use client';

import { useRef } from 'react';
import { showToast } from '@/lib/toast';

interface AvatarUploadProps {
  userId?: string;
  onUpload: (url: string) => void;
}

export default function AvatarUpload({ userId, onUpload }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showToast.error('Image must be less than 2MB');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', userId);

    try {
      const res = await fetch('/api/profile/upload-avatar', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        onUpload(data.url);
        showToast.success('Avatar updated');
      } else {
        showToast.error(data.error || 'Upload failed');
      }
    } catch (error) {
      showToast.error('Network error');
    }
  };

  return (
    <input
      ref={fileInputRef}
      id="avatar-upload"
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="hidden"
    />
  );
}