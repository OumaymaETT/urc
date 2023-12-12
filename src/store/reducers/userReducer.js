import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // L'état initial de votre utilisateur peut être défini ici
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      // Gérer l'action de connexion ici
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      // Gérer l'action de déconnexion ici
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
