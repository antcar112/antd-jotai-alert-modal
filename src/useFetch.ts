import { useHistory } from 'react-router'
import { useAlert } from './useAlert'

export const useFetchOne = () => {
  const { show } = useAlert()
  const history = useHistory()

  const getOne = async () => {
    try {
      const res = await fetch('https://swapi.dev/api/peopleEEE/1/')
      const data = await res.json()
      return data
    } catch (err) {
      show({
        content: `Generic Error One`,
        onOk: () => {
          history.push('/')
        },
      })
    }
  }

  return { getOne }
}
function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const useFetchTwo = () => {
  const { forceShow } = useAlert()
  const history = useHistory()

  const getTwo = async () => {
    try {
      await timeout(1500)

      const res = await fetch('https://swapi.dev/api/peopleEE/1/')
      const data = await res.json()
      return data
    } catch (err) {
      forceShow({
        content: `Generic Error Two`,
        onOk: async () => {
          await timeout(1000)
          history.push('/')
        },
      })
    }
  }

  return { getTwo }
}
