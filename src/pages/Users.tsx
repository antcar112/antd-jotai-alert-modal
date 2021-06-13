import React, { useEffect } from 'react'
import { useFetchOne, useFetchTwo } from '../useFetch'

export const Users = () => {
  const { getOne } = useFetchOne()
  const { getTwo } = useFetchTwo()

  useEffect(() => {
    getOne()
    getTwo()
  }, [])

  return (
    <div className='container'>
      <h2>Users</h2>
    </div>
  )
}
