import { render, screen } from '@testing-library/react';
import Formulario from './index';
import userEvent from '@testing-library/user-event';

describe('Formulário', () => {
  test('Deve renderizar um campo de input', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    expect(campoTexto).toBeInTheDocument();
  });

  test('Deve renderizar um campo de input com o type number', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');
    expect(campoTexto).toHaveAttribute('type', 'number');
  });

  test('Deve renderizar um campo de input que pode ser preenchido', () => {
    render(<Formulario />);
    const campoTexto = screen.getByPlaceholderText('Digite um valor');

    userEvent.type(campoTexto, '50');
    expect(campoTexto).toHaveValue(50);
  });
});

test('Deve chamar um evento de onSubmit ao clicar em realizar transação', () => {
  const realizarTransacao = jest.fn();

  render(<Formulario realizarTransacao={realizarTransacao} />);

  const botao = screen.getByRole('button');

  userEvent.click(botao);
  expect(realizarTransacao).toHaveBeenCalledTimes(1);
});

test('Deve selecionar a opção depósito no select com o clique do usuário', () => {
  render(<Formulario />);
  const select = screen.getByTestId('select-opcoes');

  userEvent.selectOptions(select, 'Depósito');

  expect(screen.getByRole('option', { name: 'Depósito' }).selected).toBe(true);
  expect(screen.getByRole('option', { name: 'Transferência' }).selected).toBe(
    false
  );
});
