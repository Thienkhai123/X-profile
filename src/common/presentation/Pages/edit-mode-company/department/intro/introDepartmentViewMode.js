import Image from 'next/image'
import IntroDepartmentFunFactViewMode from './introDepartmentFunFactViewMode'

const IntroDepartmentViewMode = ({
  avatarUrl = '/images/uploadAvatarEdit.png',
  description = '',
  funfacts = []
}) => {
  return (
    <div className="xl:w-[1140px] w-full mx-auto md:flex gap-5">
      <div className="flex gap-8 md:w-1/2 w-full md:mb-0 mb-4">
        {/* <div className="w-[160px] h-[160px] rounded-full overflow-hidden">
          <Image
            src={avatarUrl || '/images/uploadAvatarEdit.png'}
            height={160}
            width={160}
            objectFit="contain"
            alt=""
            quality={100}
            className="rounded-full"
          />
        </div> */}

        <div className="pt-[52px]">
          <p className="text-h2 text-neutral mb-5">Đôi nét về Team</p>
          <pre
            className="text-p18 text-grey-1 whitespace-pre-wrap"
            style={{
              wordBreak: 'break-word'
            }}
          >
            {description}
          </pre>
        </div>
      </div>
      <IntroDepartmentFunFactViewMode funfacts={funfacts} />
    </div>
  )
}

export default IntroDepartmentViewMode
