import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api';

const initialState = {
  products: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//get products
export const getAllProducts = createAsyncThunk(
  'getAllProducts',
  async thunkApi => {
    try {
      const response = await API.get('products');
      // console.log(
      //   '🚀 ~ file: ProductsSlice.js:13 ~ getAllProducts ~ response:',
      //   response,
      // );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

const ProductsSlice = createSlice({
  name: 'ProductsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload.products;
    });
    builder.addCase(getAllProducts.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default ProductsSlice.reducer;
