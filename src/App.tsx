import './App.css';
import Body from './components/body';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[500],
    },
  },
});


function App() {
  return (
   <ThemeProvider theme={theme}>
      <Body/>
   </ThemeProvider>
  );
}

export default App;
