import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';


const MyEvent = () => {
  const { user } = useContext(AuthContext); // get logged-in user
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/event/${user.email}`)
        .then(res => setMyEvents(res.data))
        .catch(err => console.error("Error fetching events:", err));
    }
  }, [user]);

  return (
    <div>
      <h2>My Events</h2>
      {myEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {myEvents.map(event => (
            <li key={event._id}>
              <h3>{event.eventTitle}</h3>
              <p>{event.dateTime}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvent;
