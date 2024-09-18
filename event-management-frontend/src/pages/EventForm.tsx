import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalGuests, setTotalGuests] = useState(0);
  const [userId, setUserId] = useState(1); // Set userId based on your requirement
  const [images, setImages] = useState<File[]>([]);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // To store validation errors
  
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (new Date(startDate) >= new Date(endDate)) {
      newErrors.dateRange = 'End date must be after start date';
    }
    if (totalGuests <= 0) {
      newErrors.totalGuests = 'Total guests must be greater than 0';
    }
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('totalGuests', totalGuests.toString());
    formData.append('userId', userId.toString());

    // Append images to FormData
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await axios.post('http://localhost:3005/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/events');
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className='w-[80%] flex justify-center items-center flex-col mx-auto'>
      <h1>Add New Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {errors.name && <p className='text-red-500'>{errors.name}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {errors.description && <p className='text-red-500'>{errors.description}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {errors.startDate && <p className='text-red-500'>{errors.startDate}</p>}
        </div>
        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {errors.endDate && <p className='text-red-500'>{errors.endDate}</p>}
          {errors.dateRange && <p className='text-red-500'>{errors.dateRange}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Total Guests</label>
          <input
            type="number"
            value={totalGuests}
            onChange={(e) => setTotalGuests(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {errors.totalGuests && <p className='text-red-500'>{errors.totalGuests}</p>}
        </div>
        <div className='flex flex-col my-4'>
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} />
          {errors.images && <p className='text-red-500'>{errors.images}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
