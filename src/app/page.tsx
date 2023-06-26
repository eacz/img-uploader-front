'use client'
import { useState } from 'react'
import styles from './page.module.css'
import DragDrop from '@/components/DragDrop/DragDrop'
import Loading from '@/components/Loading/Loading'

export default function Home() {
  const [loading, setLoading] = useState(false)
  return (
    <main className={styles.main}>
      {loading 
      ? <Loading />  
      : <DragDrop />
      }
    </main>
  )
}
