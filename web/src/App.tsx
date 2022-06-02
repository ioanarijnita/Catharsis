import React, { PropsWithChildren, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider, useAuthService } from './contexts/auth-context';
import { EventContextProvider } from './contexts/events-context';
import { User } from './models/user';
import { AdminAddEvent } from './pages/admin/admin-add-event';
import { RoomPlan } from './pages/room-plan';
import { EventPage } from './pages/event-page';
import { LocationsPage } from './pages/locations-page';
import { LoginPage } from './pages/login';
import { MainPage } from './pages/main-page';
import { SignUpPage } from './pages/signup';
import { SingleEvent } from './pages/single-event-page';
import { AdminAddPlan } from './pages/admin/admin-add-plan';
import { UserPlan } from './pages/user-plan';

async function loadLoginInfo(setUserState: (response: User) => void) {
  try {
    const userPayload = localStorage.getItem("userPayload");
    var login = JSON.parse(userPayload!) as User;
    setUserState(login);
  } catch (e) {
    return null;
  }
}

function LoginHelper(p: PropsWithChildren<{}>) {
  const auth = useAuthService();
  useEffect(() => {
    loadLoginInfo(async userInfo => {
      if (!userInfo || !userInfo.email) return;
      auth.setLoginInfo(userInfo);
    })
  }, []);
  return <>
    {p.children}
  </>
}

function ApplyContext(props: {
  contexts: Array<(c: { children: JSX.Element }) => JSX.Element>
  children: JSX.Element
}) {
  return props.contexts.reduce((children, Component) => <Component>{children}</Component>, props.children)
}

function App() {
  return (
    <BrowserRouter>
      <ApplyContext contexts={[
        LoginHelper,
        AuthContextProvider,
        EventContextProvider
      ]}>
        <Routes>
          <Route index element={<MainPage></MainPage>} />
          <Route path="/events" element={<EventPage></EventPage>}></Route>
          <Route path="/event" element={<SingleEvent></SingleEvent  >}></Route>
          <Route path="/locations" element={<LocationsPage></LocationsPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/event/plan" element={<UserPlan></UserPlan>}></Route>
          <Route path="/admin" element={<AdminAddEvent></AdminAddEvent>}></Route>
          <Route path="/admin/plan" element={<AdminAddPlan></AdminAddPlan>}></Route>
        </Routes>
      </ApplyContext>
    </BrowserRouter>
  );
}

export default App;
