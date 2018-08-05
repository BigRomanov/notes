import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  // Note that will be edited in the component
	note : Note;

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private service: NoteService
	) {}

  ngOnInit() {

    this.route.paramMap.pipe(switchMap((params: ParamMap) =>
        this.service.get(params.get('id')))
    ).subscribe(result => {
      console.log("Result", result);
      this.note = result;
    });

  }

  onSubmit() {
    this.service.save(this.note).subscribe(result => {
      console.log("note updated")
      this.router.navigate(['/notes']);
    });
  }

}
