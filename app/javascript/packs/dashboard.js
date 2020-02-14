import ReactDOM from 'react-dom';
import React from 'react';
import Dashboard from '../src/apps/dashboard';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Dashboard />,
    document.querySelector('#dashboard')
  );
});
