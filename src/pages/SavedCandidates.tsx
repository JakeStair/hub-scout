import { useState, useEffect } from 'react';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

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
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
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
