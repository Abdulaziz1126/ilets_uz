import { useAppContext } from '../../components/nav/AppContext'
import timeIcon from '../../assets/images/time.png'
import './nav.scss'
import { NavLink } from 'react-router-dom'

const formatTime = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

const Nav = () => {
  const { timeLeft } = useAppContext()

  // Turn red and start blinking in the last 3 minutes
  const isRed = timeLeft <= 3 * 60
  const isBlink = timeLeft <= 3 * 60

  return (
    <div className="nav">
      <div className="container">
        <div className="nav_box">
          <NavLink to="" className="nav_logo">ielts centr</NavLink>

          <div className={`nav_box_timer ${isRed ? 'timer_red' : ''} ${isBlink ? 'timer_blink' : ''}`}>
            <img src={timeIcon} alt="timer icon" className="nav_box_timer_img" />
            <div className="nav_box_timer_number">{formatTime(timeLeft)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav