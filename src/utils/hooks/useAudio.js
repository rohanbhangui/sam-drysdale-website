import { useState, useEffect } from "react"

const useAudio = (audio) => {
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying((prevState) => !prevState)

  useEffect(() => {
    if (playing) {
      audio.play()
    } else {
      audio.pause()
      audio.currentTime = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing])

  const ended = () => {
    setPlaying(false)
    audio.currentTime = 0
  }

  useEffect(() => {
    audio.addEventListener("ended", ended)
    return () => {
      audio.removeEventListener("ended", ended)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [playing, toggle]
}

export default useAudio
