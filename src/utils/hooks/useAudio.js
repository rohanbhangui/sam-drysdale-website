import { useState, useEffect } from "react"

const useAudio = (url) => {
  const [audio] = useState(new Audio(url))
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

  useEffect(() => {
    audio.addEventListener("ended", () => {
      setPlaying(false)
      audio.currentTime = 0
    })
    return () => {
      audio.removeEventListener("ended", () => {
        setPlaying(false)
        audio.currentTime = 0
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [playing, toggle]
}

export default useAudio
