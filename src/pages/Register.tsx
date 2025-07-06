import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerUser } from '../features/auth/authSlice';
import Button from '../components/ui/Button';
import { RootState } from '../store/store';

const motDePasseValide = (mdp: string) => {
  // Au moins 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(mdp);
};

const getPasswordStrength = (password: string) => {
  let score = 0;
  const criteria = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  };

  Object.values(criteria).forEach(met => {
    if (met) score++;
  });

  if (score <= 2) return { level: 'faible', color: 'bg-red-500', text: 'Faible' };
  if (score <= 3) return { level: 'moyen', color: 'bg-yellow-500', text: 'Moyen' };
  if (score <= 4) return { level: 'bon', color: 'bg-blue-500', text: 'Bon' };
  return { level: 'fort', color: 'bg-green-500', text: 'Fort' };
};

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      if (!motDePasseValide(e.target.value)) {
        setPasswordError(
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
        );
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!motDePasseValide(formData.password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    setPasswordError('');
    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  const isFormValid =
    formData.first_name &&
    formData.last_name &&
    formData.username &&
    formData.email &&
    motDePasseValide(formData.password) &&
    formData.password === formData.password_confirmation;

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
            Créer un compte
          </h1>
          <p className="text-dark-300">
            Rejoignez la communauté et prenez de meilleures décisions financières
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="first_name"
                placeholder="Prénom"
                onChange={handleChange}
                className="input-field"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Nom"
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
              className="input-field w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              onChange={handleChange}
              className="input-field w-full"
              required
            />
            <div>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                className="input-field w-full"
                required
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Force du mot de passe:</span>
                    <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{
                        width: `${(formData.password.length / 12) * 100}%`,
                        maxWidth: '100%'
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 space-y-1">
                    <div className={`flex items-center ${formData.password.length >= 8 ? 'text-green-400' : 'text-slate-500'}`}>
                      <span className="mr-2">{formData.password.length >= 8 ? '✓' : '○'}</span>
                      Au moins 8 caractères
                    </div>
                    <div className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-slate-500'}`}>
                      <span className="mr-2">{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                      Au moins une majuscule
                    </div>
                    <div className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-400' : 'text-slate-500'}`}>
                      <span className="mr-2">{/[a-z]/.test(formData.password) ? '✓' : '○'}</span>
                      Au moins une minuscule
                    </div>
                    <div className={`flex items-center ${/\d/.test(formData.password) ? 'text-green-400' : 'text-slate-500'}`}>
                      <span className="mr-2">{/\d/.test(formData.password) ? '✓' : '○'}</span>
                      Au moins un chiffre
                    </div>
                    <div className={`flex items-center ${/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password) ? 'text-green-400' : 'text-slate-500'}`}>
                      <span className="mr-2">{/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password) ? '✓' : '○'}</span>
                      Au moins un caractère spécial
                    </div>
                  </div>
                </div>
              )}
            </div>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirmer le mot de passe"
              onChange={handleChange}
              className="input-field w-full"
              required
            />
            {passwordError && (
              <div className="text-danger-500 text-sm">
                {passwordError}
              </div>
            )}
            {error && (
              <div className="text-danger-500 text-sm">
                Erreur: {JSON.stringify(error)}
              </div>
            )}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={status === 'loading' || !isFormValid}
            >
              {status === 'loading' ? 'Création en cours...' : 'Créer mon compte'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-dark-300">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="font-medium text-primary-500 hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 