"use client";

import { useState } from "react";

function PropertyImageUploader({ propertyId, initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const handleAddImage = () => {
    setCurrentImage(null);
    setImageUrl("");
    setDescription("");
    setIsPrimary(false);
    setOpenDialog(true);
  };

  const handleEditImage = (image) => {
    setCurrentImage(image);
    setImageUrl(image.imageUrl);
    setDescription(image.description);
    setIsPrimary(image.isPrimary);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveImage = () => {
    if (!imageUrl) return;

    if (currentImage) {
      // Edit existing image
      console.log(`PUT /api/property-images/${currentImage.id} with data:`, {
        imageUrl,
        description,
        isPrimary,
      });

      const updatedImages = images.map((img) => {
        if (img.id === currentImage.id) {
          return { ...img, imageUrl, description, isPrimary };
        }
        // If this image is set as primary, make sure other images are not primary
        return isPrimary ? { ...img, isPrimary: false } : img;
      });

      setImages(updatedImages);
    } else {
      // Add new image
      console.log(`POST /api/property-images with data:`, {
        propertyId,
        imageUrl,
        description,
        isPrimary,
      });

      const newImage = {
        id: Date.now(), // Temporary ID for dummy data
        propertyId,
        imageUrl,
        description,
        isPrimary,
      };

      // If new image is primary, update other images
      const updatedImages = isPrimary
        ? images.map((img) => ({ ...img, isPrimary: false }))
        : [...images];

      setImages([...updatedImages, newImage]);
    }

    setOpenDialog(false);
  };

  const handleDeleteImage = (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      console.log(`DELETE /api/property-images/${imageId}`);
      setImages(images.filter((img) => img.id !== imageId));
    }
  };

  const handleSetPrimary = (imageId) => {
    console.log(`PUT /api/property-images/${imageId}/set-primary`);

    setImages(
      images.map((img) => ({
        ...img,
        isPrimary: img.id === imageId,
      }))
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Property Images</h2>
        <button
          onClick={handleAddImage}
          className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col">
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={image.imageUrl || "/placeholder.svg"}
                alt={image.description || "Property image"}
                className="w-full h-48 object-cover"
              />

              {image.isPrimary && (
                <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  Primary
                </div>
              )}

              <div className="p-2 flex justify-between">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEditImage(image)}
                    className="p-1.5 text-gray-600 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Edit image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="p-1.5 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Delete image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {!image.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(image.id)}
                    className="p-1.5 text-gray-600 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Set as primary image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500 truncate">
              {image.description || "No description"}
            </p>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">No images added yet</p>
            <button
              onClick={handleAddImage}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              Add First Image
            </button>
          </div>
        )}
      </div>

      {/* Image Add/Edit Dialog */}
      {openDialog && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={handleCloseDialog}
            />

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg font-medium text-gray-900 mb-4"
                  id="modal-title"
                >
                  {currentImage ? "Edit Image" : "Add New Image"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="imageUrl"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter a valid image URL
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Image description"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPrimary"
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      checked={isPrimary}
                      onChange={(e) => setIsPrimary(e.target.checked)}
                    />
                    <label
                      htmlFor="isPrimary"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Set as primary image
                    </label>
                  </div>

                  {imageUrl && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Preview:
                      </p>
                      <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveImage}
                  disabled={!imageUrl}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                    !imageUrl
                      ? "bg-gray-300 text-gray-500"
                      : "bg-black text-white hover:bg-gray-800"
                  } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm transition-colors`}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyImageUploader;
