import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';


const initialState = {
    products: [],
    adminProducts: [],
    product: {},
    loading: false,
    error: null,
};

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (params) => {
        try {

            const url = params.keyword
                ? `http://localhost:3094/products?keyword=${params.keyword}&rating[gte]=${params.rating || 0}&price[gte]=${params.price.min || 0}&price[lte]=${params.price.max || 30000}`
                : params.category ? `http://localhost:3094/products?keyword=${params.keyword}&rating[gte]=${params.rating || 0}&price[gte]=${params.price.min || 0}&price[lte]=${params.price.max || 30000}&category=${params.category}` : `http://localhost:3094/products`;
            const response = await fetch(url);
            if (!response.ok) {
                return `An error has occurred: ${response.status}`;
            }
            const products = await response.json();
            return products;
        } catch (error) {
            return error.message;
        }
    }
);

export const getProductDetail = createAsyncThunk(
    "product/getProductDetail",
    async (id) => {
        try {
            const response = await fetch(`http://localhost:3094/products/${id}`);
            if (!response.ok) {
                return `An error has occurred: ${response.status}`;
            }
            const products = await response.json();
            return products;
        } catch (error) {
            return error.message;
        }
    }
);

export const getAdminProduct = createAsyncThunk(
    "admin/getAdminProduct",
    async () => {
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`http://localhost:3094/admin/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,  // Token'ı Authorization başlığıyla gönderiyoruz
                },
            });
            if (!response.ok) {
                return `An error has occurred: ${response.status}`;
            }

            return await response.json();
        } catch (error) {
            return error.message;
        }
    }
);

export const addAdminProduct = createAsyncThunk(
    "addAdmin/addAdminProduct",
    async (data) => {


        const token = localStorage.getItem("token")
        try {

            const response = await fetch(`http://localhost:3094/product/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });


            if (!response.ok) {
                return `An error has occurred: ${response.status}`;
            }

            return await response.json();
        } catch (error) {
            return error.message;
        }
    }
);

export const updateAdminProduct = createAsyncThunk(
    "updateAdmin/updateAdminProduct",
    async (data) => {
        console.log(data);


        const token = localStorage.getItem("token")
        try {

            const response = await fetch(`http://localhost:3094/products/${data._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });


            if (!response.ok) {
                return `An error has occurred: ${response.status}`;
            }

            return await response.json();
        } catch (error) {
            return error.message;
        }
    }
);

export const deleteAdminProduct = createAsyncThunk("deleteAdmin/deleteAdminProduct",
    async (id, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return rejectWithValue("Kullanıcı giriş yapmamış.");
        }

        try {
            const response = await fetch(`http://localhost:3094/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });


            if (!response.ok) {
                return rejectWithValue(`An error has occurred: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getProductDetail.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        });
        builder.addCase(getProductDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getAdminProduct.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAdminProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.adminProducts = action.payload;
        });
        builder.addCase(getAdminProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(addAdminProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addAdminProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = [...state.products, action.payload];
            toast.success("Ürün Ekleme Başarılı")
        });
        builder.addCase(addAdminProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            toast.error("Ürün Eklerken Bir Hata Oluştu" + state.error)
        });
        builder.addCase(deleteAdminProduct.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteAdminProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter((i) => i.id !== action.payload.id);
        });
        builder.addCase(deleteAdminProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateAdminProduct.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateAdminProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = state.products.map((product) =>
                product._id === action.payload.product._id ? action.payload.product : product
            );
        })
        builder.addCase(updateAdminProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }


})
export const { } = productSlice.actions;
export default productSlice.reducer;