import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav'
import axios from 'axios';

function ImgUploader() {
    const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState(null);

    const submitImg = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        const result = await axios.post(
            "http://localhost:5000/uploadImg",
            formData, 
            {
                headers: {"Content-Type": "multipart/form-data"},
            }
        );
        getImage();
    };

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const getImage = async () => {
        try{
            const result = await axios.get("http://localhost:5000/getImage");
        setAllImage(result.data.data);
        } catch(e) {
            console.error("Error getting image", e);
        }
    };

    useEffect(() => {
        getImage();
    }, []);


  return (
    <div>
        <Nav />
      <h1>Img Part</h1>
      <form onSubmit={submitImg}>
        <input type="file" accept='image/*' onChange={onImageChange}></input>
        <button type='submit'>Upload</button>
      </form>

      {allImage === null ?"": allImage.map((data) => (
      <img key={data._id}
      src={`http://localhost:5000/files/${data.image}`}
      height={100}
      width={100}
      alt="photos">
      </img>
      ))}
    </div>
  )
}

export default ImgUploader
