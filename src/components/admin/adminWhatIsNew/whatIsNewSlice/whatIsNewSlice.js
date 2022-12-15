import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../../app/store";
import { getData } from "../../adminAPI/adminAPI";
import { getLessProdId } from "../whatIsNewAPI/whatIsNewAPI";
import { store } from "../../../../app/store";

const initialState = {
  oldLessProdId: [],
  newLessProdId: [],
  products: [],
  rerender: false,
};

export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    let result = await getData();
    console.log('getted', result)
    return result;
  }
);

export const getOldLessProdId = createAsyncThunk(
  'oldLessProdId/fetchOldLessProdId',
  async () => {
    let result = await getLessProdId();
    return result;
  }
)

// export const getNewAndLessProdId = createAsyncThunk(
//   "newAndOldL/fetchNewAndOld",
//   async () => {
//     let newLess = [];
//     let currentOldLess = [];
//     let fetchedProducts = await getData();
//     let fetchOldProdId = await getLessProdId();
//     for (let item of fetchedProducts) {
//       if (item.quantity <= 10) {
//         if (!fetchOldProdId.includes(item.id)) {
//           newLess.push(item.id);
//         } else {
//           currentOldLess.push(item.id); //<=this code also gets current(changed) old less product Id
//         }
//       }
//     }
//     console.log("newLess", newLess);
//     return { newLess: newLess, currentOldLess:currentOldLess };
//   }
// );

const whatIsNewSlice = createSlice({
  name: "whatIsNew",
  initialState,
  reducers: {
    setOldLessProdId: (state, action) => {
      state.oldLessProdId = action.payload;
    },
    setNewLessProdId: (state, action) => {
      state.newLessProdId = action.payload;
    },
    forceRerender: (state) => {
      state.rerender = !state.rerender;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (satte) => {
        console.log("getProducts is rejected");
      })
      // .addCase(getNewAndLessProdId.fulfilled, (state, action) => {
      //   state.oldLessProdId = action.payload.currentOldLess;
      //   state.newLessProdId = action.payload.newLess;
      // })
      // .addCase(getNewAndLessProdId.rejected, (state) => {
      //   console.log("rejected getNewAndLessProdId");
      // });
    .addCase(getOldLessProdId.fulfilled, (state, action) => {
      state.oldLessProdId = action.payload;
    })
  },
});

export const { setOldLessProdId, setNewLessProdId, forceRerender } =
  whatIsNewSlice.actions;
export default whatIsNewSlice.reducer;
