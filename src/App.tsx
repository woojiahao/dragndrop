import React, { useCallback, useState } from 'react';
import './App.css';

function FolderRow({ folder, onRelease }: { folder: Folder, onRelease: (folder: Folder) => void }) {
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

function Folders({ folders, onRelease }: { folders: Folder[], onRelease: (folder: Folder) => void }) {
  return <div>
    <p><strong>Folders</strong></p>
    <div>
      {folders.map(folder => <FolderRow folder={folder} onRelease={onRelease} />)}
    </div>
  </div>
}

type Folder = {
  id: number
  folderName: string
}

type File = {
  id: number
  fileName: string
  folder?: Folder
}

function FileRow({ file, checked, onSelectFile, onDragStart }: {
  file: File,
  checked: boolean,
  onSelectFile: (file: File) => void,
  onDragStart: (event: React.DragEvent) => void,
}) {
  const onSelect = useCallback(() => {
    onSelectFile(file)
  }, [file, onSelectFile])

  return (
    <div className={checked ? 'checked-file' : ''} draggable={checked} onDragStart={onDragStart}>
      <input type="checkbox" value={file.fileName} checked={checked} onChange={onSelect} />
      <label> {file.fileName} (folder: {file.folder?.folderName ?? "Unassigned"})</label>
    </div>
  )
}

function Files({ files, selectedFiles, selectFile }: { files: File[], selectedFiles: number[], selectFile: (file: File) => void }) {
  const onDragStart = useCallback((event: React.DragEvent) => {
    event.dataTransfer.setData("files", JSON.stringify(selectedFiles))
  }, [selectedFiles])

  return <div>
    <p><strong>Files</strong></p>
    <div>
      {files.map(file => <FileRow file={file} checked={selectedFiles.includes(file.id)} onSelectFile={selectFile} onDragStart={onDragStart} />)}
    </div>
  </div>
}

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
