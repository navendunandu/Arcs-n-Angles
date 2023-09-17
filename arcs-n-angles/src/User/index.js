import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Paymemt from './Pages/Payment/Payment';

export default function index() {
    return (
        <Routes>
            <Route path="/Payment/:pid" element={<Paymemt />} />
            <Route path="/*" element={<App />} exact/>
        </Routes>
    )
}
