importScripts('https://www.gstatic.com/firebasejs/9.9.1/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.9.1/firebase-messaging-compat.js'
)
firebase.initializeApp({
  apiKey: 'AIzaSyCtiWAjBmtHhZGek5d1_w5gvnxzLAtWX9o',
  authDomain: 'authenticate.xprofile.vn',
  projectId: 'xprofile-e6159',
  storageBucket: 'xprofile-e6159.appspot.com',
  messagingSenderId: '819920222943',
  appId: '1:819920222943:web:50518951c4689bed21876a',
  measurementId: 'G-5VXWVYPB55'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const messaging = firebase.messaging()
var url = 'https://xprofile.vn/'
messaging.onBackgroundMessage(function (payload) {
  const notificationOptions = {
    body: payload.data.body,
    data: payload.data.url || 'https://xprofile.vn/',
    click_action: payload.data.url || 'https://xprofile.vn/'
  }
  url = payload.data.url

  self.registration.showNotification(payload.data.title, notificationOptions)
})
function handleClick(event) {
  event.notification.close()
  // Open the url you set on notification.data
  clients.openWindow(url || 'https://xprofile.vn/')
}
self.addEventListener('notificationclick', handleClick)
