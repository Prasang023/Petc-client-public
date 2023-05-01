import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily:  [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  MuiStepIcon: {
    root: {
      '&$completed': {
        color: 'pink',
      },
      '&$active': {
        color: 'red',
      },
    },
    active: {},
    completed: {},
  },
  palette: {
    primary: {
      main: '#EE8A1A',
      light: '#ffcf85',
    },
    secondary: {
      main: '#185163',
      light: '#1A576A',
      dark: '#124C5F',
    },
    text: {
      main: '#FFFFFF',
      secondary: '#B6BABF',
      disabed: '#858D95'
    },
    background: {
      main: '#F7F6FB'
    }
  },
});

export default theme;