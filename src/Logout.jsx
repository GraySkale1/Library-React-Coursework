import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

async function authenticatedRequest(path) {
    const token = sessionStorage.getItem('session_token');

    if (!token) {
        throw new Error('No access token found');
    }

    const response = await fetch(`http://localhost:5000/${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || 'Request failed');
    }

    return result;
}

function Logout() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = sessionStorage.getItem('session_token');

    useEffect(() => {
        async function loadProfile() {
            try {
                const result = await authenticatedRequest('api/logout');
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);


    if (loading) {
        return <p>Logging out</p>;
    }

    return (
        <Navigate to="/login"/>
    );
}

export default Logout;