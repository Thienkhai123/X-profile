import AccountStepMobile from 'common/presentation/AccountStepMobile'
import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MyJourneySideMenu = (props) => {
  const { actionList } = props
  const router = useRouter()
  const handleChoose = () => {}
  return (
    <div>
      <div className="hidden xl:block">
        {actionList.map((action, index) => {
          const { title, id, icon, href } = action

          return (
            <Link key={id} href={href} scroll={false}>
              <div
                className={`${
                  router.pathname.includes(href) && 'bg-[#F5F6F7] text-button-2'
                } flex items-center  gap-4 hover:bg-[#F5F6F7] cursor-pointer px-6 py-4 rounded-3xl mb-3 transition-all`}
              >
                <div>
                  <XProfileIcon
                    name={icon || 'upload'}
                    width="24"
                    height="24"
                    fill={
                      router.pathname.includes(href) ? '#294F9B' : '#000000'
                    }
                  />
                </div>
                <p
                  className={` ${
                    router.pathname.includes(href)
                      ? ' text-button-2 text-p18'
                      : 'text-neutral text-p18 '
                  }`}
                >
                  {title}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="xl:hidden">
        <AccountStepMobile
          style="shadow-none bg-transparent py-6"
          SETTING_STEP={actionList}
          handleChoose={handleChoose}
          styleEleText="text-p14"
          showIcon={false}
          widthEle="fit-content"
          classNameSwiper="!px-6"
        />
      </div>
    </div>
  )
}

export default MyJourneySideMenu
