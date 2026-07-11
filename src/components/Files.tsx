import { useCallback } from 'react'
import { FileRow } from './FileRow'
import type { File } from '../models/file'

export function Files({
  files,
  selectedFiles,
  selectFile,
}: {
  files: File[]
  selectedFiles: number[]
  selectFile: (file: File) => void
}) {
  const onDragStart = useCallback(
    (event: React.DragEvent) => {
      event.dataTransfer.setData('files', JSON.stringify(selectedFiles))
    },
    [selectedFiles]
  )

  return (
    <div>
      <p>
        <strong>Files</strong>
      </p>
      <div>
        {files.map((file) => (
          <FileRow
            file={file}
            checked={selectedFiles.includes(file.id)}
            onSelectFile={selectFile}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  )
}
