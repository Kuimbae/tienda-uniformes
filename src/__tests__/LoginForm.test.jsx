import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';
import { describe, it, expect, vi } from 'vitest';

describe('LoginForm', () => {
  it('renderiza los campos de usuario y contraseña', () => {
    render(<LoginForm onLogin={vi.fn()} />);
    expect(screen.getByPlaceholderText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  });

  it('llama a onLogin al enviar el formulario', async () => {
    const onLogin = vi.fn();
    render(<LoginForm onLogin={onLogin} />);
    await userEvent.clear(screen.getByPlaceholderText(/usuario/i));
    await userEvent.type(screen.getByPlaceholderText(/usuario/i), 'emilys');
    await userEvent.clear(screen.getByPlaceholderText(/contraseña/i));
    await userEvent.type(screen.getByPlaceholderText(/contraseña/i), 'emilyspass');
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    await screen.findByText(/bienvenido/i);
    expect(onLogin).toHaveBeenCalled();
  });
});
