import { imageApi } from '@/api/imageApi'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Dropzone from 'react-dropzone'
import imageDefault from '../../../public/image.svg'
import styles from './DragDrop.module.css'
import { fileToUrl } from '@/utils'
import Clipboard from '../Clipboard/Clipboard'

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>
  imageUploadedUrl: string
  setImageUploadedUrl: Dispatch<SetStateAction<string>>
}

export const DragDrop = ({ setLoading, imageUploadedUrl, setImageUploadedUrl }: Props) => {
  const [file, setFile] = useState<File>()
  const [fileUrl, setFileUrl] = useState()

  const onDrop = async (files: File[]) => {
    setFile(files[0])
    const url = await fileToUrl(files[0])
    setFileUrl(url)
  }

  const onSubmit = async () => {
    if (file) {
      const imageFormData = new FormData()
      imageFormData.append('image', file)

      setLoading(true)
      const { data } = await imageApi.post<string>('images/upload', imageFormData)
      setImageUploadedUrl(data)
      setLoading(false)
    }
  }

  const onClearImage = () => {
    setFile(undefined)
    setFileUrl(undefined)
    setImageUploadedUrl('')
  }

  return (
    <section className={styles.dropWrapper}>
      {file && fileUrl || imageUploadedUrl ? (
        <>
          <h3>Your image:</h3>
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img className={styles.dropImage} src={fileUrl} alt='' />

          {imageUploadedUrl ? (
            <>
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <img className={styles.dropImage} src={imageUploadedUrl} alt='' />
              <Clipboard text={imageUploadedUrl} />
            </>
          ) : (
            <div className={styles.dropButtonContainer}>
              <button className={styles.dropButton} onClick={onSubmit}>
                Upload
              </button>
              <button className={styles.dropTextButton} onClick={onClearImage}>
                Clear
              </button>
            </div>
          )}
        </>
      ) : (
        <>
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
        </>
      )}
    </section>
  )
}

export default DragDrop
