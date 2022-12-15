import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../app/store";
import { getData } from "../adminAPI/adminAPI";


 
const initialState = {
  allProducts: [],
  filteredProducts: [],
  currentProdId: '',
  searchByCategory: '',
  searchByFeature: '',
  searchText: "",
  isModalWindow: false,
  rerender: false,
};

export const getProducts = createAsyncThunk(
  'products/fetchProducts',
   async () => {
    let result = await getData();
    return result;
  } 
);

export const getFilteredProducts = createAsyncThunk(
  'products/fetchFilteredProducts',
  async () => {
    let result = await getData();
    return result;
  }
)

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    searchByFilter : (state, action) => {
      const {selectedCtegory, selectedFeature, text} = action.payload;
      state.searchByCategory = selectedCtegory;
      state.searchByFeature = selectedFeature;
      state.searchText = text;
    },
    changeModalWindow: (state) => {
      state.isModalWindow = !state.isModalWindow;
    },
    forceRerender: (state) => {
      state.rerender = !state.rerender
    },
    passCurrentProdId: (state, action) => {
      state.currentProdId = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
    .addCase(getProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    })
    .addCase(getProducts.rejected, (state) => {
      console.log('rejected');
    })
    .addCase(getFilteredProducts.fulfilled, (state, action) => {
        let result = action.payload;
        if (state.searchByCategory !== '') {
          result = result.filter(item => item.category === state.searchByCategory);
        }
        if (state.searchByFeature !== '') {
          result = result.filter(item => item[state.searchByFeature].toLowerCase().includes(state.searchText));
        }
        if (state.searchText.trim() !== '' && state.searchByFeature == '') {
          result = result.filter(item => (item.name.toLowerCase().includes(state.searchText) || item.brand.toLowerCase().includes(state.searchText)));
        }
        state.filteredProducts = result;
    })
    .addCase(getFilteredProducts.rejected, (state, action) => {
        console.log('rejected')
    })
  },
});


export const { 
   searchByFilter,
   changeModalWindow,
    forceRerender, 
    passCurrentProdId
   } = adminSlice.actions;
//export const modalSelector = (state: RootState) => state.admin.isRouteModal; // for useSelector
export default adminSlice.reducer;
