// Writing.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/nav/Nav'
import './writing.scss'
import writing from '../../assets/images/writing.jpg'
import { useAppContext } from '../../components/nav/AppContext'

const Writing = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [textPage1, setTextPage1] = useState('')
  const [textPage2, setTextPage2] = useState('')

  const navigate = useNavigate()
  const {
    setWritingData,
    userData,
    readingAnswers,
    listeningAnswers,
    startTimer,
  } = useAppContext()

  const wordCountPage1 = textPage1.trim() === '' ? 0 : textPage1.trim().split(/\s+/).length
  const wordCountPage2 = textPage2.trim() === '' ? 0 : textPage2.trim().split(/\s+/).length

  const handleNext = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  useEffect(() => {
    setWritingData({
      imageDescription: textPage1,
      essayResponse: textPage2,
    })
  }, [textPage1, textPage2, setWritingData])

  useEffect(() => {
    if (userData && userData.phone) startTimer(60 * 60)
  }, [userData, startTimer])

  const handleFinish = () => {
    const botToken = '8397720262:AAGBSEikSIJEBWztCgSVj4mDsy2juo2o4l0'
    const chatId = '-1002626480864'
    const savedAt = new Date().toISOString()

    const message = `
📝 *Yangi test topshirildi!*

👤 ${userData.firstName} ${userData.lastName}
📞 ${userData.phone}
🕒 ${new Date(savedAt).toLocaleString()}

📚 *Reading:*
${Object.entries(readingAnswers)
        .map(([q, a]) => `Q${q}: ${a}`)
        .join('\n') || 'Javoblar yo‘q'}

✍️ *Writing:*
- Description: ${textPage1 || 'Yo‘q'}
- Essay: ${textPage2 || 'Yo‘q'}

🎧 *Listening:*
${(listeningAnswers || [])
        .map((ans, idx) => `Q${idx + 1}: ${ans || '–'}`)
        .join('\n') || 'Javoblar yo‘q'}
`

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })
      .then(res => res.json())
      .then(() => {
        // Optional: console.log('Yuborildi')
      })
      .catch(() => {
        // Optional: console.error('Xatolik')
      })

    navigate('/')
  }

  return (
    <>
      <Nav />
      <div className="writing">
        <div className="container">
          <div className="writing_box">
            <div className="writing_box_title">
              <h2 className='writing_box_title_1'>Writing Test</h2>
              {currentPage === 1 ? (
                <h4 className='writing_box_title_2'>
                  Describe the image shown below in detail. Write at least 150 words.
                </h4>
              ) : (
                <h4 className='writing_box_title_2'>
                  Essay Topic:<br />
                  <em>Discuss the impact of technology on modern education.</em><br />
                  Write at least 200 words.
                </h4>
              )}
            </div>

            <div className="task-instructions">
              {currentPage === 1 ? (
                <div className="task1-instructions">
                  <h3>Instructions:</h3>
                  <p>Describe what you see in the image above. Include details about:</p>
                  <ul>
                    <li>• The main subject and setting</li>
                    <li>• Colors, lighting, and atmosphere</li>
                    <li>• Any activities or actions taking place</li>
                    <li>• Your overall impression</li>
                  </ul>
                  <p className="time-note">You should spend about 20 minutes on this task.</p>
                </div>
              ) : (
                <div className="task2-instructions">
                  <div className="task2-header">
                    <h3>TASK 2</h3>
                    <p className="time-note">You should spend about 40 minutes on this task.</p>
                  </div>
                  <div className="task2-topic">
                    <p>Access to clean water is a basic human right. Therefore every home should have a water supply that is provided free of charge.</p>
                    <p className="question">Do you agree or disagree?</p>
                  </div>
                  <p className="task2-note">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                  <p className="word-requirement">Write at least 250 words.</p>
                </div>
              )}
            </div>

            <div className="writing_box_form">
              {currentPage === 1 ? (
                <>
                  <div className="writing_box_form_img">
                    <img src={writing} alt="Writing Task" />
                  </div>
                  <div className="writing_box_form_input">
                    <h3>Your Response</h3>
                    <textarea
                      placeholder="Start describing the image..."
                      value={textPage1}
                      onChange={(e) => setTextPage1(e.target.value)}
                    />
                    <div className="word_count">
                      <div className="minimum_word">Minimum: 150 words</div>
                      <div className="word">Word count: {wordCountPage1}</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="writing_box_form_input essay_page">
                  <h3>Your Essay Response</h3>
                  <textarea
                    placeholder="Start writing your essay on the topic..."
                    value={textPage2}
                    onChange={(e) => setTextPage2(e.target.value)}
                  />
                  <div className="word_count">
                    <div className="minimum_word">Minimum: 250 words</div>
                    <div className="word">Word count: {wordCountPage2}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="pagination_buttons">
              {currentPage > 1 && (
                <button className="prev_button" onClick={handlePrev}>Back to Task 1</button>
              )}
              {currentPage < 2 && (
                <button className="next_button" onClick={handleNext}>Task 2</button>
              )}
            </div>

            {currentPage >= 2 && (
              <div className="finish_btn_wrapper">
                <button className="finish_btn" onClick={handleFinish}>Finish Test</button>
              </div>

            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Writing
