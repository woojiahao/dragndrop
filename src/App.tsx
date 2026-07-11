import { useCallback, useState } from 'react'
import './App.css'
import type { Folder } from './models/folder'
import type { File } from './models/file'
import { Files } from './components/Files'
import { Folders } from './components/Folders'

function App() {
  const [folders] = useState<Folder[]>([
    { id: 1, folderName: 'Games' },
    { id: 2, folderName: 'Programming' },
    { id: 3, folderName: 'Admin' },
  ])

  const [files, setFiles] = useState<File[]>([
    { id: 1, fileName: 'Epic Games' },
    { id: 2, fileName: 'MongoDB' },
    { id: 3, fileName: 'YouTube' },
    { id: 4, fileName: 'Blizzard' },
  ])

  const [selectedFiles, setSelectedFiles] = useState<number[]>([])

  const selectFile = useCallback((file: File) => {
    setSelectedFiles((prev) =>
      prev.some((f) => f === file.id)
        ? prev.filter((f) => f !== file.id)
        : [...prev, file.id]
    )
  }, [])

  const onRelease = useCallback(
    (folder: Folder) => {
      setFiles((prev) => {
        const updated = [...prev]
        updated.forEach((file) => {
          if (selectedFiles.includes(file.id)) {
            file.folder = folder
          }
        })
        return [...updated]
      })
      setSelectedFiles([])
    },
    [selectedFiles]
  )

  return (
    <div className="app">
      <Folders folders={folders} onRelease={onRelease} />
      <Files
        files={files}
        selectedFiles={selectedFiles}
        selectFile={selectFile}
      />
    </div>
  )
}

export default App
