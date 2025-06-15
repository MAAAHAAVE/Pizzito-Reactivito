import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import Home from './pages/Home.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import Skeleton from './components/PizzaBlock/Skeleton.tsx';

const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart' */ './pages/Cart.tsx'));
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: 'FullPizza' */ './pages/FullPizza.tsx'),
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound.tsx'),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route
          path="/*"
          element={
            <React.Suspense
              fallback={
                <div className="content__items">
                  {[...new Array(4)].map(() => (
                    <Skeleton />
                  ))} 
                </div>
              }>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
