import PanelArt from './PanelArt'
import { STORY } from '../data/story'

export default function Cover({ onStart }) {
  return (
    <div className="cover">
      <div className="cover-art" aria-hidden="true">
        <PanelArt scene="doorway" />
      </div>

      <div className="cover-inner">
        <p className="kicker">{STORY.kicker}</p>
        <h1 className="title">
          No le des
          <br />
          de comer
        </h1>
        <p className="sub">
          Una historia sobre el miedo. Sobre lo que crece cuando lo miras. Y sobre ti,
          que estás a punto de mirarlo.
        </p>
        <button type="button" className="play-btn" onClick={onStart}>
          <span className="play-ico">▶</span> Reproducir
        </button>
        <p className="hint">Sube el volumen · 1 min 20 s</p>
      </div>
    </div>
  )
}
