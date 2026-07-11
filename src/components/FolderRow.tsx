import { useState, useCallback } from 'react';
import type { Folder } from '../models/folder';
import { FaFolder, FaFolderOpen } from "react-icons/fa";

export function FolderRow({
  folder,
  onRelease,
}: {
  folder: Folder
  onRelease: (folder: Folder) => void
}) {
  const [isFolderHover, setIsFolderHover] = useState(false)
  const dragEnterHandler = useCallback((event: React.DragEvent) => {
    if (event.dataTransfer?.types.includes('files')) {
      setIsFolderHover(true)
      event.preventDefault()
    }
  }, [])

  const dragLeaveHandler = useCallback(() => {
    setIsFolderHover(false)
  }, [])

  const dropHandler = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      setIsFolderHover(false)
      onRelease(folder)
    },
    [folder, onRelease]
  )

  return (
    <div
      className={`folder-row ${isFolderHover ? "folder-hover" : ''}`}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={(event) => event.preventDefault()}
      onDrop={dropHandler}
    >
      {isFolderHover ? <FaFolderOpen /> : <FaFolder />} {folder.folderName}
    </div>
  )
}
