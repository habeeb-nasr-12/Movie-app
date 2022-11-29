import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  "bootstrap/dist/css/bootstrap.min.css"
import  "bootstrap/dist/js/bootstrap.bundle"
import  "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css';

import { Offline } from 'react-detect-offline';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>

 <Offline> <div className='alert alert-danger position-fixed start-0 p-2 m-2 bottom-0 '>opps you are offline </div> </Offline>
    <App/>
    </>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
