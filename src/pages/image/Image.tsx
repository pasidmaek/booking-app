import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './image.css'
import { Link } from 'react-router-dom'

function Image() {
  const [imageLists, setImageLists] = useState<ImageType[] | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://picsum.photos/v2/list')
        if (response.status === 200) {
          setImageLists(response.data)
        } else {
          console.error('Failed to fetch', response.data)
        }
      } catch (e: any) {
        console.error('Failed to fetch', e.message)
      }
    }

    if (!imageLists) {
      fetchImage()
    }
  }, [imageLists])

  return (
    <>
      <Link to={'/'} className='btn' style={{ margin: '2% 0 0 4%' }}>Back</Link >
      <div className='container'>
        {imageLists ? (
          imageLists.map((image) => (
            <img
              key={image.id}
              src={image?.download_url}
              alt={image?.author}
              className='image-container'
            />
          ))
        ) : (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='image-container loading' />
          ))
        )}
      </div>
    </>
  );
}

export default Image