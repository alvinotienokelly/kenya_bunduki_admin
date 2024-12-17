import React, { useEffect, useState } from 'react';
import { getmeetingByDealId } from '../../services/api_service';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const DealMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const getMeetings = async () => {
        try {
            const response = await getmeetingByDealId(id);
            setMeetings(response.meetings || []);
        } catch (error) {
            toast.error('Failed to fetch meetings');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMeetings();
    }, [id]);

    return (
        <div className="mt-4 overflow-x-auto bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg">
            <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white text-black text-left">
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Subject</th>
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Start Time</th>
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">End Time</th>
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Attendees</th>
                        <th className="py-2 px-4 border-b dark:border-gray-500 text-start">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="py-4 px-4 text-center">Loading...</td>
                        </tr>
                    ) : meetings.length > 0 ? (
                        meetings.map((meeting, index) => (
                            <tr
                                className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-700'
                                    } text-gray-700 dark:text-gray-100 text-[14px]`}
                                key={meeting.meeting_id}
                            >
                                <td className="py-2 px-4 border-b">{meeting.subject}</td>
                                <td className="py-2 px-4 border-b">
                                    {moment(meeting.start).format('MMM Do YYYY, h:mm a')}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {moment(meeting.end).format('MMM Do YYYY, h:mm a')}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex flex-col gap-2">
                                        {meeting.attendees.map((email, index) => {
                                            const randomBgColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
                                            return (
                                                <span
                                                    key={index}
                                                    style={{ backgroundColor: randomBgColor }}
                                                    className="px-2 py-1 rounded text-sm text-gray-800 dark:text-gray-900"
                                                >
                                                    {email}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b text-center flex gap-2">
                                    <a
                                        href={meeting.meeting_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                                    >
                                        Join
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-4 px-4 text-center">
                                No meetings available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DealMeetings;