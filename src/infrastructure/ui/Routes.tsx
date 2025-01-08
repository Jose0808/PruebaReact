import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from '../../presentation/pages/ListPage';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ListPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
