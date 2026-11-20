export default function EndCard({ onReplay }) {
  return (
    <div className="end">
      <div className="end-inner">
        <p className="kicker">Fin</p>
        <h2 className="end-title">
          Gracias por
          <br />
          alimentarla.
        </h2>
        <p className="sub">Ahora ya sabe dónde vives.</p>
        <button type="button" className="play-btn" onClick={onReplay}>
          <span className="play-ico">↺</span> Ver de nuevo
        </button>
      </div>
    </div>
  )
}
