import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPlus, FaChevronDown } from "react-icons/fa";

const Donate = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const maxImages = 5;

   const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    location: '',
    pickupInstructions: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
  const { id, value } = e.target;
  
  setFormData(prev => ({
    ...prev,
    [id]: value
  }));
  
  if (errors[id]) {
    setErrors(prev => ({
      ...prev,
      [id]: ''
    }));
  }
};

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
  const newErrors = {};

  if (!formData.title.trim()) {
    newErrors.title = 'Item title is required';
  } else if (formData.title.length < 3) {
    newErrors.title = 'Title must be at least 3 characters';
  } else if (formData.title.length > 100) {
    newErrors.title = 'Title must be less than 100 characters';
  }

  if (!formData.description.trim()) {
    newErrors.description = 'Description is required';
  } else if (formData.description.length < 10) {
    newErrors.description = 'Description must be at least 10 characters';
  } else if (formData.description.length > 500) {
    newErrors.description = 'Description must be less than 500 characters';
  }

  if (!formData.category) {
    newErrors.category = 'Please select a category';
  }

  if (!formData.condition) {
    newErrors.condition = 'Please select a condition';
  }

  if (!formData.location.trim()) {
    newErrors.location = 'Pickup location is required';
  }

  if (images.length === 0) {
    newErrors.images = 'At least 1 photo is required';
  }

  setErrors(newErrors);
  
  return Object.keys(newErrors).length === 0;
};

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, []);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className=" border border-gray-300 rounded-lg p-4 shadow-md">
      <div className="mb-4">
        <h4 className="font-semibold">List an item to Donate</h4>
        <p className="text-gray-600">
          Help someone in need by donating you no longer need. Share your
          Abundance
        </p>
      </div>
      <div>
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium select-none">
              Item Photo
            </label>
            <div>
              Add at least 1 photo * ({images.length}/{maxImages})
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />

            <div className="grid grid-cols-5 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImages((prev) =>
                        prev.filter((img) => img.id !== image.id),
                      );
                      URL.revokeObjectURL(image.preview);
                    }}
                    className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {Array.from({ length: maxImages - images.length }).map(
                (_, index) => (
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    key={`empty-${index}`}
                    className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50"
                  >
                    <FaPlus className="text-gray-400 text-lg mb-1" />
                    <span className="text-xs text-gray-500">Add Photo</span>
                  </button>
                ),
              )}
            </div>

            <div className="text-center mt-2">
              <p className="text-sm text-gray-500">
                Click any empty box to upload photos (Max 5)
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, JPEG (MAX. 5MB)
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="flex md:text-sm items-center gap-2 text-sm font-medium select-none"
            >
              Item title
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g Black bag in good condition"
              className="md:text-sm transition-all file:border-0 focus-visible:border-[oklch(70.8% 0 0)] file:h-7 file:inline-flex file:bg-transparent outline-none focus-visible:ring-[3px] py-1 px-3 bg-[#f3f3f5] border-transparent border rounded-md min-w-0 w-full h-9 inline-flex placeholder: "
            />
          </div>
          <div>
            <label
              className="flex items-center gap-2 text-sm font-medium "
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name=""
              id="description"
              className="resize-none outline-none transition-all py-2 bg-[#f3f3f5] border-transparent border rounded-md field-sizing-content flex w-full min-h-16"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                htmlFor=""
              >
                Categories *
              </label>
              <button
                type="button"
                className=" flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none  disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                <span className="pointer-none:">Select Category</span>
                <FaChevronDown className="text-gray-400" />
              </button>
              <select name="" id="">
                <option value="Appliances">Appliances</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="condition" className="text-sm font-medium">
                Condition *
              </label>
              <select id="condition" className="w-full rounded-md border bg-input-background px-3 py-2 text-sm">
                <option value="">Select Condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="pickup-location" className="text-sm font-medium">
              Pickup Location *
            </label>
            <input
              id="pickup-location"
              type="text"
              placeholder="e.g. 123 Main Street, City, State"
              className="w-full rounded-md border bg-input-background px-3 py-2 text-sm"
            />
            <p className="text-xs text-gray-500">This helps match with recipients nearby. Your full address will only be shared after confirmation.</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="pickup-instructions" className="text-sm font-medium">
              Pickup Instructions (optional)
            </label>
            <textarea
              id="pickup-instructions"
              className="resize-none outline-none transition-all py-2 bg-[#f3f3f5] border-transparent border rounded-md field-sizing-content flex w-full min-h-16"
            ></textarea>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-500 text-white px-4 py-2 outline-none inline-flex items-center justify-center whitespace-nowrap font-medium transition-all flex-1 rounded-md">List Item</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Donate;
