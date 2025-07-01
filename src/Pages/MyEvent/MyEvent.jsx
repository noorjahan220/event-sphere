import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';

const fetchMyEvents = async (email) => {
  const res = await axios.get(`http://localhost:5000/event/${email}`);
  return res.data;
};

const MyEvent = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch events with React Query
  const { data: myEvents = [], isLoading, error } = useQuery(
    ['myEvents', user?.email],
    () => fetchMyEvents(user.email),
    {
      enabled: !!user?.email, // only run if email exists
      select: (events) => events.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)),
    }
  );

  // Delete mutation
  const deleteMutation = useMutation(
    (id) => axios.delete(`http://localhost:5000/event/${id}`),
    {
      onSuccess: () => {
        alert('Event deleted.');
        queryClient.invalidateQueries(['myEvents', user.email]);
      },
      onError: (err) => console.error('Delete failed:', err),
    }
  );

  // Update mutation
  const updateMutation = useMutation(
    ({ id, data }) => axios.put(`http://localhost:5000/event/${id}`, data),
    {
      onSuccess: () => {
        alert('Event updated.');
        setEditingEvent(null);
        queryClient.invalidateQueries(['myEvents', user.email]);
      },
      onError: (err) => console.error('Update failed:', err),
    }
  );

  // Open edit modal and set form data
  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      eventTitle: event.eventTitle,
      dateTime: event.dateTime,
      location: event.location,
      description: event.description,
    });
  };

  // Handle form submit for update
  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editingEvent._id, data: formData });
  };

  // Handle delete button click
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading your events...</p>;
  if (error) return <p>Error loading events.</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>

      {myEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-4">
          {myEvents.map((event) => (
            <li key={event._id} className="p-4 border rounded shadow">
              <h3 className="text-xl font-semibold">{event.eventTitle}</h3>
              <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
              <div className="mt-2 space-x-2">
                <button onClick={() => openEditModal(event)} className="btn btn-sm btn-info">Edit</button>
                <button onClick={() => handleDelete(event._id)} className="btn btn-sm btn-error">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded w-96 space-y-4">
            <h2 className="text-xl font-bold">Edit Event</h2>

            <input
              name="eventTitle"
              value={formData.eventTitle}
              onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
              className="input input-bordered w-full"
              placeholder="Event Title"
              required
            />
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              className="input input-bordered w-full"
              required
            />
            <input
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input input-bordered w-full"
              placeholder="Location"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              required
            />

            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setEditingEvent(null)} className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-success" disabled={updateMutation.isLoading}>
                {updateMutation.isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyEvent;
