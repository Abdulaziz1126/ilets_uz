import { createContext, useContext, useEffect, useState } from 'react'

interface TimerContextType {
  timeLeft: number
  isTicking: boolean
  stopTimer: () => void
  resetTimer: () => void
}

const TimerContext = createContext<TimerContextType | undefined>(undefined)

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minut
  const [isTicking, setIsTicking] = useState(true)

  useEffect(() => {
    if (!isTicking) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsTicking(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isTicking])

  const stopTimer = () => setIsTicking(false)
  const resetTimer = () => {
    setTimeLeft(60 * 60)
    setIsTicking(true)
  }

  return (
    <TimerContext.Provider value={{ timeLeft, isTicking, stopTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  )
}

export const useTimer = () => {
  const context = useContext(TimerContext)
  if (!context) throw new Error("useTimer must be used within TimerProvider")
  return context
}
