const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {

    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Tester',
        username: 'Tester',
        password: 'secret'
      }
    })

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {

      await page.getByTestId('username').fill('Tester')
      await page.getByTestId('password').fill('secret')

      await page.getByRole('button', { name: 'login' }).click()
    })

    test('fails with wrong credentials', async ({ page }) => {

      await page.getByTestId('username').fill('Incorrect')
      await page.getByTestId('password').fill('incorrect')
    
	    await page.getByRole('button', { name: 'login' }).click()
    })
  })

})