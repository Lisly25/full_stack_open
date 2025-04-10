const loginWith = async (page, username, password)  => {
	await page.getByTestId('username').fill(username)
	await page.getByTestId('password').fill(password)
	await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, url, author) => {
	await page.getByRole('button', { name: 'create new blog' }).click()
	await page.getByTestId('new-blog-title').fill(title)
	await page.getByTestId('new-blog-url').fill(url)
	await page.getByTestId('new-blog-author').fill(author)
	await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }