// Test unitario puro de función para handleChange
// Esta versión es independiente de React

function handleChange(form, e) {
  return { ...form, [e.target.name]: e.target.value };
}

describe('handleChange (función pura)', () => {
  it('actualiza el campo correcto en el objeto form', () => {
    const form = { firstName: '', lastName: 'Perez' };
    const e = { target: { name: 'firstName', value: 'Sofi' } };
    const result = handleChange(form, e);
    expect(result).toEqual({ firstName: 'Sofi', lastName: 'Perez' });
  });

  it('no modifica otros campos', () => {
    const form = { firstName: 'Ana', lastName: 'Lopez' };
    const e = { target: { name: 'lastName', value: 'Gomez' } };
    const result = handleChange(form, e);
    expect(result).toEqual({ firstName: 'Ana', lastName: 'Gomez' });
  });
});

// Explicación:
// Esta función simula el comportamiento de handleChange en un formulario controlado.
// Recibe el estado actual (form) y un evento de cambio,
// y devuelve un nuevo objeto con el campo actualizado.
