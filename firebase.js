/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import localforage from 'localforage'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { getAllNotification } from 'store/app/notification'
import { store } from 'store/index'
import { toast } from 'react-toastify'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import XProfileIcon from 'common/presentation/Icons'

const firebaseConfig = {
  apiKey: 'AIzaSyCtiWAjBmtHhZGek5d1_w5gvnxzLAtWX9o',
  authDomain: 'authenticate.xprofile.vn',
  projectId: 'xprofile-e6159',
  storageBucket: 'xprofile-e6159.appspot.com',
  messagingSenderId: '819920222943',
  appId: '1:819920222943:web:50518951c4689bed21876a',
  measurementId: 'G-5VXWVYPB55'
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const db = getFirestore();

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    const token = await localforage.getItem('fcm_token')
    // console.log('fcm_token tokenInlocalforage', token)
    return token
  },
  onMessageListener: async () => {
    const messaging = getMessaging()
    onMessage(messaging, (payload) => {
      // console.log('Message received. ', payload)
      store.dispatch(getAllNotification({ page: 1 }))
      toast(
        <div className="flex gap-2 bg-white border-grey-4 p-2">
          <div>
            <XProfileIcon name={'bell'} />
          </div>
          <div className="flex-1">
            <p className="text-p14 font-bold text-black">
              {payload?.data?.title}
            </p>
            <p className="text-p14 text-black line-clamp-5">
              {payload?.data?.body}
            </p>
          </div>
        </div>,
        {
          toastId: 'alert-save-success',
          className: 'bg-white  rounded-2xl',
          position: 'bottom-left',
          hideProgressBar: true,
          autoClose: 10000
        }
      )
      // alert('Notificacion')
    })
  },

  init: async function () {
    try {
      if ((await this.tokenInlocalforage()) !== null) {
        // console.log('it already exists')
        return false
      }
      // console.log('it is creating it.')
      const messaging = getMessaging(app)
      await Notification.requestPermission()
      getToken(messaging, {
        vapidKey:
          'BDTziAri4h0v7V1tlru1XeF9YwbF-Kme70YFyMl5YkOm1W1Wkk9m6IE8EhMmjj571LxRgTewWR3vhUVQ4I9cirM'
      })
        .then((currentToken) => {
          // console.log('current Token', currentToken)
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // save the token in your database
            localforage.setItem('fcm_token', currentToken)
            // console.log('fcm_token', currentToken)
          } else {
            // Show permission request UI
            console.log(
              'NOTIFICACION, No registration token available. Request permission to generate one.'
            )
            // ...
          }
        })
        .catch((err) => {
          console.log('NOTIFICACIONAn error occurred while retrieving token . ')
          console.log(err)
        })
    } catch (error) {
      console.error(error)
    }
  }
}

export { firebaseCloudMessaging }
