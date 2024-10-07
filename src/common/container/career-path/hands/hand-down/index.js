import Image from 'next/image'

export const HandDown = () => {
  return (
    <div id="hand-down-crp" className="hidden absolute z-30">
      <Image
        alt="hand-down"
        src="/images/career_path/hand-down.png"
        width={120}
        height={120}
        quality={100}
      />
    </div>
  )
}
