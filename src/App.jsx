import { useCallback, useEffect, useMemo, useState } from 'react'
import { STORY } from './data/story'
import PanelArt from './components/PanelArt'
import Controls from './components/Controls'
import Cover from './components/Cover'
import EndCard from './components/EndCard'
import { useSound } from './hooks/useSound'

const TYPE_MS = 32
const LEAD_MS = 450

function typedLines(lines, ms) {
  let budget = Math.floor((ms - LEAD_MS) / TYPE_MS)
  return lines.map((line) => {
    const take = Math.max(0, Math.min(line.length, budget))
    budget -= line.length + 1
    return line.slice(0, take)
  })
}

function timecode(ms) {
  const total = Math.max(0, ms) / 1000
  const m = Math.floor(total / 60)
  const s = Math.floor(total % 60)
  const cs = Math.floor((total * 100) % 100)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`
}

export default function App() {
  const panels = STORY.panels
  const [stage, setStage] = useState('cover')
  const [index, setIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const sound = useSound()

  const panel = panels[Math.min(index, panels.length - 1)]
  const duration = panel.duration

  const goTo = useCallback(
    (i) => {
      setIndex(Math.max(0, Math.min(panels.length - 1, i)))
      setElapsed(0)
    },
    [panels.length],
  )

  const start = useCallback(() => {
    sound.ensure()
    sound.start()
    setIndex(0)
    setElapsed(0)
    setPlaying(true)
    setStage('play')
  }, [sound])

  const toggle = useCallback(() => {
    if (stage !== 'play') return
    if (playing) {
      sound.stop()
      setPlaying(false)
    } else {
      sound.ensure()
      sound.start()
      setPlaying(true)
    }
  }, [stage, playing, sound])

  // reloj de la viñeta
  useEffect(() => {
    if (stage !== 'play' || !playing) return undefined
    let raf = 0
    let last = performance.now()
    const step = (now) => {
      setElapsed((prev) => prev + (now - last))
      last = now
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [stage, playing])

  // avance automático
  useEffect(() => {
    if (stage !== 'play' || elapsed < duration) return
    if (index < panels.length - 1) {
      setIndex((i) => i + 1)
      setElapsed(0)
    } else {
      setStage('end')
      setPlaying(false)
      sound.stop()
    }
  }, [elapsed, duration, index, panels.length, stage, sound])

  // sonido de paso de viñeta
  useEffect(() => {
    if (stage === 'play') sound.transition()
  }, [index, stage, sound])

  // silencio
  useEffect(() => {
    sound.setMuted(muted)
  }, [muted, sound])

  useEffect(() => () => sound.stop(), [sound])

  // teclado
  useEffect(() => {
    if (stage !== 'play') return undefined
    const onKey = (event) => {
      if (event.code === 'Space') {
        event.preventDefault()
        toggle()
      } else if (event.code === 'ArrowRight') {
        goTo(index + 1)
      } else if (event.code === 'ArrowLeft') {
        goTo(index - 1)
      } else if (event.key.toLowerCase() === 'm') {
        setMuted((m) => !m)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, toggle, goTo, index])

  const typed = typedLines(panel.lines, elapsed)
  const activeLine = typed.findIndex((line, i) => line.length < panel.lines[i].length)

  const before = useMemo(
    () => panels.slice(0, index).reduce((sum, p) => sum + p.duration, 0),
    [panels, index],
  )

  const fractions = panels.map((p, i) => {
    if (i < index) return 1
    if (i === index) return Math.min(1, elapsed / p.duration)
    return 0
  })

  return (
    <div className="app">
      <div className="scan" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {stage === 'cover' && <Cover onStart={start} />}

      {stage === 'play' && (
        <>
          <div className="hud" aria-hidden="true">
            <span className="rec">
              <i />
              REC
            </span>
            <span>{timecode(before + Math.min(elapsed, duration))}</span>
          </div>

          <div className="screen">
            <div className="frame">
              <div className="panel" key={index}>
                <PanelArt scene={panel.scene} />
                <span className="vineta">
                  {String(index + 1).padStart(2, '0')} / {String(panels.length).padStart(2, '0')}
                </span>
                <div className="captions">
                  {panel.lines.map((line, i) =>
                    typed[i].length > 0 ? (
                      <p className="cap" key={`${index}-${i}`}>
                        {typed[i]}
                        {i === activeLine && <span className="caret" />}
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
          </div>

          <Controls
            playing={playing}
            muted={muted}
            index={index}
            count={panels.length}
            fractions={fractions}
            onToggle={toggle}
            onPrev={() => goTo(index - 1)}
            onNext={() => goTo(index + 1)}
            onJump={goTo}
            onMute={() => setMuted((m) => !m)}
          />
        </>
      )}

      {stage === 'end' && <EndCard onReplay={start} />}
    </div>
  )
}
