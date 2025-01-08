import { Post } from '../domain/models/IPost';

export interface State {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, posts: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_POST':
      return { ...state, posts: state.posts.filter(post => post.id !== action.payload) };
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] };
    case 'EDIT_POST':
      return {
        ...state,
        posts: state.posts.map(post => (post.id === action.payload.id ? action.payload : post)),
      };
    default:
      return state;
  }
};