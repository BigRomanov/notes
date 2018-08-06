import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes : Note[] = [];
  private message:string;
  private show_message:boolean = false;
  private show_important:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.noteService.load().subscribe(result => {
      console.log(result);
      this.notes = result;
    });

    this.route.queryParams.subscribe(params => {
        this.show_important = params['important'] == 'true';
    });
  }

  deleteNote(note) {
    this.noteService.destroy(note).subscribe(result => {
      this.notes = result;
      this.alertService.error("Note deleted");
      // this.message = "Note deleted";
      // this.show_message = true;
    })
  }

  undoDelete() {
    this.noteService.undoDelete().subscribe(result => {
      this.notes = result;
      this.show_message = false;
    });
  }

}
