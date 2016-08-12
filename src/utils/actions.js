export function errorReducerFactory(name) {
  return (err) => {
    if (typeof err === 'object') {
      console.error(err)
    }
    if (!err) {
      err = undefined
    }
    return {
      type: `@@${name}@Error`,
      error: err,
    }
  }
}
