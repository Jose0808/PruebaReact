import React, { useState, useEffect, useReducer } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Post } from '../../domain/models/IPost';

interface PostFormProps {
  post?: Post | null;
  onSave: (post: Post) => void;
}

const initialState = { title: '', body: '' };

const reducer = (state: typeof initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_BODY':
      return { ...state, body: action.payload };
    case 'RESET':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const PostForm: React.FC<PostFormProps> = ({ post, onSave }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (post) {
      dispatch({ type: 'RESET', payload: { title: post.title, body: post.body } });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: post ? post.id : Date.now(), title: state.title, body: state.body });
    dispatch({ type: 'RESET', payload: initialState });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Título"
        value={state.title}
        onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
        required
      />
      <TextField
        label="Cuerpo"
        value={state.body}
        onChange={(e) => dispatch({ type: 'SET_BODY', payload: e.target.value })}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {post ? 'Editar' : 'Agregar'}
      </Button>
    </Box>
  );
};

export default PostForm;