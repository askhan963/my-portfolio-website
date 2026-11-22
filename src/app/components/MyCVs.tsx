"use client"

import { FaDownload, FaFilePdf, FaFileWord } from "react-icons/fa"
import { FiFileText, FiClock } from "react-icons/fi"
import { motion } from "framer-motion"
import { useCVs, type CV } from "@/hooks/useCVs"

import { useInView } from "react-intersection-observer";

export default function MyCVs({
  initialData,
}: {
  initialData?: CV[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { cvs, loading, error } = useCVs({
    enabled: inView && !initialData,
    initialData,
  });

  const getFileIcon = (fileType?: string) => {
    if (fileType?.includes('pdf')) {
      return <FaFilePdf className="text-primary" size={28} />
    } else if (fileType?.includes('word') || fileType?.includes('document')) {
      return <FaFileWord className="text-primary" size={28} />
    }
    return <FiFileText className="text-primary" size={28} />
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

  if (loading || error || cvs.length === 0) {
    return null
  }

  return (
    <section id="my-cvs" ref={ref} className="relative bg-background py-24 sm:py-32">
      <div className="section-shell">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading mb-14"
        >
          Resume
        </motion.h2>

        <div className="divide-y divide-border border-t border-border">
          {cvs.map((cv, index) => (
            <motion.div
              key={cv.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.18) }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex items-start gap-4 sm:flex-1 sm:items-center">
                <span className="shrink-0 text-foreground/40">{getFileIcon(cv.fileType)}</span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{cv.title}</h3>
                    {cv.isActive && (
                      <span className="tag-chip text-primary">Active</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-foreground/65">{cv.description}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-foreground/50">
                    {cv.fileName && <span className="max-w-40 truncate">{cv.fileName}</span>}
                    {cv.fileSize && <span>{formatFileSize(cv.fileSize)}</span>}
                    <span className="flex items-center gap-1"><FiClock size={12} /> {formatDate(cv.createdAt)}</span>
                  </div>
                </div>
              </div>

              <a
                href={`/api/cvs/${cv.id}/download`}
                download={cv.fileName || cv.title}
                className="inline-flex shrink-0 items-center justify-center border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <FaDownload className="mr-2" size={14} />
                Download
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
