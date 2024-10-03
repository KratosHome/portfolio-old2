interface ISubMenu {
  name: string
  link: string
}

interface IMenuItem {
  name: string
  link: string
  subMenu: ISubMenu[]
}
