import styles from './Clipboard.module.css'

interface Props {
  text: string
}
const Clipboard = ({ text }: Props) => {
 
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.ClipboardContainer}>
      <input className={styles.ClipboardTextContainer} value={text} disabled />
      <button className={styles.ClipboardCopyButton} onClick={copyText}>Copy</button>
    </div>
  )
}

export default Clipboard
