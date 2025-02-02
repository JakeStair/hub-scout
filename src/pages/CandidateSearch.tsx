import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from "../api/API"
import CandidateCard from '../components/CandidateCard';
const CandidateSearch: React.FC = () => {
  const [candidateList, setCandidateList] = useState([])
  const [candidateIndex, setCandidateIndex] = useState(0)
  const [currentCandidate, setcurrentCandidate] = useState({})
  const fetchCandidates = async () => {
    let response = await searchGithub()
    response = response.map((userInformation: any) => {
      return userInformation.login
    })
    setCandidateList(response)
    console.log(response);
    await fetchCandidate(response[0])
  }
  const fetchCandidate = async (username: string) => {
    let response = await searchGithubUser(username)
    // console.log(response);
    setcurrentCandidate({
      username: response.login,
      image: response.avatar_url,
      location: response.location,
      email: response.email,
      company: response.company,
      bio: response.bio,
    })
  }
  useEffect(() => {
    fetchCandidates()
  }, [])
  useEffect(() => {
    if (candidateIndex > 0) {
      if (candidateList.length >= candidateIndex) {
        fetchCandidates()
        setCandidateIndex(0)
      } else {
        fetchCandidate(candidateList[candidateIndex])
      }
    }
  }, [candidateIndex])
  const handleMinusButton = () => {
    setCandidateIndex(candidateIndex + 1)
  }
  const handlePlusButton = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]')
    savedCandidates.push(currentCandidate)
    localStorage.setItem('savedCandidates',JSON.stringify(savedCandidates))
    setCandidateIndex(candidateIndex + 1)
  }
  return (
    <div>
      <h1>Candidate Search</h1>
      <CandidateCard {...currentCandidate} />
      <div className="row">
        <div className="col nav">
          <button className='bg-danger rounded-circle' onClick={handleMinusButton}>-</button>
        </div>
        <div className="col nav justify-content-end">
          <button className='bg-success rounded-circle' onClick={handlePlusButton}>+</button>
        </div>
      </div>
    </div>
  );
};
export default CandidateSearch;