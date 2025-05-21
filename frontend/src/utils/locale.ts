import { GridLocaleText } from '@mui/x-data-grid';

export const customLocaleText: Partial<GridLocaleText> = {
    noRowsLabel: 'Nada por aquí',
    columnMenuSortAsc: 'Ordenar ascendente',
    columnMenuSortDesc: 'Ordenar descendente',
     MuiTablePagination: {
    labelRowsPerPage: 'Filas por página:',
    labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count}`,
  },

    
  }