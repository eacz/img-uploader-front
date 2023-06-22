export interface File {
  lastModifiedDate: Date
  path: string
  size: number
  type: 'image/png' | 'image/jpeg' | 'image/jpg'
  name: string
  lastModified: number
  webkitRelativePath: string
}
