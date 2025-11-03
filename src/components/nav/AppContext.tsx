import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'

interface UserData {
  firstName: string
  lastName: string
  phone: string
}

interface WritingData {
  imageDescription: string
  essayResponse: string
}

type ListeningAnswers = string[]
type ReadingAnswers = Record<number, string>

interface AppContextProps {
  userData: UserData
  setUserData: (data: UserData) => void
  writingData: WritingData
  setWritingData: (data: WritingData) => void
  listeningAnswers: ListeningAnswers
  setListeningAnswers: (answers: ListeningAnswers) => void
  readingAnswers: ReadingAnswers
  setReadingAnswers: (answers: ReadingAnswers) => void
  timeLeft: number
  isTimerRunning: boolean
  startTimer: (seconds?: number) => void
  resetTimer: () => void
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [writingData, setWritingData] = useState<WritingData>({
    imageDescription: '',
    essayResponse: '',
  })
  const [listeningAnswers, setListeningAnswers] = useState<ListeningAnswers>(Array(40).fill(''))
  const [readingAnswers, setReadingAnswers] = useState<ReadingAnswers>({})

  // TIMER
  const DEFAULT_TIME = 60 * 60 // 1 soat (3600 sekund)
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  // in browser, setInterval returns a number
  const timerRef = useRef<number | null>(null)

  // Timer har doim yurishi uchun, AppProvider ochilganda avtomatik start
  // NOTE: do not auto-start the timer on AppProvider mount.
  // The timer should start when the user registers by calling startTimer().
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [DEFAULT_TIME])

  const startTimer = useCallback((seconds?: number) => {
    // always clear any existing timer first to avoid carry-over between users
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setTimeLeft(seconds ?? DEFAULT_TIME)
    setIsTimerRunning(true)
    // use window.setInterval to ensure correct return type in browser
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          timerRef.current = null
          setIsTimerRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [DEFAULT_TIME])

  const resetTimer = useCallback(() => {
    setTimeLeft(DEFAULT_TIME)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsTimerRunning(true)
    // Timer qayta boshlansin
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          timerRef.current = null
          setIsTimerRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [DEFAULT_TIME])

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        writingData,
        setWritingData,
        listeningAnswers,
        setListeningAnswers,
        readingAnswers,
        setReadingAnswers,
        timeLeft,
        isTimerRunning,
        startTimer,
        resetTimer,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}