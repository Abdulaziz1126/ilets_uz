import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../components/nav/AppContext'
import './register.scss'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUserData, setReadingAnswers, setListeningAnswers } = useAppContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !lastName || !phone || !password) {
      setError('Barcha maydonlarni to‘ldiring')
      return
    }

    setUserData({ firstName, lastName, phone })

  // Clear previous user's answers from context and localStorage so new user starts fresh
  setReadingAnswers({})
  setListeningAnswers(Array(40).fill(''))
  localStorage.removeItem('readingAnswers')
  // Keep 'examData' (admin list) intact, but if you want to clear it uncomment next line
  // localStorage.removeItem('examData')

    if (password === '1111') {
      // After successful user registration, show the Start page
      // User will press "Testni Boshlash" there to go to the Listening section
      navigate('/start')
    } else if (password === '2222') {
      navigate('/admin')
    } else {
      setError('Parol xatolik')
    }
  }

  return (
    <div className="register_container">
      <h2 className="register_title">Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form_group">
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form_group">
          <label>Phone Number:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form_group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="error_message">{error}</div>}
        <button type="submit" className="submit_button">Register</button>
      </form>
    </div>
  )
}

export default Register