import Promise from 'bluebird'
import { pick, pickBy } from 'lodash'
import firebase from 'firebase'
import { PromiseAction } from 'store/promise-action'

const initState = {
  contents: {},
}

export default function reducer(state=initState, action) {
  const {type, object, contents, result, error} = action
  switch (type) {
    case '@@Post/setDraftProperty':
      return {
        ...state,
        ...object,
      }
    case '@@Post/setDraftInfo':
      return {
        ...state,
        contents: {
          ...state.contents,
          ...contents,
        },
      }
    case '@@Post/clearDraftInfo':
      return {
        ...state,
        contents: {},
      }
    case '@@Post/findPosition':
      return {
        ...state,
        gpsFinding: true,
      }
    case '@@Post/findPosition@then':
      if (state.gpsFinding)
        return {
          ...state,
          contents: {
            ...state.contents,
            gps: {
              lon: result.coords.longitude,
              lat: result.coords.latitude,
            }
          },
        }
      break
    case '@@Post/findPositionName@then':
      if (state.gpsFinding)
        return {
          ...state,
          contents: {
            ...state.contents,
            gps: {
              ...state.contents.gps,
              name: result,
            }
          },
        }
      break
    case '@@Post/submit@then':
      return {
        ...state,
        gpsFinding: false,
        contents: {
          ...state.contents,
          pmId: null,
        },
        alert: {
          type: 'success',
          detail: {message: 'Successfully posted!'},
        },
      }
    case '@@Post/submit@catch':
    case '@@Post/findPosition@catch':
    case '@@Post/findPositionName@catch':
      console.log(error.stack)
      return {
        ...state,
        gpsFinding: false,
        alert: {
          type: 'error',
          detail: error,
        },
      }
  }
  return state
}

export function setDraftProperty(object) {
  return {
    type: '@@Post/setDraftProperty',
    object,
  }
}

export function setDraftInfo(contents) {
  return {
    type: '@@Post/setDraftInfo',
    contents,
  }
}

export function clearDraftInfo(contents) {
  return {
    type: '@@Post/clearDraftInfo',
  }
}

export function submitPost(user, provider, draft) {
  const selectedUser = pick(user, ['displayName', 'photoURL', 'email', 'providerData', 'uid'])
  const postContents = {
    ...selectedUser,
    ...draft,
    provider,
  }
  return new PromiseAction('@@Post/submit', () => {
    return firebase.database().ref('posts/').push(pickBy(postContents, (o) => o != null))
  })
}

export function findPosition() {
  const promiseThunk = () => new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        resolve(position)
      }, (e) => reject(e), {
        timeout: 5000,
        maximumAge: 0,
      })
    } catch(e) {
      reject(e)
    }
  })
  return new PromiseAction('@@Post/findPosition', promiseThunk)
}

export function findPositionName(position) {
  return new PromiseAction('@@Post/findPositionName', async () => {
    const {latitude, longitude} = position.coords
    const url = `https://nominatim.openstreetmap.org/reverse?zoom=18&addressdetails=0&accept-language=en&format=json&lat=${latitude}&lon=${longitude}`
    console.log(url)
    const response = await fetch(url, {
      method: 'GET', 
      headers: new Headers({'Content-Type': 'application/json'}),
    })
    console.log(response)
    if (!response || !response.json)
      return
    const json = await response.json()
    console.log(json)
    if (!json.display_name)
      return
    return json.display_name
  })
}
