import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";


const initialState = {
  list: [],
  status: "idle",
  error: null,
};

// ✅ FETCH PRODUCTS
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await api.get("/products");
  return res.data;
});

// ✅ ADD PRODUCT
export const addProduct = createAsyncThunk("products/add", async (newProduct) => {
  const res = await api.post("/products", newProduct);
  return res.data;
});

// ✅ UPDATE PRODUCT
export const updateProduct = createAsyncThunk("products/update", async (updatedProduct) => {
  const res = await api.put(`/products/${updatedProduct.id}`, updatedProduct);
  return res.data;
});

// ✅ DELETE PRODUCT
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await api.delete(`/products/${id}`);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // --- Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // --- Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      // --- Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
