export const fileToUrl = (file: File) : any => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = (e) => (e.target ? res(e.target.result) : rej(e))
    reader.onerror = (e) => rej(e)
    reader.readAsDataURL(file)
  })
}
