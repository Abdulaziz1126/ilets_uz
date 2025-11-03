import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/nav/Nav'
import './listening.scss'
import audio from '../../assets/images/audio.mp3'
import { useAppContext } from '../../components/nav/AppContext'

const questions = [
  "1. The Junction is good for people who are especially keen on [blank].",
  "2. The [blank] at The Junction is a good place for a drink.",
  "3. Paloma serves [blank] food, good for sharing.",
  "4. There is a limited selection of [blank] food on Paloma's menu.",
  "5. The [blank] restaurant is at the top of a [blank].",
  "6. The restaurant at the top has a famous [blank].",
  "7. All the [blank] at the restaurant are very good.",
  "8. The restaurant only uses [blank] ingredients.",
  "9. The set lunch costs £[blank] per person.",
  "10. Portions are probably of [blank] size.",
  "11. Heather says pottery differs from other art forms because",
  "12. Archaeologists sometimes identify the use of ancient pottery from",
  "13. Some people join Heather's pottery class because they want to",
  "14. What does Heather value most about being a potter?",
  "15. Most of the visitors to Edelman Pottery",
  "16. Heather reminds her visitors that they should",
  "17-18. Which TWO things does Heather explain about kilns?",
  "19-20. Which TWO points does Heather make about a potter's tools?",
  "21-22. Which TWO things do the students both believe are responsible for the increase in loneliness?",
  "23-24. Which TWO health risks associated with loneliness do the students agree are based on solid evidence?",
  "25-26. Which TWO opinions do both the students express about the evolutionary theory of loneliness?",
  "27. When comparing loneliness to depression, the students",
  "28. Why do the students decide to start their presentation with an example from their own experience?",
  "29. The students agree that talking to strangers is a good strategy for dealing with loneliness because",
  "30. The students find it difficult to understand why solitude is considered to be",
  "31. pollution from [blank] on the river bank.",
  "32. declared biologically [blank].",
  "33. even a [blank] have been seen.",
  "34. converted to restaurants and [blank].",
  "35. build a riverside [blank].",
  "36. display [blank] projects.",
  "37. [blank] are created on the sides of the river.",
  "38. travel by [blank] in cities.",
  "39. transported by large freight barges and electric [blank].",
  "40. in future, by [blank]."
]

const ITEMS_PER_PAGE = 10

const Listening = () => {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''))
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const { setListeningAnswers, userData, startTimer } = useAppContext()

  useEffect(() => {
    if (userData && userData.phone) {
      startTimer(40 * 60) // 40 minutes
    }
  }, [userData, startTimer])

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = [...answers]
    updatedAnswers[index] = value
    setAnswers(updatedAnswers)
    setListeningAnswers(updatedAnswers)
  }

  const handleMultipleChoiceChange = (index: number, option: string) => {
    const currentAnswers = answers[index] ? answers[index].split(',') : []
    
    if (currentAnswers.includes(option)) {
      // Remove option if already selected
      const newAnswers = currentAnswers.filter(a => a !== option)
      handleChange(index, newAnswers.join(','))
    } else {
      // Add option if not selected (max 2 options)
      if (currentAnswers.length < 2) {
        const newAnswers = [...currentAnswers, option]
        handleChange(index, newAnswers.join(','))
      }
    }
  }

  const handleFinish = () => {
    setListeningAnswers(answers)
    setAnswers(Array(questions.length).fill(''))
    setCurrentPage(1)
    navigate('/home')
  }

  const renderQuestionWithInput = (text: string, index: number) => {
    const parts = text.split('[blank]')
    return (
      <div key={index} className="gap_fill_question">
        <span>{parts[0]}</span>
        <textarea
          className="inline_input"
          placeholder=""
          value={answers[index]}
          onChange={(e) => handleChange(index, e.target.value)}
        />
        <span>{parts[1]}</span>
      </div>
    )
  }

  const renderTablePage = () => {
    const tableAnswers = answers.slice(0, 10)
    
    return (
      <div className="table_page">
        <h3 className="table_instruction">
          Complete the table below.<br />
          Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.
        </h3>
        
        <div className="restaurant_table_container">
          <table className="restaurant_table">
            <thead>
              <tr>
                <th className="table_header">Name of restaurant</th>
                <th className="table_header">Location</th>
                <th className="table_header">Reason for recommendation</th>
                <th className="table_header">Other comments</th>
              </tr>
            </thead>
            <tbody>
              {/* The Junction Row */}
              <tr className="table_row">
                <td className="restaurant_name cell_large">
                  <strong>The Junction</strong>
                </td>
                <td className="cell_large">
                  <div className="location_text">Greyson Street, near the station</div>
                </td>
                <td className="cell_large">
                  <div className="recommendation_text">
                    Good for people who are especially keen on{" "}
                    <div className="input_with_number">
                      <span className="input_number">1</span>
                      <textarea
                        className="table_input"
                        placeholder=""
                        value={tableAnswers[0]}
                        onChange={(e) => handleChange(0, e.target.value)}
                      />
                    </div>
                  </div>
                </td>
                <td className="cell_large">
                  <div className="comments_list">
                    <div className="comment_item">• Quite expensive</div>
                    <div className="comment_item">
                      • The{" "}
                      <div className="input_with_number">
                        <span className="input_number">2</span>
                        <textarea
                          className="table_input"
                          placeholder=""
                          value={tableAnswers[1]}
                          onChange={(e) => handleChange(1, e.target.value)}
                        />
                      </div>{" "}
                      is a good place for a drink
                    </div>
                  </div>
                </td>
              </tr>

              {/* Paloma Row */}
              <tr className="table_row">
                <td className="restaurant_name cell_large">
                  <strong>Paloma</strong>
                </td>
                <td className="cell_large">
                  <div className="location_text">In Bow Street next to the cinema</div>
                </td>
                <td className="cell_large">
                  <div className="recommendation_text">
                    <div className="input_with_number">
                      <span className="input_number">3</span>
                      <textarea
                        className="table_input"
                        placeholder=""
                        value={tableAnswers[2]}
                        onChange={(e) => handleChange(2, e.target.value)}
                      />
                    </div>{" "}
                    food, good for sharing
                  </div>
                </td>
                <td className="cell_large">
                  <div className="comments_list">
                    <div className="comment_item">• Staff are very friendly</div>
                    <div className="comment_item">• Need to pay £50 deposit</div>
                    <div className="comment_item">
                      • A limited selection of{" "}
                      <div className="input_with_number">
                        <span className="input_number">4</span>
                        <textarea
                          className="table_input"
                          placeholder=""
                          value={tableAnswers[3]}
                          onChange={(e) => handleChange(3, e.target.value)}
                        />
                      </div>{" "}
                      food on the menu
                    </div>
                  </div>
                </td>
              </tr>

              {/* The Restaurant Row */}
              <tr className="table_row">
                <td className="restaurant_name cell_large">
                  <div className="restaurant_name_input">
                    The{" "}
                    <div className="input_with_number">
                      <span className="input_number">5</span>
                      <textarea
                        className="table_input"
                        placeholder=""
                        value={tableAnswers[4]}
                        onChange={(e) => handleChange(4, e.target.value)}
                      />
                    </div>
                  </div>
                </td>
                <td className="cell_large">
                  <div className="location_text">
                    At the top of a{" "}
                    <div className="input_with_number">
                      <span className="input_number">6</span>
                      <textarea
                        className="table_input"
                        placeholder=""
                        value={tableAnswers[5]}
                        onChange={(e) => handleChange(5, e.target.value)}
                      />
                    </div>
                  </div>
                </td>
                <td className="cell_large">
                  <div className="recommendation_list">
                    <div className="recommendation_item">
                      • A famous{" "}
                      <div className="input_with_number">
                        <span className="input_number">7</span>
                        <textarea
                          className="table_input"
                          placeholder=""
                          value={tableAnswers[6]}
                          onChange={(e) => handleChange(6, e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="recommendation_item">
                      • All the{" "}
                      <div className="input_with_number">
                        <span className="input_number">8</span>
                        <textarea
                          className="table_input"
                          placeholder=""
                          value={tableAnswers[7]}
                          onChange={(e) => handleChange(7, e.target.value)}
                        />
                      </div>{" "}
                      are very good
                    </div>
                    <div className="recommendation_item">
                      • Only uses{" "}
                      <div className="input_with_number">
                        <span className="input_number">9</span>
                        <textarea
                          className="table_input"
                          placeholder=""
                          value={tableAnswers[8]}
                          onChange={(e) => handleChange(8, e.target.value)}
                        />
                      </div>{" "}
                      ingredients
                    </div>
                  </div>
                </td>
                <td className="cell_large">
                  <div className="comments_list">
                    <div className="comment_item">
                      • Set lunch costs £{" "}
                      <div className="input_with_number">
                        <span className="input_number">10</span>
                        <textarea
                          className="table_input price_input"
                          placeholder=""
                          value={tableAnswers[9]}
                          onChange={(e) => handleChange(9, e.target.value)}
                        />
                      </div>{" "}
                      per person
                    </div>
                    <div className="comment_item">
                      • Portions probably of{" "}
                      <div className="input_with_number">
                        <span className="input_number">11</span>
                        <textarea
                          className="table_input"
                          placeholder=""
                          value={tableAnswers[10]}
                          onChange={(e) => handleChange(10, e.target.value)}
                        />
                      </div>{" "}
                      size
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderQuestions11to20Page = () => {
    const mcAnswers = answers.slice(10, 16)
    const maAnswers17 = answers[16] ? answers[16].split(',') : []
    const maAnswers19 = answers[17] ? answers[17].split(',') : []
    
    return (
      <div className="questions_11_20_page">
        {/* Multiple Choice Section (11-16) */}
        <div className="mc_section">
          <h3 className="mc_instruction">
            Questions 11-16<br />
            Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>.
          </h3>

          <div className="mc_questions">
            {/* Question 11 */}
            <div className="mc_question">
              <div className="mc_question_number">11</div>
              <div className="mc_question_content">
                <p className="mc_question_text">Heather says pottery differs from other art forms because</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q11"
                      value="A"
                      checked={mcAnswers[0] === 'A'}
                      onChange={(e) => handleChange(10, e.target.value)}
                    />
                    <span className="mc_option_text">A. it lasts longer in the ground.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q11"
                      value="B"
                      checked={mcAnswers[0] === 'B'}
                      onChange={(e) => handleChange(10, e.target.value)}
                    />
                    <span className="mc_option_text">B. it is practised by more people.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q11"
                      value="C"
                      checked={mcAnswers[0] === 'C'}
                      onChange={(e) => handleChange(10, e.target.value)}
                    />
                    <span className="mc_option_text">C. it can be repaired more easily.</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Question 12 */}
            <div className="mc_question">
              <div className="mc_question_number">12</div>
              <div className="mc_question_content">
                <p className="mc_question_text">Archaeologists sometimes identify the use of ancient pottery from</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q12"
                      value="A"
                      checked={mcAnswers[1] === 'A'}
                      onChange={(e) => handleChange(11, e.target.value)}
                    />
                    <span className="mc_option_text">A. the clay it was made with.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q12"
                      value="B"
                      checked={mcAnswers[1] === 'B'}
                      onChange={(e) => handleChange(11, e.target.value)}
                    />
                    <span className="mc_option_text">B. the marks that are on it.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q12"
                      value="C"
                      checked={mcAnswers[1] === 'C'}
                      onChange={(e) => handleChange(11, e.target.value)}
                    />
                    <span className="mc_option_text">C. the basic shape of it.</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Question 13 */}
            <div className="mc_question">
              <div className="mc_question_number">13</div>
              <div className="mc_question_content">
                <p className="mc_question_text">Some people join Heather's pottery class because they want to</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q13"
                      value="A"
                      checked={mcAnswers[2] === 'A'}
                      onChange={(e) => handleChange(12, e.target.value)}
                    />
                    <span className="mc_option_text">A. create an item that looks very old.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q13"
                      value="B"
                      checked={mcAnswers[2] === 'B'}
                      onChange={(e) => handleChange(12, e.target.value)}
                    />
                    <span className="mc_option_text">B. find something that they are good at.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q13"
                      value="C"
                      checked={mcAnswers[2] === 'C'}
                      onChange={(e) => handleChange(12, e.target.value)}
                    />
                    <span className="mc_option_text">C. make something that will outlive them.</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Question 14 */}
            <div className="mc_question">
              <div className="mc_question_number">14</div>
              <div className="mc_question_content">
                <p className="mc_question_text">What does Heather value most about being a potter?</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q14"
                      value="A"
                      checked={mcAnswers[3] === 'A'}
                      onChange={(e) => handleChange(13, e.target.value)}
                    />
                    <span className="mc_option_text">A. its calming effect</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q14"
                      value="B"
                      checked={mcAnswers[3] === 'B'}
                      onChange={(e) => handleChange(13, e.target.value)}
                    />
                    <span className="mc_option_text">B. its messy nature</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q14"
                      value="C"
                      checked={mcAnswers[3] === 'C'}
                      onChange={(e) => handleChange(13, e.target.value)}
                    />
                    <span className="mc_option_text">C. its physical benefits</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Question 15 */}
            <div className="mc_question">
              <div className="mc_question_number">15</div>
              <div className="mc_question_content">
                <p className="mc_question_text">Most of the visitors to Edelman Pottery</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q15"
                      value="A"
                      checked={mcAnswers[4] === 'A'}
                      onChange={(e) => handleChange(14, e.target.value)}
                    />
                    <span className="mc_option_text">A. bring friends to join courses.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q15"
                      value="B"
                      checked={mcAnswers[4] === 'B'}
                      onChange={(e) => handleChange(14, e.target.value)}
                    />
                    <span className="mc_option_text">B. have never made a pot before.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q15"
                      value="C"
                      checked={mcAnswers[4] === 'C'}
                      onChange={(e) => handleChange(14, e.target.value)}
                    />
                    <span className="mc_option_text">C. try to learn techniques too quickly.</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Question 16 */}
            <div className="mc_question">
              <div className="mc_question_number">16</div>
              <div className="mc_question_content">
                <p className="mc_question_text">Heather reminds her visitors that they should</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q16"
                      value="A"
                      checked={mcAnswers[5] === 'A'}
                      onChange={(e) => handleChange(15, e.target.value)}
                    />
                    <span className="mc_option_text">A. put on their aprons.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q16"
                      value="B"
                      checked={mcAnswers[5] === 'B'}
                      onChange={(e) => handleChange(15, e.target.value)}
                    />
                    <span className="mc_option_text">B. change their clothes.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q16"
                      value="C"
                      checked={mcAnswers[5] === 'C'}
                      onChange={(e) => handleChange(15, e.target.value)}
                    />
                    <span className="mc_option_text">C. take off their jewellery.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Answer Section (17-20) */}
        <div className="ma_section">
          {/* Questions 17-18 */}
          <div className="ma_question_group">
            <div className="ma_question_header">
              <div className="ma_instruction">
                Questions 17 and 18<br />
                Choose <strong>TWO</strong> letters, <strong>A-E</strong>.
              </div>
            </div>
            
            <div className="ma_question_content">
              <div className="ma_question_text">
                <strong>17-18</strong> Which <strong>TWO</strong> things does Heather explain about kilns?
              </div>
              
              <div className="ma_options">
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                  <label key={option} className="ma_option">
                    <input
                      type="checkbox"
                      checked={maAnswers17.includes(option)}
                      onChange={() => handleMultipleChoiceChange(16, option)}
                    />
                    <span className="ma_option_text">
                      {option === 'A' && 'A. what their function is'}
                      {option === 'B' && 'B. when they were invented'}
                      {option === 'C' && 'C. ways of keeping them safe'}
                      {option === 'D' && 'D. where to put one in your home'}
                      {option === 'E' && 'E. what some people use instead of one'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Questions 19-20 */}
          <div className="ma_question_group">
            <div className="ma_question_header">
              <div className="ma_instruction">
                Questions 19 and 20<br />
                Choose <strong>TWO</strong> letters, <strong>A-E</strong>.
              </div>
            </div>
            
            <div className="ma_question_content">
              <div className="ma_question_text">
                <strong>19-20</strong> Which <strong>TWO</strong> points does Heather make about a potter's tools?
              </div>
              
              <div className="ma_options">
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                  <label key={option} className="ma_option">
                    <input
                      type="checkbox"
                      checked={maAnswers19.includes(option)}
                      onChange={() => handleMultipleChoiceChange(17, option)}
                    />
                    <span className="ma_option_text">
                      {option === 'A' && 'A. Some are hard to hold.'}
                      {option === 'B' && 'B. Some are worth buying.'}
                      {option === 'C' && 'C. Some are essential items.'}
                      {option === 'D' && 'D. Some have memorable names.'}
                      {option === 'E' && 'E. Some are available for use by participants.'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderQuestions21to30Page = () => {
    const maAnswers21 = answers[18] ? answers[18].split(',') : []
    const maAnswers23 = answers[19] ? answers[19].split(',') : []
    const maAnswers25 = answers[20] ? answers[20].split(',') : []
    const mcAnswers27 = answers.slice(21, 25)
    
    return (
      <div className="questions_21_30_page">
        {/* Multiple Answer Section (21-26) */}
        <div className="ma_section">
          {/* Questions 21-22 */}
          <div className="ma_question_group">
            <div className="ma_question_header">
              <div className="ma_instruction">
                Questions 21 and 22<br />
                Choose <strong>TWO</strong> letters, <strong>A-E</strong>.
              </div>
            </div>
            
            <div className="ma_question_content">
              <div className="ma_question_text">
                <strong>21-22</strong> Which <strong>TWO</strong> things do the students both believe are responsible for the increase in loneliness?
              </div>
              
              <div className="ma_options">
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                  <label key={option} className="ma_option">
                    <input
                      type="checkbox"
                      checked={maAnswers21.includes(option)}
                      onChange={() => handleMultipleChoiceChange(18, option)}
                    />
                    <span className="ma_option_text">
                      {option === 'A' && 'A. social media'}
                      {option === 'B' && 'B. smaller nuclear families'}
                      {option === 'C' && 'C. urban design'}
                      {option === 'D' && 'D. longer lifespans'}
                      {option === 'E' && 'E. a mobile workforce'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Questions 23-24 */}
          <div className="ma_question_group">
            <div className="ma_question_header">
              <div className="ma_instruction">
                Questions 23 and 24<br />
                Choose <strong>TWO</strong> letters, <strong>A-E</strong>.
              </div>
            </div>
            
            <div className="ma_question_content">
              <div className="ma_question_text">
                <strong>23-24</strong> Which <strong>TWO</strong> health risks associated with loneliness do the students agree are based on solid evidence?
              </div>
              
              <div className="ma_options">
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                  <label key={option} className="ma_option">
                    <input
                      type="checkbox"
                      checked={maAnswers23.includes(option)}
                      onChange={() => handleMultipleChoiceChange(19, option)}
                    />
                    <span className="ma_option_text">
                      {option === 'A' && 'A. a weakened immune system'}
                      {option === 'B' && 'B. dementia'}
                      {option === 'C' && 'C. cancer'}
                      {option === 'D' && 'D. obesity'}
                      {option === 'E' && 'E. cardiovascular disease'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Questions 25-26 */}
          <div className="ma_question_group">
            <div className="ma_question_header">
              <div className="ma_instruction">
                Questions 25 and 26<br />
                Choose <strong>TWO</strong> letters, <strong>A-E</strong>.
              </div>
            </div>
            
            <div className="ma_question_content">
              <div className="ma_question_text">
                <strong>25-26</strong> Which <strong>TWO</strong> opinions do both the students express about the evolutionary theory of loneliness?
              </div>
              
              <div className="ma_options">
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                  <label key={option} className="ma_option">
                    <input
                      type="checkbox"
                      checked={maAnswers25.includes(option)}
                      onChange={() => handleMultipleChoiceChange(20, option)}
                    />
                    <span className="ma_option_text">
                      {option === 'A' && 'A. It has little practical relevance.'}
                      {option === 'B' && 'B. It needs further investigation.'}
                      {option === 'C' && 'C. It is misleading.'}
                      {option === 'D' && 'D. It should be more widely accepted.'}
                      {option === 'E' && 'E. It is difficult to understand.'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Choice Section (27-30) */}
        <div className="mc_section">
          <h3 className="mc_instruction">
            Questions 27-30<br />
            Choose the correct letter, <strong>A</strong>, <strong>B</strong> or <strong>C</strong>.
          </h3>

          <div className="mc_questions">
            {/* Question 27 */}
            <div className="mc_question">
              <div className="mc_question_number">27</div>
              <div className="mc_question_content">
                <p className="mc_question_text">When comparing loneliness to depression, the students</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q27"
                      value="A"
                      checked={mcAnswers27[0] === 'A'}
                      onChange={(e) => handleChange(21, e.target.value)}
                    />
                    <span className="mc_option_text">A. doubt that there will ever be a medical cure for loneliness.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q27"
                      value="B"
                      checked={mcAnswers27[0] === 'B'}
                      onChange={(e) => handleChange(21, e.target.value)}
                    />
                    <span className="mc_option_text">B. claim that the link between loneliness and mental health is overstated.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q27"
                      value="C"
                      checked={mcAnswers27[0] === 'C'}
                      onChange={(e) => handleChange(21, e.target.value)}
                    />
                    <span className="mc_option_text">C. express frustration that loneliness is not taken more seriously.</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Question 28 */}
            <div className="mc_question">
              <div className="mc_question_number">28</div>
              <div className="mc_question_content">
                <p className="mc_question_text">Why do the students decide to start their presentation with an example from their own experience?</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q28"
                      value="A"
                      checked={mcAnswers27[1] === 'A'}
                      onChange={(e) => handleChange(22, e.target.value)}
                    />
                    <span className="mc_option_text">A. to explain how difficult loneliness can be</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q28"
                      value="B"
                      checked={mcAnswers27[1] === 'B'}
                      onChange={(e) => handleChange(22, e.target.value)}
                    />
                    <span className="mc_option_text">B. to highlight a situation that most students will recognise</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q28"
                      value="C"
                      checked={mcAnswers27[1] === 'C'}
                      onChange={(e) => handleChange(22, e.target.value)}
                    />
                    <span className="mc_option_text">C. to emphasise that feeling lonely is more common for men than women</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Question 29 */}
            <div className="mc_question">
              <div className="mc_question_number">29</div>
              <div className="mc_question_content">
                <p className="mc_question_text">The students agree that talking to strangers is a good strategy for dealing with loneliness because</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q29"
                      value="A"
                      checked={mcAnswers27[2] === 'A'}
                      onChange={(e) => handleChange(23, e.target.value)}
                    />
                    <span className="mc_option_text">A. it creates a sense of belonging.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q29"
                      value="B"
                      checked={mcAnswers27[2] === 'B'}
                      onChange={(e) => handleChange(23, e.target.value)}
                    />
                    <span className="mc_option_text">B. it builds self-confidence.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q29"
                      value="C"
                      checked={mcAnswers27[2] === 'C'}
                      onChange={(e) => handleChange(23, e.target.value)}
                    />
                    <span className="mc_option_text">C. it makes people feel more positive.</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Question 30 */}
            <div className="mc_question">
              <div className="mc_question_number">30</div>
              <div className="mc_question_content">
                <p className="mc_question_text">The students find it difficult to understand why solitude is considered to be</p>
                <div className="mc_options">
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q30"
                      value="A"
                      checked={mcAnswers27[3] === 'A'}
                      onChange={(e) => handleChange(24, e.target.value)}
                    />
                    <span className="mc_option_text">A. similar to loneliness.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q30"
                      value="B"
                      checked={mcAnswers27[3] === 'B'}
                      onChange={(e) => handleChange(24, e.target.value)}
                    />
                    <span className="mc_option_text">B. necessary for mental health.</span>
                  </label>
                  <label className="mc_option">
                    <input
                      type="radio"
                      name="q30"
                      value="C"
                      checked={mcAnswers27[3] === 'C'}
                      onChange={(e) => handleChange(24, e.target.value)}
                    />
                    <span className="mc_option_text">C. an enjoyable experience.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

    const renderQuestions31to40Page = () => {
    const notesAnswers = answers.slice(25, 35)
    
    return (
      <div className="notes_page">
        <h3 className="notes_instruction">
          Complete the notes below.<br />
          Write <strong>ONE WORD ONLY</strong> for each answer.
        </h3>

        <div className="notes_container">
          <div className="notes_title">Reclaiming urban rivers</div>
          
          <div className="notes_section">
            <div className="notes_section_title">Historical background</div>
            <div className="notes_content">
              <div className="notes_item">
                • Nearly all major cities were built on a river.
              </div>
              <div className="notes_item">
                • Rivers were traditionally used by city dwellers for transport, fishing and recreation.
              </div>
              <div className="notes_item">
                • Industrial development and rising populations later led to:
              </div>
              <div className="notes_subitems">
                <div className="notes_subitem">
                  - more sewage from houses being discharged into the river
                </div>
                <div className="notes_subitem">
                  - pollution from{" "}
                  <div className="input_with_number">
                    <span className="input_number">31</span>
                    <textarea
                      className="notes_input"
                      placeholder=""
                      value={notesAnswers[0]}
                      onChange={(e) => handleChange(25, e.target.value)}
                    />
                  </div>{" "}
                  on the river bank.
                </div>
              </div>
              <div className="notes_item">
                • In 1957, the River Thames in London was declared biologically{" "}
                <div className="input_with_number">
                  <span className="input_number">32</span>
                  <textarea
                    className="notes_input"
                    placeholder=""
                    value={notesAnswers[1]}
                    onChange={(e) => handleChange(26, e.target.value)}
                  />
                </div>.
              </div>
            </div>
          </div>

          <div className="notes_section">
            <div className="notes_section_title">Recent improvements</div>
            <div className="notes_content">
              <div className="notes_item">
                • Seals and even a{" "}
                <div className="input_with_number">
                  <span className="input_number">33</span>
                  <textarea
                    className="notes_input"
                    placeholder=""
                    value={notesAnswers[2]}
                    onChange={(e) => handleChange(27, e.target.value)}
                  />
                </div>{" "}
                have been seen in the River Thames.
              </div>
              <div className="notes_item">
                • Riverside warehouses are converted to restaurants and{" "}
                <div className="input_with_number">
                  <span className="input_number">34</span>
                  <textarea
                    className="notes_input"
                    placeholder=""
                    value={notesAnswers[3]}
                    onChange={(e) => handleChange(28, e.target.value)}
                  />
                </div>.
              </div>
              <div className="notes_item">
                • In Los Angeles, there are plans to:
              </div>
              <div className="notes_subitems">
                <div className="notes_subitem">
                  - build a riverside{" "}
                  <div className="input_with_number">
                    <span className="input_number">35</span>
                    <textarea
                      className="notes_input"
                      placeholder=""
                      value={notesAnswers[4]}
                      onChange={(e) => handleChange(29, e.target.value)}
                    />
                  </div>
                </div>
                <div className="notes_subitem">
                  - display{" "}
                  <div className="input_with_number">
                    <span className="input_number">36</span>
                    <textarea
                      className="notes_input"
                      placeholder=""
                      value={notesAnswers[5]}
                      onChange={(e) => handleChange(30, e.target.value)}
                    />
                  </div>{" "}
                  projects.
                </div>
              </div>
              <div className="notes_item">
                • In Paris,{" "}
                <div className="input_with_number">
                  <span className="input_number">37</span>
                  <textarea
                    className="notes_input"
                    placeholder=""
                    value={notesAnswers[6]}
                    onChange={(e) => handleChange(31, e.target.value)}
                  />
                </div>{" "}
                are created on the sides of the river every summer.
              </div>
            </div>
          </div>

          <div className="notes_section">
            <div className="notes_section_title">Transport possibilities</div>
            <div className="notes_content">
              <div className="notes_item">
                • Over 2 billion passengers already travel by{" "}
                <div className="input_with_number">
                  <span className="input_number">38</span>
                  <textarea
                    className="notes_input"
                    placeholder=""
                    value={notesAnswers[7]}
                    onChange={(e) => handleChange(32, e.target.value)}
                  />
                </div>{" "}
                in cities round the world.
              </div>
              <div className="notes_item">
                • Changes in shopping habits mean the number of deliveries that are made is increasing.
              </div>
              <div className="notes_item">
                • Instead of road transport, goods could be transported by large freight barges and electric{" "}
                <div className="input_with_number">
                  <span className="input_number">39</span>
                  <textarea
                    className="notes_input"
                    placeholder=""
                    value={notesAnswers[8]}
                    onChange={(e) => handleChange(33, e.target.value)}
                  />
                </div>{" "}
                or, in future, by{" "}
                <div className="input_with_number">
                  <span className="input_number">40</span>
                  <textarea
                    className="notes_input"
                    placeholder=""
                    value={notesAnswers[9]}
                    onChange={(e) => handleChange(34, e.target.value)}
                  />
                </div>.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderRegularQuestions = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentQuestions = questions.slice(startIndex, endIndex)

    return (
      <div className="gap_fill_questions">
        {currentQuestions.map((question, i) =>
          renderQuestionWithInput(question, startIndex + i)
        )}
      </div>
    )
  }

  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE)

  return (
    <>
      <Nav />
      <div className="listening">
        <div className="container">
          <div className="listening_box">
            <h2 className="listening_title_1">Listening Test</h2>
            <h3 className='listening_title_2'>Listen to the audio and fill in the blanks below.</h3>

            <audio src={audio} controls className="listening_audio sticky_audio" />

            {currentPage === 1 && renderTablePage()}
            {currentPage === 2 && renderQuestions11to20Page()}
            {currentPage === 3 && renderQuestions21to30Page()}
            {currentPage === 4 && renderQuestions31to40Page()}
            {currentPage >= 5 && renderRegularQuestions()}

            <div className="pagination_controls">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <div
                  key={i}
                  className={`page_number ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </div>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>

            <div className="finish_test">
              <button className="finish_btn" onClick={handleFinish}>Go to reading page</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Listening