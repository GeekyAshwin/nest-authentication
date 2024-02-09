export class CreateUserDto {
  name?: string | null;
  email: string;
  password: string;
  picture?: string;
  google_id?: string;
  email_verified?: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}
