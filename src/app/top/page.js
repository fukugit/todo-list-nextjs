'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Loader2 } from "lucide-react"

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTodos = () => {
      const savedTodos = localStorage.getItem('todos')
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos))
      }
      setIsLoading(false)
    }

    loadTodos()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isLoading])

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos(prevTodos => [...prevTodos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  return (
    <>
      <div className="w-[80vw] flex justify-center bg-amber-400">
        <div className="w-11/12 bg-slate-200 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Todoリスト</h1>
          <div className="flex mb-4">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="新しいタスクを入力"
              className="flex-grow mr-2"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button onClick={addTodo}>追加</Button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-20">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
                  <div className="flex items-center">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}