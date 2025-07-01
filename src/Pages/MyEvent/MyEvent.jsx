import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const MyEvent = () => {
  const { user } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch events when user.email changes
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/event/${user.email}`)
      .then((res) => {
        // Sort events by dateTime descending
        const sorted = res.data.sort(
          (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        );
        setMyEvents(sorted);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load events.');
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Delete event
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axios
        .delete(`http://localhost:5000/event/${id}`)
        .then(() => {
          alert('Event deleted.');
          setMyEvents((prev) => prev.filter((event) => event._id !== id));
        })
        .catch((err) => {
          console.error(err);
          alert('Failed to delete event.');
        });
    }
  };

  // Open edit modal and populate form
  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      eventTitle: event.eventTitle,
      dateTime: event.dateTime,
      location: event.location,
      description: event.description,
    });
  };

  // Update event
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingEvent) return;

    axios
      .put(`http://localhost:5000/event/${editingEvent._id}`, formData)
      .then((res) => {
        alert('Event updated.');
        setEditingEvent(null);
        // Update local events state
        setMyEvents((prev) =>
          prev.map((event) =>
            event._id === editingEvent._id ? { ...event, ...formData } : event
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to update event.');
      });
  };

  if (loading) return <p>Loading your events...</p>;
  if (error) return <p>{error}</p>;

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
              <p>
                <strong>Date:</strong>{' '}
                {new Date(event.dateTime).toLocaleString()}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>{event.description}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => openEditModal(event)}
                  className="btn btn-sm btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded w-96 space-y-4"
          >
            <h2 className="text-xl font-bold">Edit Event</h2>

            <input
              name="eventTitle"
              value={formData.eventTitle || ''}
              onChange={(e) =>
                setFormData({ ...formData, eventTitle: e.target.value })
              }
              className="input input-bordered w-full"
              placeholder="Event Title"
              required
            />
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime || ''}
              onChange={(e) =>
                setFormData({ ...formData, dateTime: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
            <input
              name="location"
              value={formData.location || ''}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="input input-bordered w-full"
              placeholder="Location"
              required
            />
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              required
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyEvent;
