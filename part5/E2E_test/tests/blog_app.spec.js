const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog, deleteBlog } = require('./helper')
const { setMaxIdleHTTPParsers } = require('http')

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

  describe('When logged in', () => {
    beforeEach(async ({ request, page }) => {
      await request.post('/api/testing/reset')
      await request.post('/api/users', {
        data: {
          name: 'Tester',
          username: 'Tester',
          password: 'secret'
        }
      })
      await loginWith(page, 'Tester', 'secret')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test blog has been created', 'playwright.com', 'Tester')

      await expect(page.getByText('Test blog has been created Tester')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Test blog to be liked', 'playwright.com', 'Tester')

      await likeBlog(page, 'Test blog to be liked')

      await expect(page.getByText('1')).toBeVisible()
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      await createBlog(page, 'Test blog to be deleted', 'playwright.com', 'Tester')

      await deleteBlog(page, 'Test blog to be deleted')

      await expect(page.getByText('Test blog to be deleted Tester')).not.toBeVisible()
      await expect(page.getByText('Removed blog')).toBeVisible()
    })

    test('those who did not create a blog can\'t see the delete button', async ({ request, page }) => {
      await createBlog(page, 'Exclusive blog', 'playwright.com', 'Tester')

      await page.getByRole('button', { name: 'Log out' }).click()

      await request.post('/api/users', {
        data: {
          name: 'Guest',
          username: 'Guest',
          password: 'secret'
        }
      })
      await loginWith(page, 'Guest', 'secret')

      const blog = await page.getByText('Exclusive blog').locator('..')

	    await blog.getByRole('button', { name: 'view'}).click()

      await expect(page.getByText('Remove')).not.toBeVisible()
    })
  })

})