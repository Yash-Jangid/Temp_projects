import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
    const [imagesArr, setImagesArr] = useState<string[]>([]);

    const fetchEvents = async () => {
        try {
            let response;
            if (searchTerm) {
                console.log('searchTerm', searchTerm);

                response = await axios.get('http://localhost:3000/events', {
                    params: {
                        searchTerm: searchTerm
                    }
                })
            } else {
                response = await axios.get('http://localhost:3000/events')
            }
            setEvents(response.data.rows);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const debouncedFetchEvents = useCallback(
        debounce((search: string) => fetchEvents(), 300),
        [pagination]
    );

    useEffect(() => {
        fetchEvents(); // Initial fetch
    }, [pagination]);

    useEffect(() => {
        fetchEvents();
    }, [searchTerm]);


    useEffect(() => {
        function xyz() {
            // Assuming you want to parse the images for all events
            const images = events.map(event => JSON.parse(event.images));
            setImagesArr(images);
            console.log('new images array', images);
        }

        xyz();
    }, [events]);

    return (
        <div className="flex flex-col w-[80%] mx-auto h-[100vh]">
            <div className="flex justify-between items-center bg-yellow-200 py-4">
                <h1 className="text-3xl font-bold font-mono">Event List</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded-2xl w-2/5"
                />
                <button className="bg-blue-500 border-r-2 rounded-lg p-2">
                    <a href="/events/new" className="text-white">
                        Add New Event
                    </a>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-4">
                {events.map((event) => (
                    <div key={event.id} className="bg-green-200 p-3 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">{event.name}</h2>
                        <p>{event.description}</p>
                        <p>
                            <span className="font-bold">Start Date:</span>{" "}
                            {new Date(event.startDate).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-bold">End Date:</span>{" "}
                            {new Date(event.endDate).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-bold">Total Guests:</span> {event.totalGuests}
                        </p>

                        {event.images && (
                            <div>
                                <span className="font-bold">Images:</span>
                                <ul className="flex flex-wrap gap-2">
                                    {JSON.parse(event.images).map((image: string, index: number) => (
                                        <li key={index}>
                                            <img
                                                src={`http://localhost:3000/uploads/${image}`}
                                                alt={`Event ${event.id} image ${index}`}
                                                className="w-24 h-24 object-cover"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );

};

export default EventList;
