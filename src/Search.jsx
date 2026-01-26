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

function Search() {
    const [query, setQuery] = useState('');
    const [rows, setRows] = useState([]);

    const token = sessionStorage.getItem('session_token');

    const fetchData = async () => {

        const response = await fetch(
        `http://localhost:5000/api/library/query?name=${query}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
        }
}
        );

        const data = await response.json();

        console.log(data)
        setRows(data);
    };

    if (!token) {
        return (<Navigate to="/login"/>);
    }   

    const page = (
        <div>
        <h2>Library Search</h2>
        <label>
        <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder='Book Authors'
        />
        </label>
        <button onClick={fetchData}>Search</button>
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>OPY</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row, index) => (
                <tr key={index}>
                    <td>{row.title}</td>
                    <td>{row.authors}</td>
                    <td>{row.original_publication_year}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    )


    return page;
}

export default Search;
