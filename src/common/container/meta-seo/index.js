import Head from 'next/head'

const MetaSeo = ({
  title = 'XProfile',
  titleContent = 'X-Profile - Giải pháp toàn diện về tuyển dụng và đào tạo',
  descContent = 'Giải pháp xây dựng thương hiệu tuyển dụng uy tín cho doanh nghiệp, tạo hồ sơ năng lực chất lượng cho ứng viên, kết hợp với đào tạo kiến thức thực tiễn áp dụng vào công việc, giúp tiết kiệm thời gian và tăng hiệu quả hoạt động đào tạo nhân sự.',
  imageContent = 'https://he44r2a3tgobj.vcdn.cloud/p/Website/Thumbnail.png',
  urlContent = 'https://xprofile.vn',
  type = 'website'
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* -- Primary Meta Tags -- */}
        <meta name="title" content={titleContent} key="title" />
        <meta name="description" content={descContent} />
        <meta property="og:image:alt" content="X-Profile" />
        <meta property="og:image" content={imageContent} key={'og-image'} />
        <meta httpEquiv="Content-Language" content="vi" />
        <meta name="Language" content="vi" />
        <meta name="copyright" content="Bản quyền thuộc về XProfile" />
        <meta name="abstract" content="XProfile" />
        <meta name="distribution" content="Global" />
        <meta name="author" content="XProfile" />
        <meta name="REVISIT-AFTER" content="1 DAYS" />
        <meta name="RATING" content="GENERAL" />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="vi_VN" />
        <meta name="google" content="nositelinkssearchbox" />

        {/* -- Open Graph / Facebook -- */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={urlContent} key={`fb-url`} />
        <meta property="og:title" content={titleContent} key="og-title" />
        <meta property="og:description" content={descContent} />
        <meta property="fb:app_id" content="1521890671673581" />

        {/* -- Twitter -- */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={urlContent} />
        <meta
          property="twitter:title"
          content={titleContent}
          key="twitter-title"
        />
        <meta property="twitter:description" content={descContent} />
        <meta
          property="twitter:image"
          content={imageContent}
          key={'twitter-og-image'}
        />
      </Head>
    </>
  )
}

export default MetaSeo
