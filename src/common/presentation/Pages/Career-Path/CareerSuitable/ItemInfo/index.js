import Image from 'next/image'

const ItemInfo = ({ avatar = '', title = '', shortDescription = '' }) => {
  return (
    <div className="w-full">
      <div className="w-[120px] h-[120px] mx-auto relative mb-2 lg:mb-[52px]">
        <Image alt="" src={avatar} layout="fill" quality={100} />
      </div>
      <p className="text-blue-light sm:text-p20-bold text-p16-bold text-center  mb-1 lg:mb-3">
        {title}
      </p>
      <p className="sm:text-p18 text-p14 leading-[26px] text-grey-1 text-justify px-8 lg:px-0 ">
        {shortDescription}
      </p>
    </div>
  )
}

export default ItemInfo
