import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    totalGuests: number;
    images: string; // Assuming images is a JSON string
}

const EventList = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/events');
                // Update the state with the events array from the response
                setEvents(response.data.rows);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className='flex w-[80%] justify-center items-center mx-auto'>
            <div>
                <h1 className='text-3xl font-bold font-mono'>Event List</h1>
                <ul className='flex gap-y-4'>
                    {events.map(event => (
                        <div key={event.id} className='bg-green-200 p-3 rounded-lg shadow-lg mx-4'>
                            <h2 className='text-xl font-semibold'>{event.name}</h2>
                            <p>{event.description}</p>
                            <p><span className='font-bold'>Start Date:</span> {new Date(event.startDate).toLocaleDateString()}</p>
                            <p><span className='font-bold'>End Date:</span> {new Date(event.endDate).toLocaleDateString()}</p>
                            <p><span className='font-bold'>Total Guests:</span> {event.totalGuests}</p>
                            {/* Render images if available */}
                            <div>
                                {event.images !== '[null,null,null]' && (
                                    <div>
                                        <span className='font-bold'>Images:</span>
                                        <ul>
                                            {JSON.parse(event.images).map((image: string, index: number) => (
                                                <li key={index}>
                                                    <img src={image} alt={`Event ${event.id} image ${index}`} className='w-24 h-24 object-cover' />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </ul>
                <button className='bg-blue-500 border-r-2 rounded-lg p-2 mt-8'>
                    <a href="/events/new" className='text-white'>Add New Event</a>
                </button>
            </div>
        </div>
    );
};

export default EventList;
