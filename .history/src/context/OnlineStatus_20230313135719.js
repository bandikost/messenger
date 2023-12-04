import { ref, onUnmounted } from 'vue'
import { db } from '../firebase'

export default function useOnlineStatus(uid) {
  const isOnline = ref(false)
  let userStatusRef

  const setUserOnlineStatus = async (status) => {
    if (!userStatusRef) {
      userStatusRef = db.ref(`/status/${uid}`)
      await userStatusRef.onDisconnect().set({ lastOnline: firebase.database.ServerValue.TIMESTAMP, isOnline: false })
    }

    await userStatusRef.set({ isOnline: status, lastOnline: firebase.database.ServerValue.TIMESTAMP })
  }

  const start = () => {
    const userRef = db.ref(`/users/${uid}`)
    const activeRef = db.ref('.info/connected')
    
    activeRef.on('value', (snap) => {
      if (snap.val() === true) {
        userRef.onDisconnect().update({ isOnline: false, lastOnline: firebase.database.ServerValue.TIMESTAMP })
        setUserOnlineStatus(true)
      }
    })
  }

  const stop = () => {
    setUserOnlineStatus(false)
    userStatusRef.off()
    onUnmounted(() => {
      setUserOnlineStatus(false)
      userStatusRef.off()
    })
  }

  return { isOnline, start, stop }
}
