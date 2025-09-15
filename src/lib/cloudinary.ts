import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

console.log('Cloudinary config loaded:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
  api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing',
})

export { cloudinary }

// Utility function to upload image
export async function uploadImage(
  file: File | Buffer,
  folder: string = 'portfolio',
  publicId?: string
): Promise<{ url: string; publicId: string }> {
  try {
    console.log('Starting Cloudinary upload...', {
      folder,
      publicId,
      fileType: file instanceof File ? file.type : 'Buffer',
      fileSize: file instanceof File ? file.size : 'Unknown'
    })

    // Convert File to Buffer if needed
    let fileBuffer: Buffer
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      fileBuffer = Buffer.from(arrayBuffer)
    } else {
      fileBuffer = file
    }

    const result = await cloudinary.uploader.upload(
      `data:${file instanceof File ? file.type : 'image/jpeg'};base64,${fileBuffer.toString('base64')}`,
      {
        folder,
        public_id: publicId,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
      }
    )

    console.log('Cloudinary upload successful:', result.secure_url)
    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    console.error('Cloudinary upload error details:', error)
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Utility function to delete image
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId)
    return true
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return false
  }
}

// Utility function to get optimized image URL
export function getOptimizedImageUrl(
  publicId: string,
  width?: number,
  height?: number,
  quality: string = 'auto'
): string {
  return cloudinary.url(publicId, {
    width,
    height,
    quality,
    fetch_format: 'auto',
  })
}
