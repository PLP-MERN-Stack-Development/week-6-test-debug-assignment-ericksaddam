import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Button from './components/Button';

function App() {
  return (
    <ErrorBoundary>
      <div>
        <h1>Welcome to MERN Testing App</h1>
        <Button>Click me</Button>
      </div>
    </ErrorBoundary>
  );
}

export default App;
