import React, { Suspense, useEffect, useState, startTransition } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

const ECommerce = React.lazy(() => import('./pages/Dashboard/ECommerce'));
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const ApiConfigForm = React.lazy(() => import('./pages/ApiConfigForm'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    startTransition(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="ApiConfiguration" />
              <ApiConfigForm />
            </>
          }
        />
        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route
            index
            element={
              <>
                <PageTitle title="Dashboard" />
                <ECommerce />
              </>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
