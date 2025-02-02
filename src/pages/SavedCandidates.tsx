import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    console.log(saved);
    setSavedCandidates(saved);
  }, []);
  const removeCandidate = (username: string) => {
    const updatedList = savedCandidates.filter(user => user.username !== username);
    setSavedCandidates(updatedList);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedList));
  };
  return (
    <section>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Email</th>
              <th scope="col">Company</th>
              <th scope="col">Bio</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((user, i) => (
              <tr key={i}>
                <td><img src={user.image} alt={user.username} width="50" /></td>
                <td><p>{user.username}</p></td>
                <td><p>{user.location || 'Not available'}</p></td>
                <td><p>{user.email || 'Not available'}</p></td>
                <td><p>{user.company || 'Not available'}</p></td>
                <td><p>{user.bio || 'Not available'}</p></td>
                {/* <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a> */}
                <td><button className='bg-danger rounded-circle' onClick={() => removeCandidate(user.username)}>-</button></td>
              </tr>
            ))}
            {/* <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr> */}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates.</p>
      )}
    </section>
  );
};
export default SavedCandidates;