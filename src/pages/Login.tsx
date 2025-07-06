import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../features/auth/authSlice';
import Button from '../components/ui/Button';
import { RootState } from '../store/store';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
            Connexion
          </h1>
          <p className="text-dark-300">
            Accédez à votre tableau de bord et reprenez le contrôle
          </p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
              className="input-field w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              className="input-field w-full"
              required
            />
            
            {error && (
              <div className="text-danger-500 text-sm">
                Erreur: {JSON.stringify(error)}
              </div>
            )}
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-dark-300">
              Pas encore de compte ?{' '}
              <Link to="/register" className="font-medium text-primary-500 hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 