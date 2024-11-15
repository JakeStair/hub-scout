console.log(import.meta.env.VITE_GITHUB_TOKEN);


const searchGithub = async (searchTerm: string) => {
  try {
    // Direct API call to GitHub with the Authorization header using your token
    const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,  // Make sure your token is set in the environment
      },
    });
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();
console.log(data);
    // Check if the 'items' property exists in the response
    if (data && data.items) {
      console.log('Fetched GitHub data:', data);
      return data.items; // Return the list of users
    } else {
      throw new Error('No users found in the response.');
    }

  } catch (err) {
    console.error('Error fetching GitHub data:', err);
    return []; // Return an empty array in case of error
  }
};




const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
