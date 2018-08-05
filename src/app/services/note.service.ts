 import { Injectable } from '@angular/core';

//import { Observable } from 'rxjs/Rx'; // RxJS 5 Syntax

import { Observable, of } from 'rxjs';    // RxJS 6 Syntax
import { find, first } from 'rxjs/operators';

import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private id_counter = 0;
  private notes : Note[] = [ 
    { 
      id: 1, title: "Buy movie tickets", 
      body: "Latest MI movie looks promising"
    },
    { 
      id: 2, title: "Buy groceries", 
      body: "Arborio Rice, Saffron, Vegetable stock, Onions, Butter"},
    { 
      id: 3, title: "Invite guests for dinner", body: "Vera and Alex"
    },

  ]

  constructor() { }

  public load() : Observable<Note[]> {
    return of(this.notes);
  }

  public add(note: Note) {
    note.id = ++this.id_counter;
    this.notes.push(note);
    return of(this.notes);
  }

  public save(note: Note) :Observable<Note[]> {
    if (note.id) {
      let note_to_update = this.notes.find((_note) => _note.id == note.id)
      Object.assign(note_to_update, note);
      return of(this.notes);
    }
    else {
      return this.add(note);
    }
  }

  public get(id:string) :Observable<Note> {
    if (id === 'new') {
      return of(new Note());
    }
    else {
      // Get the note with required id from the data source
      return of(this.notes.find((note) => note.id == parseInt(id)));

    }
  }
}
