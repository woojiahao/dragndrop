import type { Folder } from './folder'

export type File = {
  id: number
  fileName: string
  folder?: Folder
}
