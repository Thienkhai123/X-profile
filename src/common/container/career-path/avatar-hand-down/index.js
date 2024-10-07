import Image from 'next/image'

export const AvatarHandDown = () => {
  return (
    <>
      <div
        id="avatar-hand-down-crp"
        className="hidden absolute z-30 h-[146px] "
      >
        <Image
          alt="hand-down"
          src="/images/career_path/avatar-hand-down.png"
          width={125}
          height={146}
          quality={100}
        />
      </div>
      <div
        id="avatar-hand-down-crp-mobile"
        className="hidden absolute z-30 lh-[111px]"
      >
        <Image
          alt="hand-down"
          src="/images/career_path/avatar-hand-down.png"
          width={96}
          height={111}
          quality={100}
        />
      </div>
    </>
  )
}
