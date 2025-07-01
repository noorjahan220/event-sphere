const EventCard = ({ event }) => {
  const { eventTitle, postedBy, dateTime, location, description, attendeeCount } = event;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{eventTitle}</h2>
        <p className="text-sm text-gray-500"><strong>Posted by:</strong> {postedBy}</p>
        <p className="text-sm"><strong>Date:</strong> {new Date(dateTime).toLocaleString()}</p>
        <p className="text-sm"><strong>Location:</strong> {location}</p>
        <p className="mt-2">{description}</p>
        <div className="card-actions justify-end mt-4">
          <div className="badge badge-outline">Attendees: {attendeeCount ?? 0}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
