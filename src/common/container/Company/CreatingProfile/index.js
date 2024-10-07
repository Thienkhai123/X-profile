import Button from 'common/presentation/Button'
import Image from 'next/image'

const CreatingProfile = () => {
  return (
    <div className="xl:w-[1140px] absolute -top-[125px]  overflow-hidden flex flex-col-reverse md:flex-row w-full lg:h-[250px] h-auto bg-blue-light mx-auto   py-[24px] md:flex md:justify-between rounded-[20px]">
      <div className="flex flex-col justify-center items-center gap-[24px] md:pl-[88px] px-4 xl:pr-0">
        <p className="xl:text-h3 text-p16-bold text-center text-white max-w-[543px]">
          Tiếp cận với những ứng viên tiềm năng và phù hợp nhất tại X-Profile!
        </p>
        <Button
          title="Tạo hồ sơ công ty"
          width="w-auto"
          rounded="rounded-lg"
          padding="p-[13px_32px]"
          height="h-[48px]"
          onClick={() => {
            window.open(process.env.NEXT_PUBLIC_LMS + 'User/Register')
          }}
        />
      </div>
      <div className="sm:mt-0 mt-[16px]">
        <Image
          alt=""
          placeholder="blur"
          blurDataURL="/images/creating-profile-img.png"
          src="/images/creating-profile-img.png"
          width={517}
          height={233}
          objectFit="contain"
        />
      </div>
    </div>
  )
}

export default CreatingProfile
