import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { MyErrorHandler } from './error_handler'

import { FormsModule} from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { HomeComponent } from './home/home.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { ShowImportantPipe } from './show-important.pipe';
import { AlertComponent } from './alert/alert.component';

const appRoutes: Routes = [
  { path: 'notes', component: NoteListComponent },
  { path: 'home', component: HomeComponent }, 

  { path: 'note/:id', component: NoteEditComponent }, 

  { path: '',   redirectTo: '/home', pathMatch: 'full' },  
];

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    HomeComponent,
    NoteEditComponent,
    ShowImportantPipe,
    AlertComponent
  ],
  imports: [
    BrowserModule,

    FormsModule, 

    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    {
      provide: ErrorHandler, 
      useClass: MyErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }







