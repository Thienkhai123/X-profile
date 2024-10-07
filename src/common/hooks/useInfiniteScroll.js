import { useEffect } from 'react'

const useInfiniteScroll = (handleScroll) => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
}

export default useInfiniteScroll
