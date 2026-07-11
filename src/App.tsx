import { useCallback, useState } from 'react';
import './App.css';
import type { Folder } from './models/folder';
import type { File } from './models/file';
import { Files } from './components/Files';
import { Folders } from './components/Folders';

function App() {
  const [folders,] = useState<Folder[]>(
    [
      { id: 1, folderName: "Games" },
      { id: 2, folderName: "Programming" },
      { id: 3, folderName: "Admin" },
    ]
  )

  const [files, setFiles] = useState<File[]>([
    { id: 1, fileName: "Epic Games" },
    { id: 2, fileName: "MongoDB" },
    { id: 3, fileName: "YouTube" },
    { id: 4, fileName: "Blizzard" },
  ])

  const [selectedFiles, setSelectedFiles] = useState<number[]>([])

  const selectFile = useCallback((file: File) => {
    if (selectedFiles.some(f => f === file.id)) {
      console.log("unselecting file")
      setSelectedFiles(prev => prev.filter(f => f !== file.id))
    } else {
      console.log("selecting file")
      setSelectedFiles(prev => [...prev, file.id])
    }
  }, [selectedFiles])

  const onRelease = useCallback((folder: Folder) => {
    console.log('hi')
    setFiles(prev => {
      const updated = [...prev]
      updated.forEach(file => {
        if (selectedFiles.includes(file.id)) {
          file.folder = folder
        }
      })
      return [...updated]
    })
    console.log("unselecting all files")
    setSelectedFiles([])
  }, [selectedFiles])

  return (
    <div className="app">
      <Folders folders={folders} onRelease={onRelease} />
      <Files files={files} selectedFiles={selectedFiles} selectFile={selectFile} />
    </div>
  )
}

export default App
