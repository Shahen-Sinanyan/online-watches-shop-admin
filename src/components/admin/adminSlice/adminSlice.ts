import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../../types";
import { getData } from "../adminAPI/adminAPI";

type TInitialState = {
  allProducts: TProduct[];
  filteredProducts: TProduct[];
  currentProdId: string;
  searchByCategory: string;
  searchByFeature: string;
  searchText: string;
  isModalWindow: boolean;
  rerender: boolean;
};

type TSearchFilter = {
  selectedCategory: string;
  selectedFeature: string;
  text: string;
}

const initialState: TInitialState = {
  allProducts: [],
  filteredProducts: [],
  currentProdId: "",
  searchByCategory: "",
  searchByFeature: "",
  searchText: "",
  isModalWindow: false,
  rerender: false,
};

export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    let result = await getData();
    return result;
  }
);

export const getFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async () => {
    let result = await getData();
    return result;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    searchByFilter: (state, action : PayloadAction<TSearchFilter>) => {
      const { selectedCategory, selectedFeature, text } = action.payload;
      state.searchByCategory = selectedCategory;
      state.searchByFeature = selectedFeature;
      state.searchText = text;
    },
    changeModalWindow: (state) => {
      state.isModalWindow = !state.isModalWindow;
    },
    passCurrentProdId: (state, action: PayloadAction<string>) => {
      state.currentProdId = action.payload;
    },
    updateProduct: (state, action: PayloadAction<TProduct>) => {
      state.filteredProducts = state.filteredProducts.map((el) => {
        if (el.id === action.payload.id) {
          return action.payload;
        }
        return el;
      });
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.filteredProducts = state.filteredProducts.filter(
        (el) => el.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<TProduct[]>) => {
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        console.log("rejected");
      })
      .addCase(
        getFilteredProducts.fulfilled,
        (state, action: PayloadAction<TProduct[]>) => {
          let result = action.payload;
          if (state.searchByCategory !== "") {
            result = result.filter(
              (item) => item.category === state.searchByCategory
            );
          }
          if (state.searchByFeature !== "") {
            result = result.filter((item) => {
              const { views, price, count, quantity, ...myProd } = item;
              type Index = keyof typeof myProd;
              const myKey = state.searchByFeature as Index;
              return myProd[myKey]!.toLowerCase().includes(state.searchText);
            });
          }
          if (state.searchText.trim() !== "" && state.searchByFeature == "") {
            result = result.filter(
              (item) =>
                item.name.toLowerCase().includes(state.searchText) ||
                item.brand.toLowerCase().includes(state.searchText)
            );
          }
          state.filteredProducts = result;
        }
      )
      .addCase(getFilteredProducts.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const {
  searchByFilter,
  changeModalWindow,
  passCurrentProdId,
  updateProduct,
  removeProduct
} = adminSlice.actions;
export default adminSlice.reducer;
