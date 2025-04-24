export function formatNumber(num: number | null) {
  if(num === null){
    return null
  }
  return num.toLocaleString();
}
