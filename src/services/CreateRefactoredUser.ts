class CreateRefactoredUser {
  id: string;

  name: string;

  email: string;

  password: string;

  created_at: Date;

  updated_at: Date;

  constructor({
    name,
    email,
    id,
    created_at,
    updated_at,
  }: Omit<CreateRefactoredUser, 'password'>) {
    this.name = name;
    this.email = email;
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default CreateRefactoredUser;
