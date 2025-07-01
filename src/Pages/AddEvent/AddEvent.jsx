import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';


const AddEvent = () => {
  const { user } = useContext(AuthContext); 
  const handleAddEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const eventTitle = form.eventTitle.value;
    const dateTime = form.dateTime.value;
    const location = form.location.value;
    const description = form.description.value;

    const newEvent = {
      eventTitle,
      postedBy: user?.email, 
      dateTime,
      location,
      description,
      attendeeCount: 0,
    };

    axios.post("http://localhost:5000/addEvent", newEvent)
      .then(res => {
        if (res.status === 201) {
          alert("Event added successfully!");
          form.reset();
        }
      })
      .catch(err => {
        alert("Failed to add event");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Event</h2>
      <form onSubmit={handleAddEvent} className="max-w-xl mx-auto bg-base-100 p-6 rounded shadow space-y-4">
        <input name="eventTitle" className="input input-bordered w-full" placeholder="Event Title" required />
        <input name="dateTime" type="datetime-local" className="input input-bordered w-full" required />
        <input name="location" className="input input-bordered w-full" placeholder="Location" required />
        <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Event Description" required></textarea>
        <button type="submit" className="btn btn-neutral w-full">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
