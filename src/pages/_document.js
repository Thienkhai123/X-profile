import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="facebook-domain-verification"
          content="cvn1s5qb8l6triofrv1c6e96cfape2"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <Script
          id="script-google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={
            process.env.NEXT_ENV === 'prod' && {
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5FQBFBZ')`
            }
          }
        />
        <Script
          id="script-facebook"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={
            process.env.NEXT_ENV === 'prod' && {
              __html: `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '962603318077545');
          fbq('track', 'PageView')`
            }
          }
        />
        <Script
          async
          src={
            process.env.NEXT_ENV === 'prod' &&
            'https://www.googletagmanager.com/gtag/js?id=G-313CMTV9WE'
          }
        ></Script>
        <Script
          id="script-google-tag-manager-new"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={
            process.env.NEXT_ENV === 'prod' && {
              __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
         
          gtag('config', 'G-313CMTV9WE');`
            }
          }
        />
        <Script
          id="meta-pixels"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={
            process.env.NEXT_ENV === 'prod' && {
              __html: `!function (w, d, t) {          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};          ttq.load('CJNECRBC77UDFRIUN8P0');          ttq.page();        }(window, document, 'ttq');`
            }
          }
        />
        <Script
          id="linkedin_partner_id"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={
            process.env.NEXT_ENV === 'prod' && {
              __html: `_linkedin_partner_id = "5304812";window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];window._linkedin_data_partner_ids.push(_linkedin_partner_id);</script><script type="text/javascript">(function(l) {if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s = document.getElementsByTagName("script")[0];var b = document.createElement("script");b.type = "text/javascript";b.async = true;b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b, s);})(window.lintrk);`
            }
          }
        />
      </Head>
      <body>
        {process.env.NEXT_ENV === 'prod' && (
          <>
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-5FQBFBZ"
                height="0"
                width="0"
                style={{
                  display: 'none',
                  visibility: 'hidden'
                }}
              ></iframe>
              <img
                height="1"
                width="1"
                style={{
                  display: 'none'
                }}
                alt=""
                src="https://px.ads.linkedin.com/collect/?pid=5304812&fmt=gif"
              />
            </noscript>
            <noscript>
              <img
                height="1"
                width="1"
                style={{
                  display: 'none'
                }}
                alt=""
                src="https://www.facebook.com/tr?id=962603318077545&ev=PageView&noscript=1"
              />
            </noscript>
          </>
        )}

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
