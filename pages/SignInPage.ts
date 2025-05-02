import { Locator, Page } from '@playwright/test'

export class SignInPage {
  readonly page: Page
  readonly usernameBox: Locator
  readonly passwordBox: Locator
  readonly signInButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameBox = page.locator('#username')
    this.passwordBox = page.locator('#password')
    this.signInButton = page.getByRole('button', { name: 'Sign in' })
  }

  async signIn(username: string, password: string) {
    await this.usernameBox.fill(username)
    await this.passwordBox.fill(password)
    await this.signInButton.click()
  }

}