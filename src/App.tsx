
import { ErrorBoundary } from './components/ErrorBoundary';
import { MainLayout } from './layout/MainLayout';

function App() {
  return (
    <ErrorBoundary>
      <MainLayout />
    </ErrorBoundary>
  );
}

export default App;