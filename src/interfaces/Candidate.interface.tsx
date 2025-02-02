// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
  username: string;
  name?: string | null;
  image: string;
  location: string | null;
  email: string | null;
  company: string | null;
  bio: string | null;
  html_url?: string | null;
  followers?: number | null;
}
  