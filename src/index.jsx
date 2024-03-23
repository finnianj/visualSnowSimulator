import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import './style.css'

import App from './App';

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
        <Canvas>
             <App />
        </Canvas>
);