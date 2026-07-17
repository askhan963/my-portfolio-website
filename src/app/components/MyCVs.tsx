"use client"

import { FaDownload, FaFilePdf, FaFileWord } from "react-icons/fa"
import { FiFileText, FiClock } from "react-icons/fi"
import { motion } from "framer-motion"
import { useCVs } from "@/hooks/useCVs"

import { useInView } from "react-intersection-observer";

export default function MyCVs() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { cvs, loading, error } = useCVs({ enabled: inView });

  const getFileIcon = (fileType?: string) => {
    if (fileType?.includes('pdf')) {
      return <FaFilePdf className="text-primary" size={44} />
    } else if (fileType?.includes('word') || fileType?.includes('document')) {
      return <FaFileWord className="text-primary" size={44} />
    }
    return <FiFileText className="text-primary" size={44} />
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
        ref={ref}
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
        ref={ref}
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
        ref={ref}
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
      ref={ref}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="section-shell">
      <motion.p
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="section-kicker"
      >
        Downloadable profile
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: -32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="section-heading mb-16"
      >
        My Resume
      </motion.h1>

      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -48, scale: 0.97, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 72, damping: 18 }}
          viewport={{ once: true, amount: 0.3 }}
          className="corner-frame relative overflow-hidden p-8 shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(194,164,255,0.18),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
          <div className="relative flex h-full min-h-[24rem] flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                Resume kit
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                A focused snapshot of my work, skills, and experience.
              </h2>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-10 flex h-32 w-32 items-center justify-center border border-primary/35 bg-primary/10 text-primary shadow-[0_20px_80px_rgba(194,164,255,0.18)]"
            >
              <FiFileText size={58} />
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-4">
        {cvs.map((cv, index) => (
          <motion.div
            key={cv.id}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 78,
              damping: 18,
              delay: index * 0.08,
            }}
            viewport={{ once: true, amount: 0.28 }}
            className="corner-frame group relative overflow-hidden p-6 text-card-foreground shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-[background-color,border-color,box-shadow,transform] duration-500 hover:-translate-y-2 hover:border-primary/60 hover:bg-white/[0.07] hover:shadow-[0_34px_110px_rgba(194,164,255,0.14)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(194,164,255,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.07),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-primary/35 bg-primary/10">
                {getFileIcon(cv.fileType)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold text-foreground">{cv.title}</h3>
                  {cv.isActive && (
                    <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-base leading-7 text-foreground/68">{cv.description}</p>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-foreground/55">
                  {cv.fileName && (
                    <div className="flex min-w-0 items-center">
                      <FiFileText className="mr-1 shrink-0" size={14} />
                      <span className="max-w-40 truncate">{cv.fileName}</span>
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

              <a
                href={`/api/cvs/${cv.id}/download`}
                download={cv.fileName || cv.title}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-all duration-300 hover:bg-primary/90 group-hover:scale-105"
              >
                <FaDownload className="mr-2" />
                Download
              </a>
            </div>
          </motion.div>
        ))}
        </div>
      </div>
      </div>
    </section>
  )
}
