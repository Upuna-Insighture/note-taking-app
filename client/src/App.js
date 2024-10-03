import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import RouterFile from './routs/routs';
import { AuthProvider } from './auth/AuthProvider';
import './styles/App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <RouterFile />
        </AuthProvider>
      </BrowserRouter>  
    </ErrorBoundary>
  );
};

export default App;
