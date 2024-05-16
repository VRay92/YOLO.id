'use client';
import React, { useState } from 'react';

const App: React.FunctionComponent = () => {
  const [imgURL, setImgURL] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgURL(url);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    if (imgURL) {
      alert('The image is uploaded successfully!!');
    } else {
      alert('Please select an image first!!');
    }
  };

  return (
    <div>
      <input type="file" id="photo" onChange={handleFileChange} />
      <img
        src={imgURL}
        alt=""
        id="imgPreview"
        className="w-[100px] h-[100px]"
      />
      <button id="formBtn" onClick={handleFormSubmit}>
        Submit
      </button>
    </div>
  );
};

export default App;
