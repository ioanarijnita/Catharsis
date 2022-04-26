import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { EventContextProvider } from './contexts/events-context';
import { EventPage } from './pages/event-page';
import { LocationsPage } from './pages/locations-page';
import { MainPage } from './pages/main-page';

function App() {
  return (
    <BrowserRouter>
      <EventContextProvider>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}> </Route>
          <Route path="/events" element={<EventPage></EventPage>}></Route>
          <Route path="/locations" element={<LocationsPage></LocationsPage>}></Route>
        </Routes>
      </EventContextProvider>
    </BrowserRouter>
  );
}

export default App;
