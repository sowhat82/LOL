import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { SearchResultsComponent } from './components/search-results.component';
import { HttpService } from './http.service';
import { WineDetailsComponent } from './components/wine-details.component';
import { FavouriteWinesComponent } from './components/favourite-wines.component';

const ROUTES: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'searchResults', component: SearchResultsComponent },
	{ path: 'wineDetails', component: WineDetailsComponent },
	{ path: 'favouriteWines', component: FavouriteWinesComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SearchResultsComponent,
    WineDetailsComponent,
    FavouriteWinesComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(ROUTES), FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [AuthService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
