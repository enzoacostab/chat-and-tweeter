export const type = (attribute: string) => {
  switch (attribute) {
    case "email": return "email"
    case "phone": return "tel"
    case "password": return "password"
    default: return "text"
  }
}

export const formatNumber = (number: number | undefined) => {
  if (!number) return '0'
  
  if (number >= 1000000) {
    return `${Math.floor(number/1000000)}M`
  }

  if (number >= 1000) {
    return `${Math.floor(number/1000)}K`
  }

  return number.toString()
}