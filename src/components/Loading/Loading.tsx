import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <section className='loadingContainer'>
      <h3>Uploading...</h3>
      <div className='loader'>
        <div className='loaderBar'></div>
      </div>
    </section>
  )
}

export default Loading
