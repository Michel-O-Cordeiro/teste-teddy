import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { SelectedClientsProvider } from '../../context/SelectedClientsContext'
import Login from './index'

function renderWithRouter() {
  return render(
    <SelectedClientsProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<div data-testid="home-page">Home</div>} />
        </Routes>
      </MemoryRouter>
    </SelectedClientsProvider>
  )
}

import { describe, it, expect, beforeEach } from 'vitest'

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('digita no input, clica no botão e navega', async () => {
    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite seu nome:') as HTMLInputElement
    const button = screen.getByRole('button', { name: /entrar/i })
    const user = userEvent.setup()

    await user.type(input, 'Michel')
    expect(input.value).toBe('Michel')

    await user.click(button)

    expect(localStorage.getItem('username')).toBe('Michel')
    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
  })

  it('exibe erro quando não digita o nome', async () => {
    renderWithRouter()

    const button = screen.getByRole('button', { name: /entrar/i })
    const user = userEvent.setup()

    await user.click(button)

    expect(await screen.findByRole('alert')).toHaveTextContent('Por favor, digite seu nome.')
  })

  it('limpa o localStorage ao montar', async () => {
    localStorage.setItem('foo', 'bar')
    localStorage.setItem('username', 'preexistente')
    localStorage.setItem('selectedClients', '[{"id":1}]')

    renderWithRouter()

    await new Promise((r) => setTimeout(r, 0))

    expect(localStorage.getItem('foo')).toBeNull()
    expect(localStorage.getItem('username')).toBeNull()
  })

  it('não navega e mostra erro para nome só com espaços', async () => {
    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite seu nome:')
    const button = screen.getByRole('button', { name: /entrar/i })
    const user = userEvent.setup()

    await user.type(input, '    ')
    await user.click(button)

    expect(await screen.findByRole('alert')).toHaveTextContent('Por favor, digite seu nome.')
    expect(screen.queryByTestId('home-page')).toBeNull()
  })

  it('exibe erro quando não há letras', async () => {
    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite seu nome:')
    const button = screen.getByRole('button', { name: /entrar/i })
    const user = userEvent.setup()

    await user.type(input, '12345')
    await user.click(button)

    expect(await screen.findByRole('alert')).toHaveTextContent('O nome deve conter letras.')
    expect(screen.queryByTestId('home-page')).toBeNull()
  })

  it('remove o erro ao digitar novamente', async () => {
    renderWithRouter()

    const button = screen.getByRole('button', { name: /entrar/i })
    const user = userEvent.setup()

    await user.click(button)
    expect(await screen.findByRole('alert')).toHaveTextContent('Por favor, digite seu nome.')

    const input = screen.getByPlaceholderText('Digite seu nome:')
    await user.type(input, 'Ana')

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('trima o nome antes de salvar e navegar', async () => {
    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite seu nome:')
    const button = screen.getByRole('button', { name: /entrar/i })
    const user = userEvent.setup()

    await user.type(input, '   Michel   ')
    await user.click(button)

    expect(localStorage.getItem('username')).toBe('Michel')
    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
  })

  it('aceita letras unicode no nome', async () => {
    renderWithRouter()

    const input = screen.getByPlaceholderText('Digite seu nome:')
    const button = screen.getByRole('button', { name: /entrar/i })
    const user = userEvent.setup()

    await user.type(input, 'Álvaro')
    await user.click(button)

    expect(localStorage.getItem('username')).toBe('Álvaro')
    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
  })
})