const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const title = await page.getByText('Log in to application')
	await expect(title).toBeVisible()
	const loginButton = await page.getByText('login')
	await expect(loginButton).toBeVisible()
	const username = await page.getByText('username')
	await expect(username).toBeVisible()
	const password = await page.getByText('password')
	await expect(password).toBeVisible()
  })
})