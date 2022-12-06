export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress,
    phone: string,
    website: string,
    company: ICompany
}

export interface IAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: IGeo
}

export interface IGeo {
  lat: string,
  lng: string
}

export interface ICompany {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface IComment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

export interface IPostDetailsInfo {
  name?: string,
  content: string,
  title: string,
  comments: {
    name: string,
    email: string,
    content: string
  }[]
}

export interface IPosts {
  id: number,
  name?: string,
  title: string,
  content: string,
  comments?: {
    name: string,
    email: string,
    content: string
  }[]
}