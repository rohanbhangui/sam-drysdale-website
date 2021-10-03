import React, { useState, useEffect } from "react"

const useMultiAudio = (urls) => {
  const [sources] = useState(
    urls.map((url) => {
      return {
        url,
        audio: new Audio(url),
      }
    }),
  )

  const [players, setPlayers] = useState(
    urls.map((url) => {
      return {
        url,
        playing: false,
      }
    }),
  )

  const toggle = (targetIndex) => () => {
    const newPlayers = [...players]
    const currentIndex = players.findIndex((p) => p.playing === true)
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false
      newPlayers[targetIndex].playing = true
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false
    } else {
      newPlayers[targetIndex].playing = true
    }
    setPlayers(newPlayers)
  }

  useEffect(() => {
    sources.forEach((source, i) => {
      if(players[i].playing) {
        source.audio.play()
      } else {
        source.audio.pause()
        source.audio.currentTime = 0
      }
    })
  }, [sources, players])

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players]
        newPlayers[i].playing = false
        setPlayers(newPlayers)
      })
    })
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
        })
      })
    }
  }, [])

  return [players, toggle]
}

export default useMultiAudio
