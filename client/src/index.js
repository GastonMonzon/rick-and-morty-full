import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthContext';

function RootComponent() {
  if (!AuthProvider) {
    return (
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
  } else {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);