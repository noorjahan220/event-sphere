import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";


const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/allEvent")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
