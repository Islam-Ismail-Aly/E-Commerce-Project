import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './Components/admin-dashboard/users/users.component';
import { DashboardContentComponent } from './Components/admin-dashboard/dashboard-content/dashboard-content.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { RoleComponent } from './Components/admin-dashboard/role/role.component';
import { CategoryComponent } from './Components/admin-dashboard/category/category.component';
import { authRouteGuard } from './Authentication/auth-route.guard';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductTableComponent } from './Components/admin-dashboard/product/product-table.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductFormComponent } from './Components/admin-dashboard/product-form/product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'login', component: LoginComponent, title: 'Login', canActivate: [authRouteGuard] },
  { path: 'register', component: RegisterComponent,  title: 'Register', canActivate: [authRouteGuard] },
  { path: 'home', component: HomeComponent, title: 'Home'},
  { path: 'shop', component: ProductComponent, title: 'Shop'},
  { path: 'product-details/:id', component: ProductDetailsComponent, title: 'Product Details'},
  { path: 'about-us', component: AboutUsComponent, title: 'About Us'},
  { path: 'contact-us', component: ContactUsComponent, title: 'Contact Us'},
  { path: 'cart', component: CartComponent, title: 'Cart'},
  {
    path: 'admin',
    component: AdminDashboardComponent, title: 'Admin Dashboard', canActivate: [authRouteGuard], data: { admin: true },

    children: [
      // Admin routes
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
      { path: 'dashboard', component: DashboardContentComponent, title: 'Dashboard'},
      { path: 'users', component: UsersComponent, title: 'Users'},
      { path: 'role', component: RoleComponent, title: 'Role'},
      { path: 'products', component: ProductTableComponent, title: 'Products'},
      { path: 'add-product/:id/Edit', component: ProductFormComponent, title: 'Products'},
      { path: 'category', component: CategoryComponent, title: 'Category'},
    ]
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound'} // Handle unknown routes
];
