import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contacto from '../components/Contacto';
import { describe, it, expect, vi } from 'vitest';

describe('Contacto', () => {
  it('renderiza el formulario de contacto', () => {
    render(<Contacto onBack={() => {}} />);
    expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/mensaje/i)).toBeInTheDocument();
  });

  it('muestra mensaje de éxito tras enviar (mock)', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true }));
    render(<Contacto onBack={() => {}} />);
    await userEvent.type(screen.getByPlaceholderText(/nombre/i), 'Juan');
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'juan@correo.com');
    await userEvent.type(screen.getByPlaceholderText(/mensaje/i), 'Hola');
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(await screen.findByText(/mensaje enviado correctamente/i)).toBeInTheDocument();
  });
});
