import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password:  bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'zzz',
    email: 'zzz@example.com',
    password:  bcrypt.hashSync('123456', 10)
  },
  {
    name: 'ttt',
    email: 'ttt@example.com',
    password:  bcrypt.hashSync('123456', 10)
  },
]

export default users;