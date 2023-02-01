import { Provider } from 'react-redux';
import store from './redux/store/index';
import AppRouter from './router/AppRouter';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
