import { useState } from 'react'
import ScreenStartExam from './ScreenStartExam'
import ScreenInProgress from './ScreenInProgress'

const ScreenExamination = () => {
  const [screen, setScreen] = useState(1)
  const handleClickStart = () => {
    setScreen(2)
  }
  return (
    <div>
      {screen === 1 && <ScreenStartExam handleClickStart={handleClickStart} />}
      {screen === 2 && <ScreenInProgress />}
    </div>
  )
}

export default ScreenExamination
