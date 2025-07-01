import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get("https://event-sphere-server.onrender.com/allEvent")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        setEvents(sorted);
        setDisplayedEvents(sorted);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterEvents(term, filter);
  };

  const handleFilter = (value) => {
    setFilter(value);
    filterEvents(searchTerm, value);
  };

  const filterEvents = (searchText, dateFilter) => {
    let filtered = [...events];

    // Search
    if (searchText) {
      filtered = filtered.filter(e => e.eventTitle.toLowerCase().includes(searchText));
    }

    // Date Filters
    const today = new Date();
    if (dateFilter === 'today') {
      filtered = filtered.filter(e => {
        const date = new Date(e.dateTime);
        return date.toDateString() === today.toDateString();
      });
    } else if (dateFilter === 'thisWeek') {
      const start = new Date(today.setDate(today.getDate() - today.getDay()));
      const end = new Date(today.setDate(start.getDate() + 6));
      filtered = filtered.filter(e => {
        const date = new Date(e.dateTime);
        return date >= start && date <= end;
      });
    } else if (dateFilter === 'lastWeek') {
      const start = new Date();
      start.setDate(start.getDate() - start.getDay() - 7);
      const end = new Date();
      end.setDate(end.getDate() - end.getDay() - 1);
      filtered = filtered.filter(e => {
        const date = new Date(e.dateTime);
        return date >= start && date <= end;
      });
    } else if (dateFilter === 'thisMonth') {
      const now = new Date();
      const month = now.getMonth();
      filtered = filtered.filter(e => new Date(e.dateTime).getMonth() === month);
    } else if (dateFilter === 'lastMonth') {
      const now = new Date();
      const lastMonth = new Date(now.setMonth(now.getMonth() - 1)).getMonth();
      filtered = filtered.filter(e => new Date(e.dateTime).getMonth() === lastMonth);
    }

    setDisplayedEvents(filtered);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Events</h1>

      {/*Search and Filter */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered w-full md:max-w-xs"
          onChange={handleSearch}
        />
        <div className="flex gap-2 flex-wrap">
          <button className="btn btn-sm" onClick={() => handleFilter('today')}>Today</button>
          <button className="btn btn-sm" onClick={() => handleFilter('thisWeek')}>This Week</button>
          <button className="btn btn-sm" onClick={() => handleFilter('lastWeek')}>Last Week</button>
          <button className="btn btn-sm" onClick={() => handleFilter('thisMonth')}>This Month</button>
          <button className="btn btn-sm" onClick={() => handleFilter('lastMonth')}>Last Month</button>
          <button className="btn btn-sm btn-outline" onClick={() => handleFilter('')}>Clear</button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEvents.map(event => (
          <EventCard key={event._id} event={event} onJoin={() => {
            axios.get("http://localhost:5000/allEvent").then(res => {
              const sorted = res.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
              setEvents(sorted);
              filterEvents(searchTerm, filter);
            });
          }} />
        ))}
      </div>
    </div>
  );
};

export default Events;
