import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [username, setUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [savedUsers, setSavedUsers] = useState<any[]>([]);
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch a random list of candidates on component load
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };
    fetchCandidates();

    // Load saved candidates from localStorage
    const saved = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    setSavedUsers(saved);
  }, []);

  const handleSearch = async () => {
    if (username.trim()) {
      const user = await searchGithubUser(username);
      setSelectedUser(user);
    }
  };

  const saveCandidate = (user: any) => {
    const updatedSavedUsers = [...savedUsers, user];
    setSavedUsers(updatedSavedUsers);
    localStorage.setItem('savedUsers', JSON.stringify(updatedSavedUsers));
  };

  // Filter and sort candidates
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.login.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.login.localeCompare(b.login)
      : b.login.localeCompare(a.login);
  });

  return (
    <div>
      <h1>Candidate Search</h1>

      {/* Search by Username */}
      <input
        type="text"
        value={username}
        placeholder="Search GitHub username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display the Selected User */}
      {selectedUser && (
        <div>
          <h2>{selectedUser.login}</h2>
          <img src={selectedUser.avatar_url} alt="Avatar" width="100" />
          <p>Followers: {selectedUser.followers}</p>
          <button onClick={() => saveCandidate(selectedUser)}>Save Candidate</button>
        </div>
      )}

      {/* Filter Input */}
      <input
        type="text"
        value={filterText}
        placeholder="Filter by username"
        onChange={(e) => setFilterText(e.target.value)}
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
      />

      {/* Sort Button */}
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>

      {/* Display the Filtered and Sorted List of Candidates */}
      <h2>Random Candidates</h2>
      <ul>
        {sortedCandidates.map((candidate) => (
          <li key={candidate.id}>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              {candidate.login}
            </a>
            <button onClick={() => saveCandidate(candidate)}>Save</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;
