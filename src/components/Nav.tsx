import { Link, useLocation } from 'react-router-dom';
const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const page = useLocation().pathname
  return (
    <>
    {page === '/SavedCandidates'?(
      <Link to='/'>Home</Link>
    ):(
      <Link to='/SavedCandidates'>Saved Candidates</Link>
    )}
    </>
  )
};
export default Nav;