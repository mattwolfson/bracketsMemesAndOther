import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BracketComponent } from './bracket/bracket.component';
import { MemeComponent } from './meme/meme.component';

const appRoutes: Routes = [
  { path: 'brackets', component: BracketComponent },
  { path: 'meme', component: MemeComponent },
  { path: 'main', component: AppComponent },
  { path: '',   redirectTo: '/brackets', pathMatch: 'full' },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    BracketComponent,
    MemeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
