import Image from 'next/image'
import { useEffect } from 'react'

const JobRequirementsPositionViewMode = (props) => {
  const { content = '', errors = null, handleResetErrors = () => {} } = props

  useEffect(() => {
    if (content) {
      const el = document.getElementById('view-mode-job-description-content')
      if (el) {
        el.innerHTML = content
      }
    }
  }, [content])

  return (
    <div className="md:flex gap-[8rem] lg:gap-[11.5rem] xl:max-w-[1154px] w-full mx-auto xl:mt-[44px] mb-9">
      <div className="flex-1">
        <p className="xl:text-h2 text-p20-bold text-neutral text-center xl:text-left xl:mt-7">
          Yêu cầu công việc
        </p>
        {content && (
          <div
            id="view-mode-job-description-content"
            className="text-area-custom mt-8  xl:text-p1 text-p16 text-neutral"
            style={{
              wordBreak: ' break-word'
            }}
          ></div>
        )}
      </div>
      <div className="xl:block hidden">
        <Image
          alt="job-requirements-avatar"
          src="/images/Edit/job_requirements.png"
          // src="/images/job_requirements_avatar.png"
          width={400}
          height={390}
          quality={100}
        />
      </div>
    </div>
  )
}

export default JobRequirementsPositionViewMode
