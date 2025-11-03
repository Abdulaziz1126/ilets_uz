import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type QuestionType = 'gap_fill' | 'multiple_choice' | 'multiple_answer' | 'table' | 'notes'

type Question = {
  id: string
  text: string
  type: QuestionType
  options?: string[]
  correctAnswer?: string
}

const Qoshishga = () => {
  const [newQuestion, setNewQuestion] = useState<string>('')
  const [questionType, setQuestionType] = useState<QuestionType>('gap_fill')
  const [options, setOptions] = useState<string[]>(['', '', ''])
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('listeningQuestions')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setQuestions(parsed)
        }
      }
    } catch (error) {
      console.error('Savollarni o‘qishda xatolik:', error)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('listeningQuestions', JSON.stringify(questions))
  }, [questions])

  const handleAddOption = () => {
    setOptions(prev => [...prev, ''])
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleRemoveOption = (index: number) => {
    setOptions(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddQuestion = () => {
    const trimmed = newQuestion.trim()

    if (questionType === 'gap_fill' && !trimmed.includes('[blank]')) {
      alert("Gap fill savolida '[blank]' so‘zi bo‘lishi kerak!")
      return
    }

    if ((questionType === 'multiple_choice' || questionType === 'multiple_answer') && options.filter(opt => opt.trim()).length < 2) {
      alert("Kamida 2 ta variant bo‘lishi kerak!")
      return
    }

    const newQ: Question = {
      id: uuidv4(),
      text: trimmed,
      type: questionType,
      options: questionType === 'multiple_choice' || questionType === 'multiple_answer' ? options.filter(opt => opt.trim()) : undefined
    }

    setQuestions(prev => [...prev, newQ])
    setNewQuestion('')
    setOptions(['', '', ''])
  }

  const handleDelete = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const handleClearAll = () => {
    const confirmed = window.confirm('Haqiqatan ham barcha savollarni o‘chirilsinmi?')
    if (confirmed) {
      setQuestions([])
      localStorage.removeItem('listeningQuestions')
    }
  }

  return (
    <div className="qoshishga" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🎧 Listening Savollarni Qo'shish</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Savol turi:
        </label>
        <select 
          value={questionType} 
          onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          style={{ padding: '8px', fontSize: '16px', width: '200px' }}
        >
          <option value="gap_fill">Gap Fill</option>
          <option value="multiple_choice">Multiple Choice</option>
          <option value="multiple_answer">Multiple Answer</option>
          <option value="table">Table</option>
          <option value="notes">Notes</option>
        </select>
      </div>

      <textarea
        rows={3}
        placeholder={
          questionType === 'gap_fill' 
            ? "Savolni yozing. Masalan: [blank] is the key to success."
            : "Savol matnini yozing..."
        }
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '15px' }}
      />

      {(questionType === 'multiple_choice' || questionType === 'multiple_answer') && (
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Variantlar:
          </label>
          {options.map((option, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <input
                type="text"
                placeholder={`Variant ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                style={{ 
                  flex: 1, 
                  padding: '8px', 
                  fontSize: '14px',
                  marginRight: '8px'
                }}
              />
              {options.length > 2 && (
                <button 
                  onClick={() => handleRemoveOption(index)}
                  style={{ 
                    backgroundColor: '#ff4444', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button 
            onClick={handleAddOption}
            style={{ 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + Variant qo'shish
          </button>
        </div>
      )}

      <div style={{ marginTop: '15px' }}>
        <button 
          onClick={handleAddQuestion}
          style={{ 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          ➕ Savol qo'shish
        </button>
        <button
          onClick={handleClearAll}
          style={{ 
            backgroundColor: '#f44336', 
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🗑️ Barchasini o'chirish
        </button>
      </div>

      <h3 style={{ marginTop: '30px' }}>📝 Jami savollar: {questions.length}</h3>

      <div className="question_list">
        {questions.map((q, index) => (
          <div
            key={q.id}
            style={{
              marginBottom: '15px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <strong>{index + 1}. [{q.type}]</strong> {q.text}
              </div>
              <button
                onClick={() => handleDelete(q.id)}
                style={{ 
                  backgroundColor: 'transparent', 
                  color: 'red', 
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ❌
              </button>
            </div>
            {q.options && (
              <div style={{ marginLeft: '20px' }}>
                <strong>Variantlar:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {q.options.map((option, optIndex) => (
                    <li key={optIndex}>{String.fromCharCode(65 + optIndex)}. {option}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Qoshishga