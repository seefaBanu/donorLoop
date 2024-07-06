import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";

const UpdateCamp = ({ camps, updateCamp }) => {
    const { id } = useParams();
  const [campData, setCampData] = useState({
    title: "",
    description: "",
    date: "",
    s_time: "",
    e_time: "",
    location: "",
    phone1: "",
    phone2: "",
    reglink: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const campToUpdate = camps.find((camp) => camp.id === parseInt(id));
    if (campToUpdate) {
      setCampData(campToUpdate);
      if (campToUpdate.image) {
        setImagePreview(campToUpdate.image);
      }
    } else {
      navigate("/camps");
    }
  }, [camps, id, navigate]);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(?:\+94|0)?[0-9]{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampData({ ...campData, [name]: value });
    if (name === "phone1" || name === "phone2") {
      if (!validatePhoneNumber(value)) {
        setErrors((prev) => ({ ...prev, [name]: "Invalid phone number" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error)) {
      alert("Please correct the errors before submitting.");
      return;
    }

    try {
      let imageUrl = campData.image;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
          const response = await axios.post("/api/upload", formData);
          imageUrl = response.data.imageUrl;
        } catch (error) {
          console.error("Error uploading image:", error);
          alert(
            "Failed to upload image. The camp will be updated without a new image."
          );
        }
      }

      const updatedCampData = {
        ...campData,
        image: imageUrl,
      };

      await updateCamp(updatedCampData);
      navigate(`/camp-more-details/${id}`);
    } catch (error) {
      console.error("Error updating camp:", error);
      alert("There was an error updating the camp. Please try again.");
    }
  };

  return (
    <div className="container mt-10">
      <div className="ml-60 mr-60 mb-16">
        <h2 className="text-2xl font-semibold mb-5 ml-2">Update Camp</h2>
        <div className="p-2 m-3 rounded-lg bg-white relative drop-shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4 m-6">
            <div className="w-full flex items-center text-sm ">
              <label htmlFor="title" className="w-1/5 font-semibold">
                Camp Title
              </label>
              <input
                id="title"
                name="title"
                value={campData.title}
                onChange={handleChange}
                className="w-2/5 border rounded px-3 py-2"
                required
              />
            </div>

            <div className="w-full flex items-center text-sm">
              <label
                htmlFor="description"
                className="w-1/5 block mb-1 font-semibold"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={campData.description}
                onChange={handleChange}
                className="w-4/5 border rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex w-full text-sm">
              <div className="w-full flex items-center">
                <label
                  htmlFor="date"
                  className="w-2/5 block mb-1 font-semibold"
                >
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={campData.date}
                  onChange={handleChange}
                  className="w-1/3 border rounded px-3 py-2 text-xs"
                  required
                />
              </div>
              <div className="w-full flex items-center">
                <label
                  htmlFor="time"
                  className="w-1/3 block mb-1 text-end mr-8 font-semibold"
                >
                  Time
                </label>
                <input
                  id="s_time"
                  name="s_time"
                  type="time"
                  value={campData.s_time}
                  onChange={handleChange}
                  className="w-2/3 border rounded px-3 py-2 mr-2"
                  required
                />{" "}
                To{" "}
                <input
                  id="e_time"
                  name="e_time"
                  type="time"
                  value={campData.e_time}
                  onChange={handleChange}
                  className="w-2/3 border rounded px-3 py-2 ml-2"
                  required
                />
              </div>
            </div>

            <div className="w-full flex items-center text-sm">
              <label
                htmlFor="location"
                className="w-1/5 block mb-1 font-semibold"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                value={campData.location}
                onChange={handleChange}
                className="w-2/5 border rounded px-3 py-2"
                required
              />
            </div>

            <div className="w-full flex items-center text-sm">
              <label htmlFor="phone" className="w-1/5 block mb-1 font-semibold">
                Contact No
              </label>
              <div className="w-2/5 flex flex-col">
                <input
                  placeholder="+94 7* **** ***"
                  id="phone1"
                  name="phone1"
                  value={campData.phone1}
                  onChange={handleChange}
                  className={`border rounded px-3 py-2 ${
                    errors.phone1 ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.phone1 && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone1}</p>
                )}
              </div>
              <div className="w-2/5 flex flex-col ml-2">
                <input
                  placeholder="+94 7* **** ***"
                  id="phone2"
                  name="phone2"
                  value={campData.phone2}
                  onChange={handleChange}
                  className={`border rounded px-3 py-2 ${
                    errors.phone2 ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.phone2 && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone2}</p>
                )}
              </div>
            </div>

            <div className="w-full flex items-center text-sm">
              <label
                htmlFor="reglink"
                className="block mb-1 w-1/5 font-semibold"
              >
                Registration Link
              </label>
              <input
                id="reglink"
                name="reglink"
                value={campData.reglink}
                onChange={handleChange}
                className="w-2/5 border rounded px-3 py-2"
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <div
                onClick={() => document.getElementById("image").click()}
                className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                style={{ backgroundColor: "#FFF7F7" }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <>
                    <div style={{ color: "#DE5246" }}>
                      <ImageIcon fontSize="large" />
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      drag & drop file or browse
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="bg-gray-300 text-black px-6 py-2 rounded"
                onClick={() => navigate(`/camp-more-details/${id}`)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCamp;
