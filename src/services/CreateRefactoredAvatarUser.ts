class CreateRefactoredAvatarUser {
  id: string;

  name: string;

  email: string;

  password: string;

  avatar: string;

  created_at: Date;

  updated_at: Date;

  constructor({
    id,
    name,
    email,
    avatar,
    created_at,
    updated_at,
  }: Omit<CreateRefactoredAvatarUser, 'password'>) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default CreateRefactoredAvatarUser;
