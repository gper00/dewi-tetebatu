export function getImageUrl(imagePath: string | null | undefined, fallback = '/placeholder.svg'): string {
  if (!imagePath) return fallback
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath
  
  // If it's a relative path that exists, return as is
  if (imagePath.startsWith('/')) return imagePath
  
  return fallback
}

export function getPackageImage(images: string[] | null | undefined): string {
  if (!images || images.length === 0) {
    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
  }
  return getImageUrl(images[0], 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop')
}

export function getActivityImage(images: string[] | null | undefined, category?: string): string {
  if (!images || images.length === 0) {
    // Return category-specific fallback images
    switch (category?.toLowerCase()) {
      case 'trekking':
        return 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop'
      case 'adventure':
        return 'https://images.unsplash.com/photo-1533873984035-25970ab07461?w=400&h=300&fit=crop'
      case 'camping':
        return 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop'
      case 'photography':
        return 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop'
      default:
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    }
  }
  return getImageUrl(images[0])
}
