import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadImage } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    
    // Check authentication
    const session = await getServerSession(authOptions)
    console.log('Session:', session?.user?.role)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'portfolio'

    console.log('File received:', file?.name, file?.size, file?.type)
    console.log('Folder:', folder)

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type based on folder
    const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const cvTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    let allowedTypes: string[]
    let maxSize: number
    
    if (folder === 'cvs') {
      allowedTypes = cvTypes
      maxSize = 10 * 1024 * 1024 // 10MB for CV files
    } else {
      allowedTypes = imageTypes
      maxSize = 5 * 1024 * 1024 // 5MB for images
    }
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type', 
        details: `Allowed types: ${allowedTypes.join(', ')}` 
      }, { status: 400 })
    }

    // Validate file size
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large', 
        details: `Maximum size: ${maxSize / (1024 * 1024)}MB` 
      }, { status: 400 })
    }

    // Check Cloudinary config
    console.log('Cloudinary config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
      api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing',
    })

    // Upload to Cloudinary
    console.log('Attempting Cloudinary upload...')
    const result = await uploadImage(file, folder)
    console.log('Upload successful:', result.url)

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
