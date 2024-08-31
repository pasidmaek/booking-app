import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './image.css'

function Image() {
  const [imageLists, setImageLists] = useState<ImageType[] | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://picsum.photos/v2/list')
        if (response.status === 200) {
          setImageLists(response.data)
        } else {
          console.error(response.data)
        }
      } catch (e: any) {
        console.error(e.message)
      }
    }

    if (!imageLists) {
      fetchImage()
    }
  }, [imageLists])

  return (
    <div className='container'>
      {
        imageLists &&
        imageLists.map((image) => (
          <img key={image.id} src={image?.download_url} alt={image?.author} />
        ))
      }
    </div>
  )
}

export default Image