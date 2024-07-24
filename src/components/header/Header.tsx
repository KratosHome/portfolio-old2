import LanguageChange from '@/components/language-change/language-change'
import ThemeChange from '@/components/theme-change/theme-change'

export const Header = () => {
  return (
    <header>
      <ThemeChange />
      <LanguageChange />
    </header>
  )
}
