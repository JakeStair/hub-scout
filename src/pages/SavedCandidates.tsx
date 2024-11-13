import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    setSavedCandidates(saved);
  }, []);

  const removeCandidate = (username: string) => {
    const updatedList = savedCandidates.filter(user => user.login !== username);
    setSavedCandidates(updatedList);
    localStorage.setItem('savedUsers', JSON.stringify(updatedList));
  };

  return (
    <section>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((user) => (
            <li key={user.id}>
              <img src={user.avatar_url} alt={user.login} width="50" />
              <p>Name: {user.name || user.login}</p>
              <p>Location: {user.location || 'Not available'}</p>
              <p>Email: {user.email || 'Not available'}</p>
              <p>Company: {user.company || 'Not available'}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
              <button onClick={() => removeCandidate(user.login)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved candidates.</p>
      )}
    </section>
  );
};

export default SavedCandidates;
