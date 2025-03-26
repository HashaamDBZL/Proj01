// api.ts
import { User } from "./types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchAllUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/users/skills`);
  return res.json();
}

export async function searchUsers(
  query: string,
  isPartial: boolean
): Promise<User[]> {
  if (!query.trim()) return fetchAllUsers();

  const res = await fetch(
    `${API_BASE_URL}/search?query=${query}&partial=${isPartial}`
  );

  const data = await res.json();

  return data.map(
    (
      user: { name: string; email: string; skills: string[] },
      index: number
    ) => ({
      id: index.toString(),
      firstName: user.name.split(" ")[0] || "N/A",
      lastName: user.name.split(" ")[1] || "N/A",
      email: user.email,
      bio: "N/A",
      city: "N/A",
      skills: user.skills.map((skill) => ({ name: skill })),
    })
  );
}
