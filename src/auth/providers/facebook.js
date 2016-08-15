import firebase from 'firebase'

const provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('user_friends public_profile email')
export default provider
