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
      className={checked ? 'checked-file' : ''}
      draggable={checked}
      onDragStart={onDragStart}
    >
      <input
        type="checkbox"
        value={file.fileName}
        checked={checked}
        onChange={onSelect}
      />
      <label>
        {' '}
        {file.fileName} (folder: {file.folder?.folderName ?? 'Unassigned'})
      </label>
    </div>
  )
}
