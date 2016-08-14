const initState = {
  contents: {},
}

export default function reducer(state=initState, action) {
  const {type, contents} = action
  switch (type) {
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
  }
  return state
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
