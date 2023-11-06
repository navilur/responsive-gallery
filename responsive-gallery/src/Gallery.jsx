import React, { useState } from "react";
import Image from "./Image";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "./images/image-1.jpg",
      isFeature: true,
      isSelected: false,
    },
    {
      id: 2,
      src: "./images/image-2.jpg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 3,
      src: "./images/image-3.jpg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 4,
      src: "./images/image-4.jpg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 5,
      src: "./images/image-5.jpg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 6,
      src: "./images/image-6.jpg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 7,
      src: "./images/image-7.jpg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 8,
      src: "./images/image-8.jpg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 9,
      src: "./images/image-9.jpg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 10,
      src: "./images/image-10.jpeg",
      isFeature: false,
      isSelected: false,
    },
    {
      id: 11,
      src: "./images/image-11.jpeg",
      isFeature: false,
      isSelected: false,
    },
  ]);

  const handleDelete = (id) => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleDrop = (dragIndex, hoverIndex) => {
    const dragImage = images[dragIndex];
    const updatedImages = [...images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, dragImage);
    setImages(updatedImages);
  };

  const toggleImageSelection = (id) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const [newImageFile, setNewImageFile] = useState(null);
  const handleAddImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: images.length + 1,
          src: e.target.result,
          isFeature: false,
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
    setNewImageFile(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="card">
        <div className="cardheader d-flex justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <input
                type="checkbox"
                className="my-auto"
                checked={toggleImageSelection}
              />
              <p className="my-auto">
                {selectedImages.length} File(s) Selected
              </p>
            </div>
          </div>
          <button className="btn my-auto" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <div className="row">
          {images.map((image, index) => (
            <div className="col-12 col-lg-4 mb-4">
              <div className="galary_box">
                <Image
                  key={image.id}
                  index={index}
                  id={image.id}
                  src={image.src}
                  onDrop={handleDrop}
                  onToggleImageSelection={toggleImageSelection}
                />
              </div>
            </div>
          ))}
          <div className="col-12 col-lg-4 mb-4">
            <label className="label_box">
              <input
                type="file"
                accept="image/*"
                onChange={handleAddImageFile}
                className="mr-2"
              />
              <img src="./gallery.jpeg" className="img-fluid" />
              <p>Add Images</p>
            </label>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Gallery;
