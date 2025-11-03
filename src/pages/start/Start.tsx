import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../components/nav/AppContext'
import './start.scss'

const Start = () => {
  const navigate = useNavigate()
  const { userData, startTimer, timeLeft, isTimerRunning } = useAppContext()

  useEffect(() => {
    // If user is not registered (phone empty) redirect to registration page
    if (!userData || !userData.phone) {
      navigate('/')
    }
  }, [userData, navigate])

  const handleStartTest = () => {
    // Start timer for 60 minutes if not already running
    startTimer(60 * 60)
    navigate('/listening')
  }

  return (
    <div className="start_container">
      <div className="start_card">
        <h1 className="start_title">IELTS Test</h1>

        <div className="user_info">
          <h2>Welcome, {userData?.firstName} {userData?.lastName}!</h2>
          <p>Phone: {userData?.phone}</p>
          {isTimerRunning ? (
            <p className="time_info">Time remaining: {Math.floor(timeLeft / 60)} min {timeLeft % 60} s</p>
          ) : (
            <p className="time_info">Time: 60:00 (Timer not started)</p>
          )}
        </div>

        <div className="info_section">
          <h3>Test Information:</h3>
          <ul>
            <li>Test duration: 60 minutes</li>
            <li>3 sections: Listening, Reading, Writing</li>
            <li>Listening: 40 questions</li>
            <li>Reading: 40 questions</li>
            <li>Writing: 2 essays</li>
            <li>Time limited</li>
          </ul>
        </div>

        <div className="info_section">
          <h3>Instructions:</h3>
          <ul>
            <li>Once the test starts, the timer cannot be paused</li>
            <li>You will proceed to the next section after completing each part</li>
            <li>Your answers will be saved automatically</li>
            <li>You can finish the test before the time limit</li>
          </ul>
        </div>

        <div className="warning">
          <p><strong>Warning:</strong> The timer will start immediately after clicking "Start Test" button!</p>
        </div>

        <button className="start_button" onClick={handleStartTest}>
          Start Test
        </button>
      </div>
    </div>
  )
}

export default Start

