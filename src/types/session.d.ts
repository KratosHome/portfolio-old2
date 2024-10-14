interface IUser {
  email: string
  id: string
  image: string
  name: string
}

interface ISession {
  expires: string
  user: IUser
}
