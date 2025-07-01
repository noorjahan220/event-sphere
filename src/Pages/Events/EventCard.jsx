import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const EventCard = ({ event, onJoin }) => {
  const { user } = useContext(AuthContext);
  const { _id, eventTitle, postedBy, dateTime, location, description, attendeeCount } = event;

  const handleJoin = () => {
    axios.post(`http://localhost:5000/joinEvent/${_id}`, { userEmail: user?.email })
      .then(() => {
        alert("You joined the event!");
        onJoin(); // Refetch events
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to join");
      });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{eventTitle}</h2>
        <p><strong>Posted by:</strong> {postedBy}</p>
        <p><strong>Date:</strong> {new Date(dateTime).toLocaleString()}</p>
        <p><strong>Location:</strong> {location}</p>
        <p>{description}</p>
        <div className="card-actions justify-between mt-4">
          <div className="badge badge-outline">Attendees: {attendeeCount ?? 0}</div>
          <button className="btn btn-sm btn-outline btn-info" onClick={handleJoin}>Join Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
