export interface IProject {
  _id: string;
  title: string;
  logo?: string;
  owner: string;
  authCollection?: { id: string };
  rolesCollection?: { id: string; title: string };
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}
