export class CreateUserDto {
    name?: string | null;
    email: string;
    password: string;
    created_at: Date | string;
    updated_at: Date | string;
}
