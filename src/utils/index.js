export const roundTo2DecimalPoint = value => Math.round((value + Number.EPSILON) * 100) / 100
export const generateId = () => Math.floor(100000000 + Math.random() * 900000000).toString()