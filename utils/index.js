export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 对象深合并
export const assignDeep = (target, ...args) => {
  let i = 0
  if (isPrimitive(target)) target = args[i++]
  if (!target) target = {}
  for (; i < args.length; i++) {
    if (isObject(args[i])) {
      for (const key of Object.keys(args[i])) {
        if (isObject(target[key]) && isObject(args[i][key])) {
          assignDeep(target[key], args[i][key])
        } else {
          target[key] = args[i][key]
        }
      }
      assignSymbols(target, args[i])
    }
  }
  return target
}

const isEnumerable = Object.prototype.propertyIsEnumerable
const getSymbols = Object.getOwnPropertySymbols
export const assignSymbols = (target, ...args) => {
  if (!isObject(target)) {
    throw new TypeError('expected the first argument to be an object')
  }

  if (
    args.length === 0 ||
    typeof Symbol !== 'function' ||
    typeof getSymbols !== 'function'
  ) {
    return target
  }

  for (let arg of args) {
    let names = getSymbols(arg)

    for (let key of names) {
      if (isEnumerable.call(arg, key)) {
        target[key] = arg[key]
      }
    }
  }
  return target
}

export function isObject (val) {
  return (
    typeof val === 'function' ||
    Object.prototype.toString.call(val) === '[object Object]' ||
    Array.isArray(val)
  )
}

export function isPrimitive (val) {
  return typeof val === 'object' ? val === null : typeof val !== 'function'
}
