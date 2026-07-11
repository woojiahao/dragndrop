import { useCallback } from 'react'
import type { File } from '../models/file'

export function FileRow({
  file,
  checked,
  onSelectFile,
  onDragStart,
}: {
  file: File
  checked: boolean
  onSelectFile: (file: File) => void
  onDragStart: (event: React.DragEvent) => void
}) {
  const onSelect = useCallback(() => {
    onSelectFile(file)
  }, [file, onSelectFile])

  return (
    <div
      className={`file-row ${checked ? 'checked-file' : ''}`}
      draggable={checked}
      onClick={onSelect}
      onDragStart={onDragStart}
    >
      <input
        type="checkbox"
        value={file.fileName}
        checked={checked}
      />
      <label>
        {' '}
        {file.fileName} (folder: {file.folder?.folderName ?? 'Unassigned'})
      </label>
    </div>
  )
}
