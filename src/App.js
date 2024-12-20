import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Auth/AuthOperations/Login";
import Register from "./Pages/Auth/AuthOperations/Register";
import Users from "./Pages/Dashboard/Users/Users";
import GoogleCallback from "./Pages/Auth/AuthOperations/GoogleCallback";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import User from "./Pages/Dashboard/Users/User";
import AddUser from "./Pages/Dashboard/Users/AddUser";
// import Err403 from "./Pages/Auth/403";
import Err404 from "./Pages/Auth/Errors/404";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";
import Categories from "./Pages/Dashboard/Category/Categories";
import AddCategory from "./Pages/Dashboard/Category/AddCategory";
import Category from "./Pages/Dashboard/Category/Category";
import Products from "./Pages/Dashboard/Product/Products";
import AddProduct from "./Pages/Dashboard/Product/AddProduct";
import UpdateProduct from "./Pages/Dashboard/Product/UpdateProduct";
import HomePage from "./Pages/HomePage/HomePage";
import WebsiteCategoreis from "./Pages/Categoreis/Categoreis";
import Website from "./Pages/Website/Website";
import ProductsPage from "./Components/Website/Product/ProductsPage/ProductsPage";
// import AllProducts from "./Components/Website/Product/AllProducts/AllProducts";
import CategoriesPage from "./Pages/Categoreis/CategoriesPage/CategoriesPage";
import Cart from "./Components/Website/Cart/Cart";
import CheckOut from "./Components/Website/CheckOut/CheckOut";
import ThankYou from "./Components/Website/CheckOut/ThankYou";
import Orders from "./Components/Website/Orders/Orders";
import OrderPage from "./Components/Website/Orders/OrderPage";
import AllOrders from "./Pages/Dashboard/Orders/AllOrders";
import DashboardOrdersPage from "./Pages/Dashboard/Orders/DashboardOrdersPage";
import Rating from "./Components/Website/Rating/Rating";
import Profile from "./Components/Website/Profile/Profile";
import ProfileEdit from "./Components/Website/Profile/ProfileEdit";
import Activity from "./Pages/Dashboard/Activity/Activity";
import Rate from "./Pages/Dashboard/Rate/Rate";
import RateEdit from "./Pages/Dashboard/Rate/RateEdit";
import ReloadPage from "./Components/Website/CheckOut/ReloadPage";
import { QueryClient, QueryClientProvider } from "react-query";
import Coupon from "./Pages/Dashboard/Coupon/Coupon";
import AddCoupon from "./Pages/Dashboard/Coupon/AddCoupon";
import EditCoupon from "./Pages/Dashboard/Coupon/EditCoupon";
import Banner from "./Pages/Dashboard/Banner/Banner";
import AddBanner from "./Pages/Dashboard/Banner/AddBanner";
import EditBanner from "./Pages/Dashboard/Banner/EditBanner";
import AllLatestSaleProducts from "./Components/Website/Product/SaleProducts/AllLatestSaleProducts";
import AllLatestProducts from "./Components/Website/Product/LatestProducts/AllLatestProducts";
import AllTopRated from "./Components/Website/Product/TopRated/AllTopRated";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* Public Routes */}
        <Routes>
          <Route element={<Website />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<WebsiteCategoreis />} />
            <Route path="/categories/:id" element={<CategoriesPage />} />
            {/* <Route path="/products" element={<AllProducts />} /> */}
            <Route path="latest-sale" element={<AllLatestSaleProducts />} />
            <Route path="latest-products" element={<AllLatestProducts />} />
            <Route path="all-top-rated" element={<AllTopRated />} />
            <Route path="products/:id" element={<ProductsPage />} />
            <Route
              element={
                <RequireAuth allowedRole={["1996", "1995", "1999", "2001"]} />
              }
            >
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<CheckOut />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderPage />} />
              <Route path="rate/:id" element={<Rating />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/edit/:id" element={<ProfileEdit />} />
              <Route path="/thankyou" element={<ThankYou />} />
            </Route>
            <Route element={<RequireBack />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Route>
          </Route>
          <Route path="/reload" element={<ReloadPage />} />

          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/*" element={<Err404 />} />

          {/* Protected Routes */}
          <Route
            element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}
          >
            <Route path="/dashboard" element={<Dashboard />}>
              {/* Admin */}
              <Route element={<RequireAuth allowedRole={["1995"]} />}>
                <Route path="users" element={<Users />} />
                <Route path="orders" element={<AllOrders />} />
                <Route path="rate" element={<Rate />} />
                <Route path="activity" element={<Activity />} />
                <Route path="users/:id" element={<User />} />
                <Route path="user/add" element={<AddUser />} />
                <Route path="orders/:id" element={<DashboardOrdersPage />} />
                <Route path="rate/:id" element={<RateEdit />} />
                <Route path="coupon" element={<Coupon />} />
                <Route path="coupon/add" element={<AddCoupon />} />
                <Route path="coupon/:id" element={<EditCoupon />} />
                <Route path="banner" element={<Banner />} />
                <Route path="banner/add" element={<AddBanner />} />
                <Route path="banner/:id" element={<EditBanner />} />
              </Route>

              {/* Categories Manager */}
              <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
                {/* Categories*/}
                <Route path="categories" element={<Categories />} />
                <Route path="category/add" element={<AddCategory />} />
                <Route path="categories/:id" element={<Category />} />
                {/* Products */}
                <Route path="products" element={<Products />} />
                <Route path="product/add" element={<AddProduct />} />
                <Route path="products/:id" element={<UpdateProduct />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
