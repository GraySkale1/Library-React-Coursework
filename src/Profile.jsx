import React, { useEffect, useState } from 'react';

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

function Profile() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const result = await authenticatedRequest('api/profile/info');
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
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    );
}

export default Profile;