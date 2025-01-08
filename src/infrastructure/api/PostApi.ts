import axios from 'axios';
import { Post } from '../../domain/models/IPost';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async () => axios.get(API_URL);
export const getPost = async (id: number) => axios.get(`${API_URL}/${id}`);
export const createPost = async (post: Post) => axios.post(API_URL, post);
export const updatePost = async (post: Post) => axios.put(`${API_URL}/${post.id}`, post);
export const deletePost = async (id: number) => axios.delete(`${API_URL}/${id}`);