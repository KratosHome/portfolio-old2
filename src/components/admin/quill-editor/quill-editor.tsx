'use client'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useEffect, useRef, FC, useState } from 'react'

interface CustomToolbarQuillProps {
  placeholder?: string
  onChange?: (value: string) => void
  value?: string
  modules?: any
  formats?: string[]
}

export const QuillEditor: FC<CustomToolbarQuillProps> = ({
  placeholder = 'Введіть текст...',
  onChange,
  value = '',
  modules,
  formats,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)
  const [isInternalUpdate, setIsInternalUpdate] = useState(false)

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: modules || {
          toolbar: '#toolbar',
        },
        formats: formats || [
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'list',
          'bullet',
          'link',
          'image',
          'align',
          'color',
          'background',
        ],
        placeholder,
      })

      if (value && quillRef.current.root.innerHTML !== value) {
        quillRef.current.root.innerHTML = value
      }

      quillRef.current.on('text-change', () => {
        if (!isInternalUpdate) {
          const html = quillRef.current?.root.innerHTML || ''
          onChange?.(html)
        }
      })
    }

    return () => {
      quillRef.current = null
    }
  }, [modules, formats, placeholder])

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      setIsInternalUpdate(true)
      quillRef.current.root.innerHTML = value || ''
      setIsInternalUpdate(false)
    }
  }, [value])

  return (
    <div>
      <div className="rounded-t-lg border border-gray-300" id="toolbar">
        <select className="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option defaultValue=""></option>
        </select>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-link"></button>
        <button className="ql-image"></button>
        <select className="ql-align"></select>
        <select className="ql-color"></select>
        <select className="ql-background"></select>
        <button className="ql-clean"></button>
      </div>
      <div
        className="min-h-96 rounded-b-lg border border-gray-300"
        ref={editorRef}
      />
    </div>
  )
}
