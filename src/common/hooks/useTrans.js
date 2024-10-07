import { useRouter } from 'next/router'
import en from '../../i18n/lang/en'
import vi from '../../i18n/lang/vi'

const useTrans = () => {
  const { locale } = useRouter()
  return locale === 'vi' ? vi : en
}

export default useTrans
