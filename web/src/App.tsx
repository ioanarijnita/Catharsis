import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { EventPage } from './pages/event-page';
import { LocationsPage } from './pages/locations-page';
import { MainPage } from './pages/main-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage></MainPage>}> </Route>
        <Route path="/events" element={<EventPage></EventPage>}></Route>
        <Route path="/locations" element={<LocationsPage></LocationsPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
