import type { Meta, StoryObj } from '@storybook/react';
import { CurrencySummaryRow } from './CurrencySummaryRow';

const meta: Meta<typeof CurrencySummaryRow> = {
  title: 'Molecules/CurrencySummaryRow',
  component: CurrencySummaryRow,
  args: {
    subtotal: 100,
    taxes: 19,
    currency: 'USD',
    locale: 'en-US',
  },
  argTypes: {
    subtotal: { control: 'number' },
    taxes: { control: 'number' },
    currency: { control: 'text' },
    locale: { control: 'text' },
    loading: { control: 'boolean' },
    onCreditNoteClick: { action: 'credit' },
  },
};
export default meta;

type Story = StoryObj<typeof CurrencySummaryRow>;

export const CompraEstandar: Story = {};

export const DevolucionNegativa: Story = {
  args: { subtotal: -50, taxes: -9.5 },
};

export const Cargando: Story = {
  args: { loading: true },
};
