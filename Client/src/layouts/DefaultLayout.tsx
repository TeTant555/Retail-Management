import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
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