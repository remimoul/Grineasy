import { AuthProvider } from './components/AuthProvider';
import MainApp from './components/MainApp'; 

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
