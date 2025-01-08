import React, { useEffect, useReducer, useState } from 'react';
import { getPosts, deletePost, updatePost, createPost } from '../../infrastructure/api/PostApi';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, Typography, Container, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { initialState, postReducer } from '../../application/postState';
import PostModal from '../components/PostModal';
import AlertSnackbar from '../components/AlertSnackbar';
import { Post } from '../../domain/models/IPost';

const PostListPage: React.FC = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [open, setOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [alert, setAlert] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await getPosts();
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch posts' });
      setAlert({ open: true, message: 'Failed to fetch posts', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      dispatch({ type: 'DELETE_POST', payload: id });
      setAlert({ open: true, message: 'Post deleted successfully', severity: 'success' });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to delete post' });
      setAlert({ open: true, message: 'Failed to delete post', severity: 'error' });
    }
  };

  const handleSave = async (post: Post) => {
    try {
      if (currentPost) {
        await updatePost(post);
        dispatch({ type: 'EDIT_POST', payload: post });
        setAlert({ open: true, message: 'Post updated successfully', severity: 'success' });
      } else {
        const response = await createPost(post);
        dispatch({ type: 'ADD_POST', payload: response.data });
        setAlert({ open: true, message: 'Post created successfully', severity: 'success' });
      }
      setOpen(false);
      setCurrentPost(null);
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to save post' });
      setAlert({ open: true, message: 'Failed to save post', severity: 'error' });
    }
  };

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setOpen(true);
  };

  const handleAdd = () => {
    setCurrentPost(null);
    setOpen(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Título',
      flex: 1,
      editable: true,
    },
    {
      field: 'body',
      headerName: 'Cuerpo',
      flex: 1,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom align="center">
        Posts
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
        Agregar Post
      </Button>
      <Box sx={{height: 'calc(100vh - 200px)'}} marginTop={2}>
        <DataGrid
          rows={state.posts}
          columns={columns}
          loading={state.loading}
          disableRowSelectionOnClick
        />
      </Box>
      <PostModal open={open} onClose={() => setOpen(false)} post={currentPost} onSave={handleSave} />
      <AlertSnackbar open={alert.open} message={alert.message} severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })} />
    </Container>
  );
};

export default PostListPage;