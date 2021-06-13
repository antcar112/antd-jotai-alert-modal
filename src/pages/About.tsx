import React, { useEffect, useState } from 'react'
import { useAlert } from '../useAlert'

const shouldShow = (chance: number = 50): boolean => {
  const chancePercent = chance / 100
  return Math.random() < chancePercent
}

export const About = () => {
  const { show } = useAlert()
  const { show: show2 } = useAlert()
  const { show: show3 } = useAlert()
  const { show: show4 } = useAlert()
  const [passes, setPasses] = useState<string[]>([])

  const resetState = () => {
    setPasses([])
  }

  const runRandomModals = () => {
    resetState()
    if (shouldShow()) {
      show({ content: 'showing first modal', onOk: resetState })
      setPasses((prev) => [...prev, 'One'])
    }
    if (shouldShow()) {
      show2({ content: 'showing second modal', onOk: resetState })
      setPasses((prev) => [...prev, 'Two'])
    }
    if (shouldShow(25)) {
      show3({ content: 'showing third modal', onOk: resetState })
      setPasses((prev) => [...prev, 'Three'])
    }
    if (shouldShow(100)) {
      show4({ content: 'showing fourth modal', onOk: resetState })
      setPasses((prev) => [...prev, 'Four'])
    }
  }

  useEffect(() => {
    runRandomModals()
  }, [])

  return (
    <div className='container'>
      <h2>About</h2>
      <ul>
        {passes.map((pass) => (
          <li key={pass}>{pass}</li>
        ))}
      </ul>
      <button onClick={runRandomModals}>Go again</button>
    </div>
  )
}
