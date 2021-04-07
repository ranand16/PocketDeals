export const isDate = (val) => {
    return Object.prototype.toString.call(val) === '[object Date]'
}
  
export const isObj = (val) => {
    return typeof val === 'object'
}
  