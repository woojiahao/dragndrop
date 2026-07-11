import { useState, useCallback } from "react"
import type { Folder } from "../models/folder"

export function FolderRow({ folder, onRelease }: { folder: Folder, onRelease: (folder: Folder) => void }) {
  const [isFolderHover, setIsFolderHover] = useState(false)
  const dragEnterHandler = useCallback((event: React.DragEvent) => {
    if (event.dataTransfer?.types.includes("files")) {
      setIsFolderHover(true)
      const files: number[] = JSON.parse(event.dataTransfer.getData("files"))
      console.log(`file dragged on top of folder ${folder.folderName}`)
      console.log(`files dragged include ${files.join(", ")}`)
      event.preventDefault()
    }
  }, [folder.folderName])

  const dragLeaveHandler = useCallback(() => {
    setIsFolderHover(false)
  }, [])

  const dropHandler = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsFolderHover(false)
    console.log("drop")
    onRelease(folder)
  }, [folder, onRelease])

  return (
    <div onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={(event) => event.preventDefault()} onDrop={dropHandler}>[{isFolderHover ? 'X' : ' '}] {folder.folderName}</div>
  )
}
