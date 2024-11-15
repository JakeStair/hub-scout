import React, { useState } from 'react';
import { searchGithub } from "../api/API"

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]); // Just using `any[]` for simplicity
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const fetchCandidates = async () => {
    if (!searchTerm) {
      setMessage('Please enter a search term');
      return;
    }
    searchGithub(searchTerm).then((data: any) => {
      if (!data) {
        setMessage('No candidates found or invalid response');
        setCandidates([]);
        return;
      }
      setCandidates(data);
      setMessage('Candidates loaded');
    });
  }

    // try {
      // Already done in the API.tsx file
// const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
//   headers: {
//     Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
//   },
// });


  //     const data = await response.json();
  //     console.log('Fetched data:', data);

  //     if (!response.ok || !data.items) {
  //       setMessage('No candidates found or invalid response');
  //       setCandidates([]);
  //       return;
  //     }

  //     setCandidates(data.items);  // Use the fetched data to update state
  //     setMessage('Candidates loaded');
  //   } catch (err) {
  //     console.error('Error fetching candidates:', err);
  //     setMessage('An error occurred while fetching candidates.');
  //   }
  // };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search GitHub users"
      />
      <button onClick={fetchCandidates}>Load Candidates</button>
      <p>{message}</p>

      {candidates.length > 0 && (
        <ul>
          {candidates.map((candidate: any) => (
            <li key={candidate.id}>
              <img
                src={candidate.avatar_url}
                alt={candidate.login}
                width={50}
                height={50}
              />
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                {candidate.login}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidateSearch;
