'use client'
import { imageApi } from '@/api/imageApi'
import Image from 'next/image'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import imageDefault from '../../../public/image.svg'
import styles from './DragDrop.module.css'

export const DragDrop = () => {
  const [file, setFile] = useState<File>()
  const [imageUploadedUrl, setImageUploadedUrl] = useState('')

  const onDrop = (files: File[]) => {
    setFile(files[0])
    console.log(files)
  }

  const onSubmit = async () => {
    if (file) {
      const imageFormData = new FormData()
      imageFormData.append('image', file)
      const { data } = await imageApi.post<{ secure_url: string }>('images/upload', imageFormData)
      setImageUploadedUrl(data.secure_url)
    }
  }

  return (
    <section className={styles.dropWrapper}>
      <h1>Upload your image</h1>
      <h5>It should be jpeg, png, etc... </h5>
      <Dropzone maxFiles={1} onDrop={(files) => onDrop(files)} noClick>
        {({ getRootProps, getInputProps, open }) => (
          <>
            <div {...getRootProps()} className={styles.dropContainer}>
              <input {...getInputProps()} />
              <Image
                alt='image placeholder'
                src={imageDefault}
                className={styles.dropImage}
                unselectable='on'
              />
              <p className={styles.dropText}>Drag & Drop your image here</p>
            </div>
            <p className={styles.dropText}>Or</p>
            <button className={styles.dropButton} onClick={open}>
              Choose a file
            </button>
          </>
        )}
      </Dropzone>
    </section>
  )
}

export default DragDrop
