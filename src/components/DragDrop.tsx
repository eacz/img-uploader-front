'use client'
import { imageApi } from '@/api/imageApi'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
//import { File } from '@/interfaces'

export const DragDrop = () => {
  const [file, setFile] = useState<File>()
  const [imageUploadedUrl, setImageUploadedUrl] = useState('')

  const onDrop = (files: File[]) => {
    console.log(files)
    setFile(files[0])
  }

  const onSubmit = async () => {
    console.log(file)
    if (file) {
      const imageFormData = new FormData()
      imageFormData.append('image', file)
      const { data } = await imageApi.post<{ secure_url: string }>('images/upload', imageFormData)
      setImageUploadedUrl(data.secure_url)
      console.log(data)
    }
  }

  return (
    <Dropzone maxFiles={1} onDrop={(files) => onDrop(files)}>
      {({ getRootProps, getInputProps }) => (
        <section {...getRootProps()}>
          <input {...getInputProps()} />
          <p>drag</p>
          <button onClick={onSubmit}>Hola</button>
        </section>
      )}
    </Dropzone>
  )
}

export default DragDrop
