import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";

export interface AppStateTypes {
  coinData:any
  searchParamForFilterCoins:string
  selectedCoinsForTracking: string[];
  modalShow:boolean
}

const initialState: AppStateTypes = {
  coinData:[],
  searchParamForFilterCoins:"",
  selectedCoinsForTracking: [],
  modalShow:false,
};

export const AppSlice = createSlice({
  name: "AppSlice",
  initialState,
  reducers: {
    setCoinData: (
      state: Draft<AppStateTypes>,
      action: PayloadAction<any>
    ) => {
      state.coinData = action.payload;
    },
    setSearchParamForFilterCoins: (
      state: Draft<AppStateTypes>,
      action: PayloadAction<string>
    ) => {
      state.searchParamForFilterCoins= action.payload;
    },
    setSelectedCoinsForTracking: (
      state: Draft<AppStateTypes>,
      action: PayloadAction<string[]>
    ) => {
      state.selectedCoinsForTracking = action.payload;
    },
    setModalShow: (
      state: Draft<AppStateTypes>,
      action: PayloadAction<boolean>
    ) => {
      state.modalShow = action.payload;
    },
  },
});

export const getAppState = (state: { AppSlice: AppStateTypes }) =>
  state.AppSlice;
export const {setCoinData,setSearchParamForFilterCoins, setSelectedCoinsForTracking,setModalShow } = AppSlice.actions;

export default AppSlice.reducer;