import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    user: {},
    isAuth: false,
    loading: false,
    error: null,
};

export const getRegister = createAsyncThunk(
    "register/getRegister",
    async (data, { rejectWithValue }) => {
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            };
            const response = await fetch(`http://localhost:3094/register`, requestOptions);

            if (!response.ok) {
                throw new Error(`An error has occurred: ${response.status}`);
            }

            const user = await response.json();



            return user;
        } catch (error) {
            return rejectWithValue(error.message); // Hata mesajını serileştirilebilir hale getiriyoruz
        }
    }
);

export const getLogin = createAsyncThunk(
    "login/getLogin",
    async (data, { rejectWithValue }) => {
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Eğer çerezler kullanılacaksa
                body: JSON.stringify({ email: data.email, password: data.password }),
            };
            const response = await fetch(`http://localhost:3094/login`, requestOptions);

            if (!response.ok) {
                throw new Error(`An error has occurred: ${response.status}`);
            }

            const user = await response.json()

            // Token'ı localStorage'a kaydediyoruz
            if (user && user.token) {
                localStorage.setItem("token", user.token);  // Token'ı kaydediyoruz
            }

            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (token, { rejectWithValue }) => {
        try {


            if (!token) {
                throw new Error("Token bulunamadı");
            }

            const response = await fetch(`http://localhost:3094/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,  // Token'ı Authorization başlığıyla gönderiyoruz
                },
            });

            if (!response.ok) {
                throw new Error(`An error has occurred: ${response.status}`);
            }

            const user = await response.json()
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getLogout = createAsyncThunk(
    "logout/getLogout",
    async ({ rejectWithValue }) => {
        try {

            await fetch(`http://localhost:3094/logout`);

            if (!response.ok) {
                throw new Error(`An error has occurred: ${response.status}`);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getForgot = createAsyncThunk(
    "forgot/getForgot",
    async (email) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email })
        }
        const response = await fetch("http://localhost:3094/forgot", requestOptions)
        let res = await response.json()
        return res
    }
)

export const getReset = createAsyncThunk(
    "reset/getReset",
    async (params) => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ password: params.password })
        }
        const response = await fetch(`http://localhost:3094/reset/${params.token}`, requestOptions)
        let res = await response.json()
        return res
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRegister.pending, (state) => {
            state.loading = true;
            state.isAuth = false;
            state.error = null;
        });
        builder.addCase(getRegister.fulfilled, (state, action) => {
            state.loading = false;

            state.user = action.payload;
            toast.success("Kayıt işlemi başarılı");
        });
        builder.addCase(getRegister.rejected, (state, action) => {
            state.loading = false;
            state.isAuth = false;
            state.error = action.payload; // rejectWithValue ile dönen hata
            toast.error("Bir hata oluştu: " + action.payload);
        });
        builder.addCase(getLogin.pending, (state) => {
            state.loading = true;
            state.isAuth = false;
            state.error = null;
        });
        builder.addCase(getLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.user = action.payload;
            toast.success("Giriş işlemi başarılı");
        });
        builder.addCase(getLogin.rejected, (state, action) => {
            state.loading = false;
            state.isAuth = false;
            state.error = action.payload;
            toast.error("Bir hata oluştu: " + action.payload);
        });
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.isAuth = false;
            state.error = null;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.user = action.payload;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.isAuth = false;
            state.error = action.payload;
            toast.error("Bir hata oluştu: " + action.payload);
        });
        builder.addCase(getForgot.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getForgot.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getForgot.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Bir hata oluştu: " + action.payload);
        })
        builder.addCase(getReset.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getReset.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getReset.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast.error("Bir hata oluştu: " + action.payload);
        })
    },
});

export const { } = userSlice.actions;
export default userSlice.reducer;
