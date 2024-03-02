// import React from 'react'

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchLandlord();
    }, [listing.userRef]);

    const handleMessage = (e) => { 
        setMessage(e.target.value);
    }

    return (
        <>
            {
                landlord && (
                    <div className="flex flex-col gap-2">
                        <p>Contact <span className="font-semibold">{landlord.username} </span>
                        for <span className="font-semibold">{listing.name.toLowerCase()}</span> at
                        <span className="font-semibold"> {listing.address}</span>
                        </p>
                        <textarea placeholder="Enter your message here" className="w-full border p-3 rounded-lg " value={message} name="message" id="message" rows="2" onChange={handleMessage}></textarea>

                        <Link className="bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95" to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
                            Send Message
                        </Link>
                    </div>
                )
            }

        </>
    )
}
