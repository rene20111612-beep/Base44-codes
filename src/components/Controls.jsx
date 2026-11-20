const IconPlay = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M7 4l13 8-13 8z" fill="currentColor" />
  </svg>
)

const IconPause = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" fill="currentColor" />
    <rect x="14" y="4" width="4" height="16" fill="currentColor" />
  </svg>
)

const IconPrev = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M18 4v16L7 12z" fill="currentColor" />
    <rect x="4" y="4" width="2" height="16" fill="currentColor" />
  </svg>
)

const IconNext = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M6 4v16l11-8z" fill="currentColor" />
    <rect x="18" y="4" width="2" height="16" fill="currentColor" />
  </svg>
)

const IconSound = ({ muted }) => (
  <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
    <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
    {muted ? (
      <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" fill="none" />
    ) : (
      <path
        d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    )}
  </svg>
)

export default function Controls({
  playing,
  muted,
  index,
  count,
  fractions,
  onToggle,
  onPrev,
  onNext,
  onJump,
  onMute,
}) {
  return (
    <div className="controls">
      <div className="segs">
        {fractions.map((fraction, i) => (
          <button
            key={i}
            type="button"
            className="seg"
            onClick={() => onJump(i)}
            aria-label={`Ir a la viñeta ${i + 1}`}
          >
            <i style={{ transform: `scaleX(${fraction})` }} />
          </button>
        ))}
      </div>

      <div className="btns">
        <button type="button" className="btn" onClick={onPrev} disabled={index === 0} aria-label="Viñeta anterior">
          <IconPrev />
        </button>
        <button
          type="button"
          className="btn btn-main"
          onClick={onToggle}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </button>
        <button
          type="button"
          className="btn"
          onClick={onNext}
          disabled={index === count - 1}
          aria-label="Viñeta siguiente"
        >
          <IconNext />
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onMute}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        >
          <IconSound muted={muted} />
        </button>
        <span className="count">
          VIÑETA {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
