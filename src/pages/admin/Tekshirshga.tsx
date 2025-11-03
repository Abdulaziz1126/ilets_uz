import { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import './admin.scss'

interface ExamData {
  userData: {
    firstName: string
    lastName: string
    phone: string
  }
  writingData: {
    imageDescription: string
    essayResponse: string
  }
  listeningAnswers: string[]
  readingAnswers: Record<number, string>
  savedAt?: string
}

const Tekshirshga = () => {
  const [allExamData, setAllExamData] = useState<ExamData[]>([])
  const [query, setQuery] = useState('')
  const [sortType, setSortType] = useState<'savedDesc' | 'savedAsc' | 'nameAsc' | 'nameDesc'>('savedDesc')
  const [showSortOptions, setShowSortOptions] = useState(false)

  // localStorage o'zgarishini har doim tekshirish uchun
  useEffect(() => {
    const loadData = () => {
      const data = localStorage.getItem('examData')
      if (data) {
        try {
          const parsed = JSON.parse(data)
          if (Array.isArray(parsed)) {
            setAllExamData(parsed)
          } else {
            setAllExamData([])
          }
        } catch (e) {
          setAllExamData([])
        }
      } else {
        setAllExamData([])
      }
    }
    loadData()
    // storage event faqat boshqa tablarda ishlaydi, shuning uchun location ham dependency
    window.addEventListener('storage', loadData)
    return () => window.removeEventListener('storage', loadData)
  }, [])

  const deleteUserData = (idx: number) => {
    const filtered = allExamData.filter((_, i) => i !== idx)
    setAllExamData(filtered)
    localStorage.setItem('examData', JSON.stringify(filtered))
  }

  // PDF yuklab olish funksiyasi (essay va uzun matnlar uchun splitTextToSize ishlatiladi)
  const handleDownloadPDF = (exam: ExamData) => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    // include saved date/time if present
    const savedAtText = exam.savedAt ? ` — ${new Date(exam.savedAt).toLocaleString()}` : ''
    doc.text('Foydalanuvchi Test Natijalari' + savedAtText, 14, 16)
    doc.setFontSize(12)
    doc.text(`Ism: ${exam.userData.firstName}`, 14, 28)
    doc.text(`Familiya: ${exam.userData.lastName}`, 14, 36)
    doc.text(`Telefon: ${exam.userData.phone}`, 14, 44)

    // Reading javoblari
    doc.setFontSize(13)
    doc.text('📘 Reading Javoblari:', 14, 56)
    doc.setFontSize(11)
    let y = 62
    if (Object.keys(exam.readingAnswers).length) {
      Object.entries(exam.readingAnswers).forEach(([qid, answer]) => {
        doc.text(`Q${qid}: ${answer}`, 18, y)
        y += 7
        if (y > 270) {
          doc.addPage()
          y = 20
        }
      })
    } else {
      doc.text('Reading javoblari yo‘q', 18, y)
      y += 7
    }

    // Writing
    doc.setFontSize(13)
    if (y > 260) {
      doc.addPage()
      y = 20
    }
    doc.text('📝 Writing:', 14, y + 4)
    doc.setFontSize(11)
    doc.text(`Description: ${exam.writingData.imageDescription || 'yo‘q'}`, 18, y + 11)
    y = y + 18

    // Essay uchun splitTextToSize ishlatamiz
    const essayText = exam.writingData.essayResponse || 'yo‘q'
    const essayLines = doc.splitTextToSize(`Essay: ${essayText}`, 170)
    essayLines.forEach((line: string) => {
      doc.text(line, 18, y)
      y += 7
      if (y > 270) {
        doc.addPage()
        y = 20
      }
    })
    y += 10

    // Listening javoblari
    doc.setFontSize(13)
    if (y > 260) {
      doc.addPage()
      y = 20
    }
    doc.text('🎧 Listening Javoblari:', 14, y)
    doc.setFontSize(11)
    y += 6
    if (exam.listeningAnswers && exam.listeningAnswers.length) {
      exam.listeningAnswers.forEach((ans, i) => {
        doc.text(`Q${i + 1}: ${ans || 'yo‘q'}`, 18, y)
        y += 6
        if (y > 270) {
          doc.addPage()
          y = 20
        }
      })
    } else {
      doc.text('Listening javoblari yo‘q', 18, y)
    }

    const fileName = `${exam.userData.firstName}_${exam.userData.lastName}_${exam.userData.phone}.pdf`
    doc.save(fileName)
  }

  // apply search filter
  const filtered = allExamData.filter((exam) => {
    if (!query) return true
    const q = query.toLowerCase()
    const fullName = `${exam.userData.firstName} ${exam.userData.lastName}`.toLowerCase()
    return fullName.includes(q) || exam.userData.phone.includes(q)
  })

  // apply sort according to selected sortType
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === 'savedDesc' || sortType === 'savedAsc') {
      const ta = a.savedAt ? new Date(a.savedAt).getTime() : 0
      const tb = b.savedAt ? new Date(b.savedAt).getTime() : 0
      return sortType === 'savedDesc' ? tb - ta : ta - tb
    }
    // name sort
    const nameA = `${a.userData.firstName} ${a.userData.lastName}`.toLowerCase()
    const nameB = `${b.userData.firstName} ${b.userData.lastName}`.toLowerCase()
    if (nameA < nameB) return sortType === 'nameAsc' ? -1 : 1
    if (nameA > nameB) return sortType === 'nameAsc' ? 1 : -1
    return 0
  })

  if (!allExamData.length) {
    return <h3 style={{ textAlign: 'center', marginTop: '40px' }}>Ma’lumot topilmadi</h3>
  }

  return (
    <div className="admin-center-container">
      <h2 className="admin-title">Admin Panel</h2>

      <div className="admin-controls">
        <input
          className="admin-search small"
          placeholder="Qidirish..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="sort-dropdown">
          <button className="admin-sort-btn" onClick={() => setShowSortOptions((s) => !s)}>Sort</button>
          {showSortOptions && (
            <div className="sort-options">
              <div className="sort-option" onClick={() => { setSortType('savedDesc'); setShowSortOptions(false) }}>So‘nggi topshirgan</div>
              <div className="sort-option" onClick={() => { setSortType('savedAsc'); setShowSortOptions(false) }}>Erta topshirgan</div>
              <div className="sort-option" onClick={() => { setSortType('nameAsc'); setShowSortOptions(false) }}>Ism A→Z</div>
              <div className="sort-option" onClick={() => { setSortType('nameDesc'); setShowSortOptions(false) }}>Ism Z→A</div>
            </div>
          )}
        </div>
      </div>

      {sorted.length === 0 ? (
        <h3 className="no-results">Qidiruv bo‘yicha natija topilmadi</h3>
      ) : (
        sorted.map((exam, idx) => (
          <div className="admin-bordered-card" key={idx}>
            <div className="admin-fullcard">
              <div className="admin-card-header">
                <div>
                  <span className="admin-user-icon">👤</span>
                  <span className="admin-user-name">
                    {exam.userData.firstName} {exam.userData.lastName}
                  </span>
                </div>
                <div className="admin-user-meta">
                  <div className="admin-user-phone">📞 {exam.userData.phone}</div>
                  {exam.savedAt && (
                    <div className="admin-saved-at">🕒 {new Date(exam.savedAt).toLocaleString()}</div>
                  )}
                </div>
              </div>

              <div className="admin-content">
                <div className="admin-section">
                  <h4>📘 Reading Javoblari</h4>
                  <ul className="admin-answer-list">
                    {Object.keys(exam.readingAnswers).length ? (
                      Object.entries(exam.readingAnswers).map(([qid, answer]) => (
                        <li key={qid}>
                          <span className="admin-qnum">Q{qid}:</span>
                          <span className="admin-answer">{answer}</span>
                        </li>
                      ))
                    ) : (
                      <li>Reading javoblari yo‘q</li>
                    )}
                  </ul>
                </div>

                <div className="admin-section">
                  <h4>📝 Writing</h4>
                  <div className="admin-writing">
                    <div>
                      <span className="admin-writing-label">Description:</span>
                      <span className="admin-writing-value">{exam.writingData.imageDescription || <i>yo‘q</i>}</span>
                    </div>
                    <div>
                      <span className="admin-writing-label">Essay:</span>
                      <span className="admin-writing-value">{exam.writingData.essayResponse || <i>yo‘q</i>}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-section">
                  <h4>🎧 Listening Javoblari</h4>
                  <ul className="admin-answer-list">
                    {exam.listeningAnswers && exam.listeningAnswers.length ? (
                      exam.listeningAnswers.map((ans, i) => (
                        <li key={i}>
                          <span className="admin-qnum">Q{i + 1}:</span>
                          <span className="admin-answer">{ans || <i>yo‘q</i>}</span>
                        </li>
                      ))
                    ) : (
                      <li>Listening javoblari yo‘q</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="admin-footer">
                <button
                  className="admin-download-btn"
                  onClick={() => handleDownloadPDF(exam)}
                >
                  📄 PDF yuklab olish
                </button>
                <button
                  className="admin-delete-btn"
                  onClick={() => deleteUserData(idx)}
                >
                  🗑️ O'chirish
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Tekshirshga