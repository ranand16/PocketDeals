import { isDate, isObj } from "./Validations"

export const stringifyValue = (val) => {
    if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val)
    } else {
        return val
    }
}