'use client'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CustomToolbar = () => (
  <div id="toolbar" className="flex space-x-2 rounded-t-lg bg-gray-100 p-2">
    <button className="ql-bold">B</button>
    <button className="ql-italic">I</button>
    <button className="ql-underline">U</button>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <select className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
      <option value="4"></option>
      <option value="5"></option>
      <option value="6"></option>
      <option value=""></option>
    </select>
    <button className="ql-image"></button>
  </div>
)

const Page = () => {
  const [value, setValue] = useState('')

  return (
    <div className="mx-auto h-full w-full p-5">
      <CustomToolbar />
      <input placeholder="Заголовок" />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: { container: '#toolbar' } }}
        className="h-full w-full rounded-b-lg border border-gray-300 bg-white p-2 text-black shadow-sm"
      />
    </div>
  )
}

export default Page
