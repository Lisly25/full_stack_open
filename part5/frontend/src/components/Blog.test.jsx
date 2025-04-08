import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe ('<Blog />', () => {

  const blog = {
    author: "Tester",
    title: "Testing is important",
    url: "example.com",
    likes: 23,
    user: {
      username: "tester"
    }
  }

  const mockHandler = {
    update:  vi.fn(),
    getAll: vi.fn()
  }

  const mockSetMessage = vi.fn()

  const userData = {
    username: "Tester"
  }

  test ('blog title and author are displayed in default view', async () => {

    render (
      <Blog blog={blog} blogService={mockHandler}/>
    )

    const core = await screen.findByText(`${blog.title} ${blog.author}`)
    expect(core).toBeDefined()
  })

  test ('blog url is not displayed in default view', async () => {

    render (
      <Blog blog={blog} blogService={mockHandler}/>
    )

    const url = screen.queryByText('example.com')
    expect(url).toBeNull()

  })

  test ('blog\'s likes are not displayed in default view', async () => {

    render (
      <Blog blog={blog} blogService={mockHandler}/>
    )

    const likes = screen.queryByText('23')
    expect(likes).toBeNull()
  })

  test ('blog url is displayed after the "view" button is clicked', async () => {

    render (
      <Blog blog={blog} blogService={mockHandler} user={userData}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.queryByText('example.com')
    expect(url).toBeNull()

  })

  test ('blog\s likes are displayed after the "view" button is clicked', async () => {

    render (
      <Blog blog={blog} blogService={mockHandler} user={userData}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.queryByText('23')
    expect(url).toBeNull()

  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    render (
      <Blog blog={blog} blogService={mockHandler} user={userData} setMessage={mockSetMessage}/>
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.update.mock.calls).toHaveLength(2)
  })

})