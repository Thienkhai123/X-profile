import Image from 'next/image'
import { useEffect } from 'react'

const JobRequirementsPositionEditMode = (props) => {
  const { content = '', errors = null, handleResetErrors = () => {} } = props

  const handleChange = (e) => {
    handleResetErrors('Requirement')
  }

  useEffect(() => {
    if (content) {
      const el = document.getElementById('edit-mode-job-description-content')
      el.innerHTML = content
      el.addEventListener('paste', function (e) {
        // cancel paste
        e.preventDefault()

        // get text representation of clipboard
        let text = (e.originalEvent || e).clipboardData.getData('text/plain')
        // insert text manually
        document.execCommand('insertText', false, text)
      })
    }
  }, [content])
  return (
    <div className="flex gap-[11.5rem] w-[1154px] mx-auto mt-[44px] mb-9">
      <div className="flex-1">
        <p className="text-h2 text-neutral ml-6 mt-7">Yêu cầu công việc</p>
        <div className="border border-transparent hover:border-button-2 rounded-lg hover:transition-all mt-6 px-6 pb-6 focus-within:border-button-2">
          <div
            id="edit-mode-job-description-content"
            className="text-area-custom mt-8 text-p1 text-neutral "
            contentEditable="true"
            style={{
              wordBreak: 'break-word'
            }}
            onKeyDown={(e) => handleChange(e)}
          />
        </div>
        <p
          id="Requirement"
          className="text-semantic-red text-p14 text-end h-[22px]"
        >
          {errors?.Requirement && 'Tối đa 500 ký tự'}
        </p>
      </div>
      <div>
        <Image
          alt="job-requirements-avatar"
          // src="/images/job_requirements_avatar.png"
          src="/images/Edit/job_requirements.png"
          width={375}
          height={400}
          quality={100}
        />
      </div>
    </div>
  )
}

export default JobRequirementsPositionEditMode
