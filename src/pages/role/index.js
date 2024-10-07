import { ROLE_STORAGE } from 'common/config/app.constants'
import useTrans from 'common/hooks/useTrans'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import Role from 'common/presentation/Pages/Role/Role'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pickCharacter } from 'store/app/homeSlice'
import { selectUserProfile } from 'store/app/userSlice'
import { authService } from 'store/helper/authService'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'

const RolePage = () => {
  const dispatch = useDispatch()
  const [chooseId, setChooseId] = useState()
  const userProfile = useSelector(selectUserProfile)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.HOME.PICKCHARACTER) ||
      selectLoading(state, APP_TYPES.USER.GETPROFILE)
  )
  const trans = useTrans()
  const { ROLE } = trans

  const handleRole = async (roleId, roleHref) => {
    if (roleId !== '') {
      if (userProfile || authService.getAccessToken()) {
        await dispatch(
          pickCharacter({
            characterId: roleId
          })
        )
        window.location.href = roleHref
      } else {
        localStorage.setItem(ROLE_STORAGE, roleId)
        window.location.href = roleHref
      }
    }
  }

  useEffect(() => {
    if (userProfile && userProfile?.setting?.characterId !== null) {
      window.location.replace('/')
    }
  }, [])

  console.log('a')

  return (
    <>
      {loading && <LoadingRole />}

      <div>
        <Head>
          <title>{ROLE?.titleHeader}</title>
        </Head>
        <div>
          <Role
            SETTING_ROLE={ROLE}
            handleRole={handleRole}
            setChooseId={setChooseId}
            chooseId={chooseId}
          />
        </div>
      </div>
    </>
  )
}

export default RolePage
