export interface Skill {
  name: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  city: string;
  skills: Skill[];
}
