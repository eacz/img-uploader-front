import styles from './page.module.css'
import DragDrop from '@/components/DragDrop/DragDrop'

export default function Home() {
  return (
    <main className={styles.main}>
      <DragDrop />
    </main>
  )
}
