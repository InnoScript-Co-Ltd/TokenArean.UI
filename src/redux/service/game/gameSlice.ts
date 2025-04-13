import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGame,
  fetchCreateGame,
  fetchUpdateGame,
  fetchDeleteGame,
  fetchGameDetail,
} from "@/redux/api/game/gameApi";
import {
  Game,
  GameDetailResponse,
  GameEntryResponse,
  GameListResponse,
  PaginationParams,
} from "@/constants/config";

interface GameState {
  games: Game[] | [];
  gameDetail: Game | null;
  total: number;
  totalPages: number;
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GameState = {
  games: [],
  gameDetail: null,
  total: 0,
  totalPages: 0,
  totalCount: 0,
  status: "idle",
  error: null,
};

// Thunks
export const loadGames = createAsyncThunk<
  GameListResponse,
  { pagination: PaginationParams; searchTerm: string | undefined },
  { rejectValue: string }
>("game/loadGames", async ({ pagination, searchTerm }, { rejectWithValue }) => {
  try {
    return await fetchGame(pagination, searchTerm);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const createGame = createAsyncThunk<
  GameEntryResponse,
  FormData,
  { rejectValue: string }
>("game/createGame", async (payload, { rejectWithValue }) => {
  try {
    return await fetchCreateGame(payload);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const updateGame = createAsyncThunk<
  GameEntryResponse,
  { id: string; data: FormData },
  { rejectValue: string }
>("game/updateGame", async ({ id, data }, { rejectWithValue }) => {
  try {
    // console.log("update game:", id);
    return await fetchUpdateGame(id, data);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const deleteGame = createAsyncThunk<
  GameEntryResponse,
  string,
  { rejectValue: string }
>("game/deleteGame", async (id, { rejectWithValue }) => {
  try {

    return await fetchDeleteGame(id);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const loadGameDetail = createAsyncThunk<
  GameDetailResponse,
  string,
  { rejectValue: string }
>("game/loadGameDetail", async (id, { rejectWithValue }) => {
  try {
    return await fetchGameDetail(id);

  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

// Slice
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearGameData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // loadGames
      .addCase(loadGames.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadGames.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.games = payload?.payLoad?.items;
        state.totalPages = payload?.payLoad?.paging?.totalPages;
        state.totalCount = payload?.payLoad?.paging?.totalCount;
      })
      .addCase(loadGames.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to load games";
      })

      // createGame
      .addCase(createGame.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createGame.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.games = [payload?.payLoad, ...(state.games || [])];
        state.totalCount = state.totalCount + 1;
      })
      .addCase(createGame.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to create game";
      })

      // updateGame
      .addCase(updateGame.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateGame.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const updatedGame = payload.payLoad;
        const idx = state.games.findIndex((g) => g.id === payload.payLoad.id);
        if (idx !== -1) state.games[idx] = updatedGame;
      })
      .addCase(updateGame.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to update game";
      })

      // deleteGame
      .addCase(deleteGame.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteGame.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const deletedId = payload?.payLoad.id;

        state.games = state.games.filter((g) => g.id !== deletedId);
        state.totalCount = state.totalCount - 1;
      })
      .addCase(deleteGame.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to delete game";
      })

      // gameDetail
      .addCase(loadGameDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadGameDetail.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.gameDetail = payload?.payLoad;
      })
      .addCase(loadGameDetail.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to load game detail";
      });
  },
});

export const { clearGameData } = gameSlice.actions;
export default gameSlice.reducer;
