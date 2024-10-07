import { SimpleCard } from 'common/presentation/Card/Simple'
import Head from 'next/head'
import Image from 'next/image'
const WELCOMECONTENT = require('../../../public/asset/welcome.json')

const WelcomePage = () => {
  return (
    <div>
      <Head>
        <title>Chào mừng</title>
      </Head>

      <div className="max-w-[852px] pt-[62px] mx-auto">
        <h2 className="text-p36-bold text-black text-center">
          {WELCOMECONTENT.title}
        </h2>
        <p className="text-center mt-[14px] text-p18 text-grey-1">
          {WELCOMECONTENT.description}
        </p>
        <div className="grid grid-cols-2 gap-[32px] mt-[32px]">
          <SimpleCard
            title={WELCOMECONTENT.cards[0].title}
            description={WELCOMECONTENT.cards[0].description}
            buttonTitle={WELCOMECONTENT.cards[0].button}
          />
          <SimpleCard
            title={WELCOMECONTENT.cards[1].title}
            description={WELCOMECONTENT.cards[1].description}
            buttonTitle={WELCOMECONTENT.cards[1].button}
            buttonStyle="text-white rounded-[8px] bg-black py-[10px] px-[20px] mt-[20px] mx-auto font-bold"
          />
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
