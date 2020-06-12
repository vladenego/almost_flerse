import React, { FunctionComponent, useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { TPost } from '~/types'
import { sendPost } from './api'
import './style.less'
import '../../../node_modules/react-quill/dist/quill.snow.css'
import { format } from 'url'

interface AddScreenProps {
  token: string
  setToken: (token: string) => any
}

export const AddScreen: FunctionComponent<AddScreenProps> = ({ token, setToken }) => {
  const [value, setValue] = useState('')
  const [post, setPost] = useState<TPost>()

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
      ['code-block'],
      [{ align: [] }],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'code-block',
    'align',
  ]

  const onSubmit = (e) => {
    e.preventDefault()
    sendPost(post, value, token)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.log(error))
  }

  const onDescriptionChange = (event) => {
    setPost({ ...post, description: event.target.value })
    if (event.target.value.length >= 150) {
      alert('you have reached a limit of 150')
    }
  }

  return (
    <main id="add-screen">
      <h1>Add Post</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          name="title"
          type="text"
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          name="description"
          id=""
          onChange={(event) => onDescriptionChange(event)}
          required
          rows={10}
          cols={10}
          maxLength={150}
        ></textarea>
        <br />

        <br />
        <label htmlFor="description">Category</label>
        <br />
        <select
          name="tag"
          id=""
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        >
          <option value="tech" selected>
            tech
          </option>
          <option value="psychology">psychology</option>
          <option value="sport">sport</option>
          <option value="js">js</option>
        </select>
        <br />
        <br />
        <label htmlFor="description">Content</label>
        <br />
        <br />
        <div className="post-content">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
          />
        </div>

        <br />
        <input type="submit" />
      </form>
    </main>
  )
}
