import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('template-app-token')
    if (!token) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  return (
    <main className='min-h-screen text-txt p-0 bg-container'>
        <Outlet />
    </main>
  )
}

export default DefaultLayout