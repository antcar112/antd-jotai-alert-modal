import React from 'react'
import { useAlert } from '../useAlert'

export const Home = () => {
  const { show } = useAlert()
  const { show: showOther } = useAlert()

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const handleClick = () => {
    show({ content: 'My homepage modal' })
  }
  const handleOtherClick = () => {
    showOther({
      content: 'My cancel homepage modal',
      onCancel: () => {
        console.log('Cancelled')
      },
    })
  }

  return (
    <div className='container'>
      <h2>Home</h2>
      <button onClick={handleClick}>Show my modal</button>
      <button onClick={handleOtherClick}>Show my cancel modal</button>
    </div>
  )
}
