import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { useState, KeyboardEvent } from 'react';
import { TextField, IconButton } from '../atoms';

export interface SearchBarProps {
  /** Texto inicial de la consulta */
  initialQuery?: string;
  /** Callback ejecutado al realizar la búsqueda */
  onSearch: (query: string) => void;
  /** Deshabilita la barra de búsqueda */
  disabled?: boolean;
  /** Placeholder opcional para el campo */
  placeholder?: string;
  /** Tamaño del campo */
  size?: 'small' | 'medium';
}

/**
 * Barra de búsqueda compuesta por un `TextField` y un `IconButton`.
 * Mantiene internamente el texto ingresado y dispara `onSearch`
 * al hacer click en el botón o presionar Enter.
 */
export function SearchBar({
  initialQuery = '',
  onSearch,
  disabled = false,
  placeholder,
  size = 'medium',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };

  const triggerSearch = () => {
    if (!disabled) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerSearch();
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        inputProps={{ 'aria-label': 'search input' }}
      />
      <IconButton
        icon={<SearchIcon />}
        onClick={triggerSearch}
        disabled={disabled}
        aria-label="search"
        sx={{ borderRadius: '50%' }}
      />
    </Box>
  );
}

export default SearchBar;
