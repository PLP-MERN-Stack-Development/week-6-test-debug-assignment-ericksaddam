import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Example debugging: Log error to console or send to monitoring service
    console.error('React Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div role="alert">Something went wrong: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
