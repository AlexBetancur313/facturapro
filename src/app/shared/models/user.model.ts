// Define la estructura de un objeto de usuario en toda la aplicación.
export interface User {
  uid: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'user';
}
