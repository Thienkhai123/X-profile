/** @type {import('tailwindcss').Config} */

const colors = {
  'dark-blue': '#0B2156',
  'blue-main': '#1C3074',
  'blue-light': '#294F9B',
  'blue-2': '#6186CF',
  'blue-boild': '#36479C',
  semantic: '#317AE8',
  'yellow-dark': '#E2A248',
  'yellow-main': '#ECB14E',
  'yellow-careers': '#FDF5E4',
  'yellow-light': '#EDC66E',
  'yellow-paler': '#FFFCF5',
  'yellow-survey': '#FFFBF0',
  'yellow-bg': 'rgba(251, 236, 202, 0.5)',
  'linear-gradient': '#FFB925',
  'pink-dark': '#E29D98',
  'pink-main': '#F5C1B3',
  'pink-light': '#F9D2CA',
  // grey: '#5C708C',
  'grey-1': '#666666',
  'grey-2': '#999999',
  'grey-3': '#CCCCCC',
  'grey-4': '#E6E6E6',
  'grey-5': '#EDF0F2',
  // black: '#020A46',
  'card-title': '#000000',
  'gray-light': '#F3F3F3',
  'nude-1': '#E9E9E1',
  stoke: '#ECEEF0',
  button: '#F6BB3A',
  'semantic-red': '#DB2E24',
  'semantic-green': '#378711',
  'semantic-text-link': '#317AE8',
  nude: '#EDEDE8',
  neutral: '#333333',
  oragin: '#FC811C',
  'background-profile': '#EDEDE8',
  'light-nude': '#F5F5F2',
  'blue-light-opacity': 'rgba(236, 238, 240, 1)',
  'yellow-bg': '#FBECCA',
  'background-capacityProfile': 'rgba(237, 198, 110, 0.11)',
  'alert-success': '#E8F5E9',
  'alert-warning': '#FFF3E0',
  'alert-error': '#FFEBEE',
  'text-alert': '#263238',
  'stroke-skill': 'rgba(41, 80, 156, 0.33)',
  'blue-button': '#29509C',
  'blue-hover': '#D8E8F3',
  'button-2': '#294F9B',
  'pink-light': '#F7E0DB',
  'portfolio-empty': '#F5F6F7',
  'light-blue': '#F5F6F7',
  'crp-fill-yellow': '#FBDC97',
  'blue-new-1': 'rgba(41, 79, 155, 0.87)'
}

const boxShadows = {
  shadow2: '0 15px 20px 0 rgba(0,0,0,0.03)',
  shadow3: '0px 9px 10px rgba(0, 0, 0, 0.23)',
  shadow4: '0px 4px 40px rgba(0, 0, 0, 0.04)',
  blur16: '0px 8px 16px 0px rgba(0, 0, 0, 0.04)',
  blur24: '0px 16px 24px 0px rgba(0, 0, 0, 0.04)',
  card: '0px 16px 24px rgba(0, 0, 0, 0.04)',
  badge: '0px 16px 24px rgba(0, 0, 0, 0.04)',
  toast: '0px 16px 24px 0px rgba(0,0,0,0.04)'
}

const borderRadiuses = {
  default: '20px',
  borderStep: '12px'
}

const backgroundImages = {
  'background-home-sheep': "url('/images/Cuu_Banner.png')",
  'background-home-mouse': "url('/images/Chuot_Banner.png')",
  'background-describeDay': "url('/images/Ellipse.png')",
  'background-dashed':
    'linear-gradient(to right, #CCCCCC 49%, rgba(255,255,255,0) 0%)',
  'background-right-courseCombo':
    'linear-gradient(270deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
  'background-left-courseCombo':
    'linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
  'background-home-overview': "url('/images/background-home-overview.png')",
  'background-propcessbar': "url('/images/PropcessBar.png')",
  'background-worktop': "url('/images/job-background.png')",
  'background-worktop-hover': "url('/images/job-background-hover.png')",
  'background-frame': "url('/images/career-map/cnpm-bg.svg')",
  'background-frame-cs': "url('/images/career-map/cyber-security-bg.svg')",
  'background-frame-border': "url('/images/career-map/career-map-frame.webp')",
  'background-border-dashed': `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23999999' stroke-width='1' stroke-dasharray='10' stroke-dashoffset='25' stroke-linecap='square'/%3e%3c/svg%3e")`,
  'background-info': "url('/images/career_path/bg-info.svg')",
  'background-info-mobile': "url('/images/career_path/bg-info-mobile.svg')"
}
const screens = {
  gird1480: '1480px',
  superSmall: '390px'
}
const fontStyles = {
  p48: [
    '48px',
    {
      lineHeight: '72px',
      fontWeight: '700'
    }
  ],
  h1: [
    '44px',
    {
      lineHeight: '58px',
      fontWeight: '700'
    }
  ],
  h2: [
    '36px',
    {
      lineHeight: '48px',
      fontWeight: '700'
    }
  ],
  h3: [
    '28px',
    {
      lineHeight: '40px',
      fontWeight: '700'
    }
  ],
  h4: [
    '20px',
    {
      lineHeight: '32px',
      fontWeight: '700'
    }
  ],
  h5: [
    '18px',
    {
      lineHeight: '30px',
      fontWeight: '700'
    }
  ],
  h6: [
    '16px',
    {
      lineHeight: '28px',
      fontWeight: '700'
    }
  ],
  p12: [
    '12px',
    {
      lineHeight: '20px',
      fontWeight: '400'
    }
  ],
  'p12-bold': [
    '12px',
    {
      lineHeight: '20px',
      fontWeight: '700'
    }
  ],
  p18: [
    '18px',
    {
      lineHeight: '28px',
      fontWeight: '400'
    }
  ],
  'p18-bold': [
    '18px',
    {
      lineHeight: '28px',
      fontWeight: '700'
    }
  ],
  p14: [
    '14px',
    {
      lineHeight: '22px',
      fontWeight: '400'
    }
  ],
  'p14-bold': [
    '14px',
    {
      lineHeight: '22px',
      fontWeight: '700'
    }
  ],
  'p14-worktop-bold': [
    '14px',
    {
      lineHeight: '26px',
      fontWeight: '700'
    }
  ],
  p16: [
    '16px',
    {
      lineHeight: '24px',
      fontWeight: '400'
    }
  ],
  'p16-line': [
    '16px',
    {
      lineHeight: '30px',
      fontWeight: '400'
    }
  ],
  'p16-bold': [
    '16px',
    {
      lineHeight: '24px',
      fontWeight: '700'
    }
  ],
  p20: [
    '20px',
    {
      lineHeight: '32px',
      fontWeight: '400'
    }
  ],
  p24: [
    '24px',
    {
      lineHeight: '56px',
      fontWeight: '400'
    }
  ],
  'p24-bold': [
    '24px',
    {
      lineHeight: '56px',
      fontWeight: '400'
    }
  ],
  'p20-side-menu-bold': [
    '20px',
    {
      lineHeight: '44px',
      fontWeight: '700'
    }
  ],
  'p20-bold': [
    '20px',
    {
      lineHeight: '32px',
      fontWeight: '700'
    }
  ],
  'p20-worktop-bold': [
    '20px',
    {
      lineHeight: '28px',
      fontWeight: '700'
    }
  ],
  'p28-bold': [
    '28px',
    {
      lineHeight: '40px',
      fontWeight: '700'
    }
  ],
  'p32-bold': [
    '32px',
    {
      lineHeight: '44px',
      fontWeight: '700'
    }
  ],
  'p36-bold': [
    '36px',
    {
      lineHeight: '48px',
      fontWeight: '700'
    }
  ],
  p1: [
    '18px',
    {
      lineHeight: '30px',
      fontWeight: '400'
    }
  ],
  p2: [
    '16px',
    {
      lineHeight: '20px',
      fontWeight: '400'
    }
  ],
  p3: [
    '14px',
    {
      lineHeight: '26px',
      fontWeight: '400'
    }
  ]
}

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/common/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: { ...screens },
      height: {
        available: '--webkit-fill-available',
        '80screen': '80vh'
      },
      keyframes: {
        shake: {
          '5%, 45%': {
            transform: 'translate3d(-1px, 0, 0)'
          },

          '10%, 40%': {
            transform: 'translate3d(1px, 0, 0)'
          },

          '15%, 25%, 35%': {
            transform: 'translate3d(-2px, 0, 0)'
          },

          '20%, 30%': {
            transform: 'translate3d(2px, 0, 0)'
          },
          '100%': {}
        },
        loadingFade: {
          '0%': {
            opacity: 0
          },
          '50%': {
            opacity: 0.8
          },
          '100%': {
            opacity: 0
          }
        },
        fadeIn: {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },
        bottomToTop: {
          '0%': {
            height: 0
          },
          '100%': {
            height: '100vh'
          }
        },
        rightToLeft: {
          '0%': {
            width: '0%'
          },
          '100%': {
            width: '100%'
          }
        },
        grow: {
          '0%': {
            transform: 'scale(0)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        shake: 'shake 3s cubic-bezier(.36,.07,.19,.97) infinite',
        waitReply: 'loadingFade 1s infinite',
        fadeIn: 'fadeIn 0.5s forwards',
        fadeIn10s: 'fadeIn 1s forwards',
        fadeIn2: '0.2s fadeIn 0.5s forwards',
        fadeIn5: '0.5s fadeIn 0.5s forwards',
        fadeIn10: '1s fadeIn 0.5s forwards',
        shakeWarning: 'shake 3s cubic-bezier(.36,.07,.19,.97) 2',
        bottomToTop: 'bottomToTop 1s',
        rightToLeft: 'rightToLeft 1s forwards',
        grow: 'grow 0.5s'
      },
      colors: {
        ...colors
      },
      backgroundImage: {
        ...backgroundImages
      },
      fontSize: {
        ...fontStyles
      },
      borderRadius: {
        ...borderRadiuses
      },
      boxShadow: {
        ...boxShadows
      },
      cursor: {
        careerPath: 'url(/images/cursor.svg), pointer'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
