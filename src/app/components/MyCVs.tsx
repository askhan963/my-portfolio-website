"use client"

import { FaDownload, FaFilePdf, FaFileWord } from "react-icons/fa"
import { FiDownload, FiFileText, FiClock } from "react-icons/fi"
import { useCVs } from "@/hooks/useCVs"

export default function MyCVs() {
  const { cvs, loading, error } = useCVs()

  const getFileIcon = (fileType?: string) => {
    if (fileType?.includes('pdf')) {
      return <FaFilePdf className="text-red-500" size={64} />
    } else if (fileType?.includes('word') || fileType?.includes('document')) {
      return <FaFileWord className="text-blue-500" size={64} />
    }
    return <FiFileText className="text-primary" size={64} />
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section
        id="my-cvs"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center">
          My Resume
        </h1>
        <div className="max-w-2xl w-full">
          <div className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-8 border border-border animate-pulse">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <div className="w-16 h-16 bg-gray-300 rounded"></div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4"></div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-auto flex-shrink-0">
              <div className="h-10 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section
        id="my-cvs"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center">
          My Resume
        </h1>
        <div className="max-w-2xl w-full text-center">
          <div className="bg-card text-card-foreground rounded-xl shadow-lg p-8 border border-border">
            <p className="text-foreground/70">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (cvs.length === 0) {
    return (
      <section
        id="my-cvs"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center">
          My Resume
        </h1>
        <div className="max-w-2xl w-full text-center">
          <div className="bg-card text-card-foreground rounded-xl shadow-lg p-8 border border-border">
            <FiFileText className="text-primary mx-auto mb-4" size={48} />
            <p className="text-foreground/70">No CVs available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="my-cvs"
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center">
        My Resume
      </h1>

      <div className="max-w-4xl w-full space-y-6">
        {cvs.map((cv) => (
          <div
            key={cv.id}
            className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-border group"
          >
            {/* File Icon */}
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              {getFileIcon(cv.fileType)}
            </div>

            {/* CV Details */}
            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <h3 className="text-2xl font-bold text-foreground mr-3">{cv.title}</h3>
                {cv.isActive && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                )}
              </div>
              <p className="text-foreground/70 mb-4">{cv.description}</p>
              
              {/* File Info */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-foreground/60">
                {cv.fileName && (
                  <div className="flex items-center">
                    <FiFileText className="mr-1" size={14} />
                    <span className="truncate max-w-32">{cv.fileName}</span>
                  </div>
                )}
                {cv.fileSize && (
                  <div className="flex items-center">
                    <span>{formatFileSize(cv.fileSize)}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <FiClock className="mr-1" size={14} />
                  <span>{formatDate(cv.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <a
              href={cv.downloadLink}
              download={cv.fileName || cv.title}
              className="mt-4 md:mt-0 md:ml-auto flex-shrink-0 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 group-hover:scale-105"
            >
              <FaDownload className="mr-2" />
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
