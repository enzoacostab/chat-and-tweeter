export const type = (attribute: string) => {
  switch (attribute) {
    case "email": return "email"
    case "phone": return "tel"
    case "password": return "password"
    default: return "text"
  }
}

export const formatNumber = (number: number) => {
  if (number >= 1000) {
    return `${Math.floor(number/1000)}k`
  }

  return number.toString()
}