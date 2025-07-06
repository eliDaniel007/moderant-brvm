import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Définir le type pour les données utilisateur
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  plan_abonnement: string;
}

// Définir le type pour l'état d'authentification
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

// État initial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isDemoMode: false,
  status: 'idle',
  error: null,
};

// Thunk asynchrone pour l'inscription
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/register/', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk asynchrone pour la connexion
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/login/', userData);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk asynchrone pour la déconnexion
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/logout/');
      return;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk asynchrone pour vérifier l'état d'authentification
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      // Vérifier le mode démo
      const demoMode = localStorage.getItem('demoMode') === 'true';
      if (demoMode) {
        return {
          authenticated: true,
          user: {
            id: 999,
            username: 'demo_user',
            email: 'demo@example.com',
            first_name: 'Utilisateur',
            last_name: 'Démo',
            plan_abonnement: 'premium'
          },
          isDemoMode: true
        };
      }
      
      const response = await api.get('/check-auth/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Création du slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    enableDemoMode: (state) => {
      state.isAuthenticated = true;
      state.isDemoMode = true;
      state.user = {
        id: 999,
        username: 'demo_user',
        email: 'demo@example.com',
        first_name: 'Utilisateur',
        last_name: 'Démo',
        plan_abonnement: 'premium'
      };
      localStorage.setItem('demoMode', 'true');
    },
    disableDemoMode: (state) => {
      state.isAuthenticated = false;
      state.isDemoMode = false;
      state.user = null;
      localStorage.removeItem('demoMode');
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.isDemoMode = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.isDemoMode = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isDemoMode = false;
        state.user = null;
        localStorage.removeItem('demoMode');
      })
      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = action.payload.authenticated;
        state.user = action.payload.user || null;
        state.isDemoMode = action.payload.isDemoMode || false;
      });
  },
});

export const { enableDemoMode, disableDemoMode } = authSlice.actions;
export default authSlice.reducer; 