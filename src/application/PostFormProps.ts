import React, { useReducer, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Post } from '../domain/models/IPost';

interface PostFormProps {
  post?: Post;
  onSave: (post: Post) => void;
}

interface State {
  title: string;
  body: string;
}

const initialState: State = {
  title: '',
  body: '',
};

type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_BODY'; payload: string }
  | { type: 'RESET'; payload: State };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_BODY':
      return { ...state, body: action.payload };
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
};