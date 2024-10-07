import Image from 'next/image'

const EmptyTemplate = (props) => {
  const {} = props
  return (
    <div className="flex flex-col h-[730px]">
      <div className="h-[56px] bg-portfolio-empty border-t-2 border-l-2 border-r-2 border-portfolio-empty w-full rounded-tl-xl rounded-tr-xl" />
      <div className="flex flex-col justify-center items-center flex-1 border-2 border-portfolio-empty rounded-bl-xl rounded-br-xl">
        <Image
          alt="empty-portfolio"
          src="/images/Portfolio/empty-portfolio.svg"
          width={200}
          height={200}
          quality={100}
        />
        <p className="text-p18 text-grey-2 mt-10">
          Hiện hồ sơ chưa có thông tin
        </p>
      </div>
    </div>
  )
}

export default EmptyTemplate
