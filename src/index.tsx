import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'

import { MobileNotSupported } from './components/ui/MobileNotSupported';
// const App = React.lazy(() => import('./App'));
import App from './App';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
// const isMobile = window.innerWidth < 768;

// if (isMobile) {
//   root.render(
//     <React.StrictMode>
//       <MobileNotSupported />
//     </React.StrictMode>
//   );

// } else {
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
