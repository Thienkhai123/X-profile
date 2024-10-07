import Image from 'next/image'

export const HandUp = () => {
  return (
    <div id="hand-up-crp" className="hidden absolute z-30">
      <Image
        alt="hand-up"
        src="/images/career_path/hand-up.png"
        width={120}
        height={120}
        quality={100}
      />
    </div>
  )
}
