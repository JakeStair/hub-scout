// src/components/CandidateSearch.tsx
import React, { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [message, setMessage] = useState<string>('No more candidates are available');

  // Function to fetch candidates
  const fetchCandidates = async () => {
    const data = await searchGithub();
    if (data.length) {
      setCandidates(data);
      setMessage('Candidates loaded');
    } else {
      setMessage('No candidates found. Try again later.');
    }
  };

  // Function to fetch a specific candidate's details
  const fetchCandidateDetails = async (username: string) => {
    const candidate = await searchGithubUser(username);
    setSelectedCandidate(candidate);
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      {/* Button to Load Candidates */}
      <button onClick={fetchCandidates}>Load Candidates</button>

      {/* Display Message */}
      <p>{message}</p>

      {/* List of Candidates */}
      {candidates.length > 0 && (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              <img
                src={candidate.avatar_url}
                alt={candidate.login}
                width={50}
                height={50}
              />
              <a
                href={candidate.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {candidate.login}
              </a>
              <button onClick={() => fetchCandidateDetails(candidate.login)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Display Selected Candidate Details */}
      {selectedCandidate && (
        <div>
          <h2>{selectedCandidate.login}</h2>
          <img
            src={selectedCandidate.avatar_url}
            alt={selectedCandidate.login}
            width={100}
            height={100}
          />
          <p>
            <a
              href={selectedCandidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
