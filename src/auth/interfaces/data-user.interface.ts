export interface DataUser {
  id: string;
  nombre: string;
  email: string;
  phoneNumber: string;
  userRoles: AspNetUserRole[];
}

export interface AspNetUserRole {
  userId: string;
  roleId: string;
  role: AspNetRole;
}

export interface AspNetRole {
  id: string;
  name: string;
  description: string | null;
  discriminator: string;
  aplicacion_id: number | null;
  normalizedName: string | null;
  concurrencyStamp: string | null;
  userRoles: AspNetUserRole[];
}
