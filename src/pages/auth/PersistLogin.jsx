import { useEffect, useRef, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useRefreshMutation } from './AuthApiSlice'
import { usePersist } from '@/hooks/usePersist'
import { selectCurrentToken } from './AuthSlice'
import { Loading } from '@/components'

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          //const response =
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => (effectRan.current = true)

    // eslint-disable-next-line
    }, [])

  let content
  if (!persist) {
    // persist: no
    console.log('no persist')
    content = <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no
    console.log('loading')
    content = (
      <div className="isLoading">
        <Loading />
      </div>
    )
  } else if (isError) {
    //persist: yes, token: no
    console.log('error')
    content = (
      <div className="persist-login">
        <button type="button" className="persist-button">
          {`${error.data?.message} - `}
          <Link to="/">Fazer login</Link>
        </button>
      </div>
    )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}
export default PersistLogin
