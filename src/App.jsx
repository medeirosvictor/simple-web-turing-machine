import React from 'react'
import './static/sass/index.scss'
import Form from './Form'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-header__title">⚙ Turing Machine</h1>
        <p className="app-header__subtitle">Define states, rules, and watch the tape come alive</p>
      </header>
      <main className="app-main">
        <Form />
      </main>
      <footer className="app-footer">
        <a href="https://github.com/medeirosvictor/simple-web-turing-machine" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
