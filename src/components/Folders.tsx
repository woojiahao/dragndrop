import type { Folder } from '../models/folder'
import { FolderRow } from './FolderRow'

export function Folders({
  folders,
  onRelease,
}: {
  folders: Folder[]
  onRelease: (folder: Folder) => void
}) {
  return (
    <div>
      <p>
        <strong>Folders</strong>
      </p>
      <div>
        {folders.map((folder) => (
          <FolderRow folder={folder} onRelease={onRelease} />
        ))}
      </div>
    </div>
  )
}
