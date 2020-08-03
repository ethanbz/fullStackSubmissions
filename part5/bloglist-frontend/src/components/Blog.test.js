import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders specific content', () => {
  const blog = {
    title: 'test blog',
    author: 'root',
    url: 'test.com',
    user: { name: 'test user' }
  }

  const component = render(
    <Blog blog={blog} />
  )


  const div = component.container.querySelector('.blog')
  console.log(prettyDOM(div))

  const details = component.container.querySelector('.details')

  expect(component.container).toHaveTextContent(
    'test blog - root'
  )

  expect(component.container).not.toHaveTextContent(
    'test.com'
  )

  expect(details).toBe(null)

})

test('renders details when button is clicked', () => {
  const blog = {
    title: 'test blog',
    author: 'root',
    url: 'test.com',
    user: { name: 'test user' }
  }

  const user = {
    name: 'test user'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const details = component.container.querySelector('.details')
  expect(details).toHaveTextContent(
    'test.com'
  )
})

test ('liking blog twice calls event handler twice', () => {
  const blog = {
    title: 'test blog',
    author: 'root',
    url: 'test.com',
    user: { name: 'test user' }
  }

  const user = {
    name: 'test user'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} likeBlog={mockHandler} />
  )
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})