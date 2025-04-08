import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

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

  const mockHandler = vi.fn()

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
})