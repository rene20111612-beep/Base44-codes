import { useCallback, useMemo, useRef } from 'react'

/**
 * Ambiente sonoro generado con la Web Audio API:
 * un drone grave, latidos y un barrido entre viñetas.
 * No usa ficheros de audio, así que no depende de red.
 */
export function useSound() {
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const droneRef = useRef(null)
  const heartRef = useRef(null)
  const mutedRef = useRef(false)

  const ensure = useCallback(() => {
    if (typeof window === 'undefined') return null
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    if (!ctxRef.current) {
      const ctx = new AC()
      const master = ctx.createGain()
      master.gain.value = mutedRef.current ? 0 : 0.9
      master.connect(ctx.destination)
      ctxRef.current = ctx
      masterRef.current = master
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }, [])

  const noiseBuffer = useCallback((ctx) => {
    const len = Math.floor(ctx.sampleRate * 2)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1
    return buf
  }, [])

  const thump = useCallback(() => {
    const ctx = ensure()
    if (!ctx || !masterRef.current) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(72, t)
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.35)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.3, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
    osc.connect(gain)
    gain.connect(masterRef.current)
    osc.start(t)
    osc.stop(t + 0.55)
  }, [ensure])

  const transition = useCallback(() => {
    const ctx = ensure()
    if (!ctx || !masterRef.current) return
    const t = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = noiseBuffer(ctx)
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.Q.value = 1.2
    band.frequency.setValueAtTime(1500, t)
    band.frequency.exponentialRampToValueAtTime(120, t + 0.7)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85)
    src.connect(band)
    band.connect(gain)
    gain.connect(masterRef.current)
    src.start(t)
    src.stop(t + 0.9)
  }, [ensure, noiseBuffer])

  const start = useCallback(() => {
    const ctx = ensure()
    if (!ctx || droneRef.current || !masterRef.current) return
    const t = ctx.currentTime

    const out = ctx.createGain()
    out.gain.setValueAtTime(0, t)
    out.gain.linearRampToValueAtTime(0.17, t + 2.5)

    const low = ctx.createBiquadFilter()
    low.type = 'lowpass'
    low.frequency.value = 240
    low.Q.value = 2

    const o1 = ctx.createOscillator()
    o1.type = 'sawtooth'
    o1.frequency.value = 41.2
    const o2 = ctx.createOscillator()
    o2.type = 'sawtooth'
    o2.frequency.value = 41.9
    const og = ctx.createGain()
    og.gain.value = 0.5

    o1.connect(og)
    o2.connect(og)
    og.connect(low)
    low.connect(out)

    const air = ctx.createBufferSource()
    air.buffer = noiseBuffer(ctx)
    air.loop = true
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 480
    band.Q.value = 0.7
    const ag = ctx.createGain()
    ag.gain.value = 0.05
    air.connect(band)
    band.connect(ag)
    ag.connect(out)

    out.connect(masterRef.current)
    o1.start(t)
    o2.start(t)
    air.start(t)

    droneRef.current = { o1, o2, air, out }
    heartRef.current = window.setInterval(thump, 1900)
  }, [ensure, noiseBuffer, thump])

  const stop = useCallback(() => {
    if (heartRef.current) {
      window.clearInterval(heartRef.current)
      heartRef.current = null
    }
    const ctx = ctxRef.current
    const drone = droneRef.current
    if (!ctx || !drone) return
    const t = ctx.currentTime
    try {
      drone.out.gain.cancelScheduledValues(t)
      drone.out.gain.setValueAtTime(drone.out.gain.value, t)
      drone.out.gain.linearRampToValueAtTime(0, t + 0.5)
      drone.o1.stop(t + 0.6)
      drone.o2.stop(t + 0.6)
      drone.air.stop(t + 0.6)
    } catch {
      /* el nodo ya estaba detenido */
    }
    droneRef.current = null
  }, [])

  const setMuted = useCallback((muted) => {
    mutedRef.current = muted
    const ctx = ctxRef.current
    if (ctx && masterRef.current) {
      masterRef.current.gain.setTargetAtTime(muted ? 0 : 0.9, ctx.currentTime, 0.08)
    }
  }, [])

  return useMemo(
    () => ({ ensure, start, stop, thump, transition, setMuted }),
    [ensure, start, stop, thump, transition, setMuted],
  )
}
