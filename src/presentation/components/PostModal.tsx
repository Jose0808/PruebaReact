import React from 'react';
import { Modal, Box } from '@mui/material';
import PostForm from './PostForm';
import { Post } from '../../domain/models/IPost';

interface PostModalProps {
  open: boolean;
  post: Post | null;
  onSave: (post: Post) => void;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ open, post, onSave, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
        <PostForm post={post} onSave={onSave} />
      </Box>
    </Modal>
  );
};

export default PostModal;