import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectRoleIdUser } from 'store/app/userSlice'

const MyJourneySideBanner = (props) => {
  const {
    title = 'Làm các bài kiểm tra trắc nghiệm để hiểu thêm về ngành nghề phù hợp với bạn!',
    listSuggest = []
  } = props
  const roleId = useSelector(selectRoleIdUser)
  return (
    <div
      className={`w-full flex flex-col  justify-between  min-h-[480px]  ${
        parseInt(roleId) === 0 ? 'bg-[#FAEFEC]' : 'bg-[#FDF5E4]'
      } rounded-3xl`}
    >
      <div className="pt-8 px-4 ">
        <p
          className={`text-p18-bold text-center ${
            parseInt(roleId) === 0 ? 'text-pink-dark' : 'text-yellow-dark'
          }`}
        >
          {title}
        </p>
        {listSuggest?.length > 0 && (
          <div className="min-h-[96px] w-full mt-6 mb-7 flex items-center flex-wrap gap-2">
            {listSuggest?.map((suggest, index) => {
              const { name, href, id } = suggest
              return (
                <div
                  key={index}
                  className="group relative px-4 py-2 rounded-xl bg-white hover:bg-[#F5F6F7] transition-all min-w-fit cursor-pointer"
                >
                  <p style={{ wordBreak: 'break-word' }} className="text-p16">
                    {name}
                  </p>
                  <span
                    className={`absolute hidden group-hover:flex justify-center transition-all right-1/2  translate-x-1/2 -top-3 -translate-y-full w-[237px] px-4 py-[9px] ${
                      parseInt(roleId) === 0
                        ? 'bg-pink-dark after:border-t-pink-dark'
                        : 'bg-button after:border-t-button'
                    } rounded-lg text-center text-white text-p18 after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent z-30`}
                  >
                    Xem công việc phù hợp
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className="h-[240px] w-full relative flex items-end justify-end">
        <Image
          layout="fill"
          src={
            parseInt(roleId) === 0
              ? '/images/CuuSidebarBanner.png'
              : '/images/ChuotSidebarBanner.png'
          }
          objectFit="contain"
          alt=""
          quality={100}
        />
      </div>
    </div>
  )
}

export default MyJourneySideBanner
