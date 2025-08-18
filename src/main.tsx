import { createRoot } from 'react-dom/client'
import App from './AppLayout.tsx'
import './AppLayout.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store.ts';


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
