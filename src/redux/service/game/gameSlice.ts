// src/redux/service/game/gameSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGame,
  fetchCreateGame,
  fetchUpdateGame,
  fetchDeleteGame,
} from "@/redux/api/game/gameApi";
import {
  Game,
  GameListResponse,
  GamePayload,
  PaginationParams,
} from "@/constants/config";

interface GameState {
  games: Game[];
  total: number;
  page: number;
  limit: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GameState = {
  games: [],
  total: 0,
  page: 1,
  limit: 10,
  status: "idle",
  error: null,
};

// Thunks
export const loadGames = createAsyncThunk<
  GameListResponse,
  PaginationParams | undefined,
  { rejectValue: string }
>("game/loadGames", async (pagination, { rejectWithValue }) => {
  try {
    var response = await fetchGame(pagination);
    return {
      data: response.payLoad.items, // Array of games
      total: response.payLoad.paging.total, // Total number of games
      page: pagination?.page || 1, // Current page
      limit: pagination?.perPage || 10, // Limit per page
    };
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const createGame = createAsyncThunk<
  Game,
  GamePayload,
  { rejectValue: string }
>("game/createGame", async (payload, { rejectWithValue }) => {
  try {
    return await fetchCreateGame(payload);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const updateGame = createAsyncThunk<
  Game,
  { id: string; data: GamePayload },
  { rejectValue: string }
>("game/updateGame", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await fetchUpdateGame(id, data);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const deleteGame = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("game/deleteGame", async (id, { rejectWithValue }) => {
  try {
    const res = await fetchDeleteGame(id);
    return res.id;
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
        state.games = payload.data;
        state.total = payload.total;
        state.page = payload.page;
        state.limit = payload.limit;
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
        state.games.unshift(payload);
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
        const idx = state.games.findIndex((g) => g.id === payload.id);
        if (idx !== -1) state.games[idx] = payload;
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
      .addCase(deleteGame.fulfilled, (state, { payload: deletedId }) => {
        state.status = "succeeded";
        state.games = state.games.filter((g) => g.id !== deletedId);
      })
      .addCase(deleteGame.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to delete game";
      });
  },
});

export const { clearGameData } = gameSlice.actions;
export default gameSlice.reducer;
