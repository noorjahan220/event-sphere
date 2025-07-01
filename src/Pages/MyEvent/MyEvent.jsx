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

  useEffect(() => {
    if (!user?.email) return;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://event-sphere-server-9srdzaeyd-noorjahan-akters-projects.vercel.app/event/${user.email}`);
        const sorted = res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        setMyEvents(sorted);
      } catch (err) {
        console.error(err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/event/${id}`);
        setMyEvents(prev => prev.filter(event => event._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      eventTitle: event.eventTitle,
      dateTime: event.dateTime.slice(0, 16), // Format for datetime-local input
      location: event.location,
      description: event.description,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      await axios.put(`http://localhost:5000/event/${editingEvent._id}`, formData);
      setMyEvents(prev =>
        prev.map(event => 
          event._id === editingEvent._id ? { ...event, ...formData } : event
        )
      );
      setEditingEvent(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update event. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-2xl mx-auto mt-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Events</h2>
        <p className="text-gray-600">Manage all your created events in one place</p>
      </div>

      {myEvents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-2xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No events created yet</h3>
          <p className="text-gray-500">When you create events, they'll appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{event.eventTitle}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {new Date(event.dateTime).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(event)}
                    className="btn btn-sm btn-outline border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="btn btn-sm bg-red-100 text-red-600 hover:bg-red-200 border-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Edit Event</h3>
                <button 
                  onClick={() => setEditingEvent(null)}
                  className="btn btn-circle btn-sm btn-ghost"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Event Title</label>
                  <input
                    name="eventTitle"
                    value={formData.eventTitle || ''}
                    onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={formData.dateTime || ''}
                    onChange={(e) => setFormData({...formData, dateTime: e.target.value})}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Location</label>
                  <input
                    name="location"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="btn btn-ghost text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvent;