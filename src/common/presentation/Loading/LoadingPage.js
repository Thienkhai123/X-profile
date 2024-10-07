import LoadingView from './LoadingView'

const LoadingPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center fixed bg-white bg-opacity-75 z-[100] left-[calc(0%)] top-[calc(0%)] items-center z-[99999]">
      <LoadingView />
    </div>
  )
}

export default LoadingPage
