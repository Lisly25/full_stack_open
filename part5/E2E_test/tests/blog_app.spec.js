const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {

    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Tester',
        username: 'Tester',
        password: 'secret'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const title = await page.getByText('Log in to application')
	await expect(title).toBeVisible()
	const loginButton = await page.getByText('login')
	await expect(loginButton).toBeVisible()
	const username = await page.getByTestId('username')
	await expect(username).toBeVisible()
	const password = await page.getByTestId('password')
	await expect(password).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {

      await loginWith(page, 'Tester', 'secret')

      await expect(page.getByText('Tester logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {

      await loginWith(page, 'Incorrect', 'invalid')

      const errorDiv = await page.getByTestId('error-message')

      await expect(errorDiv).toContainText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(page.getByText('Incorrect logged in')).not.toBeVisible()
    })
  })

})