'use client'

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { TechnicalLabel } from './primitives'

type Upload = {
  id: string
  name: string
  size: number
  progress: number
  done: boolean
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadDropzone() {
  const [dragging, setDragging] = useState(false)
  const [uploads, setUploads] = useState<Upload[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const ingest = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return
    const next: Upload[] = Array.from(files).map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`,
      name: f.name,
      size: f.size,
      progress: 0,
      done: false,
    }))
    setUploads((prev) => [...next, ...prev].slice(0, 8))

    next.forEach((u) => {
      const tick = () => {
        setUploads((prev) =>
          prev.map((item) => {
            if (item.id !== u.id || item.done) return item
            const step = 8 + Math.random() * 22
            const progress = Math.min(100, item.progress + step)
            return { ...item, progress, done: progress >= 100 }
          }),
        )
      }
      const interval = setInterval(() => {
        tick()
        setUploads((prev) => {
          const item = prev.find((i) => i.id === u.id)
          if (item?.done) clearInterval(interval)
          return prev
        })
      }, 220)
    })
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      ingest(e.dataTransfer.files)
    },
    [ingest],
  )

  return (
    <div className="flex flex-col gap-3">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload objects to SKYBOX"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`btn-mech group relative flex min-h-[168px] cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
          dragging ? 'border-rose bg-petal' : 'border-line bg-muted/60 hover:border-rose/70 hover:bg-petal/60'
        }`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:[animation:sheen_1s_ease-out]"
        />
        <motion.span
          aria-hidden
          animate={dragging ? { y: -6, rotate: 0 } : { y: 0, rotate: 0 }}
          className="anim-float relative flex size-14 items-center justify-center rounded-full border border-rose/50 bg-card shadow-[0_10px_30px_-14px_rgba(220,38,38,0.7)]"
        >
          <svg viewBox="0 0 24 24" className="size-6 text-rose" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 16V4" />
            <path d="m6 10 6-6 6 6" />
            <path d="M4 20h16" />
          </svg>
        </motion.span>
        <div className="relative flex flex-col gap-1">
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[#991b1b]">
            {dragging ? 'Release to launch' : 'Drop objects here'}
          </span>
          <TechnicalLabel>Drag &amp; drop or click to browse · max 8 in flight</TechnicalLabel>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => ingest(e.target.files)}
        />
      </div>

      <AnimatePresence initial={false}>
        {uploads.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2 overflow-hidden"
          >
            {uploads.map((u) => (
              <motion.li
                key={u.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="flex items-center gap-3 rounded-lg border border-line bg-card px-3 py-2 font-mono text-[11px]"
              >
                <span className={`size-2 shrink-0 rounded-full ${u.done ? 'bg-rose' : 'bg-blush led'}`} />
                <span className="min-w-0 flex-1 truncate text-foreground">{u.name}</span>
                <span className="shrink-0 tabular-nums text-muted-foreground">{formatSize(u.size)}</span>
                <span className="relative h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-muted">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blush to-rose transition-[width] duration-200"
                    style={{ width: `${u.progress}%` }}
                  />
                </span>
                <span className="w-12 shrink-0 text-right tabular-nums text-[#991b1b]">
                  {u.done ? 'DONE' : `${Math.round(u.progress)}%`}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
