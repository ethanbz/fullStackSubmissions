import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const postBlog = jest.fn()

  const component = render(
    <BlogForm postBlog={postBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'test author' }
  })
  fireEvent.change(url, {
    target: { value: 'placeholder.com' }
  })
  fireEvent.submit(form)

  expect(postBlog.mock.calls).toHaveLength(1)
  console.log(postBlog.mock.calls)
  expect(postBlog.mock.calls[0][0]).toEqual({
    title: 'testing of forms could be easier',
    author: 'test author',
    url: 'placeholder.com'
  } )
})