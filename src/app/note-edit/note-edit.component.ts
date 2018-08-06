import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import { AlertService } from '../services/alert.service';

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
  	private service: NoteService,
    private alertService: AlertService
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
      console.log("note updated");
      this.alertService.success("Note saved");
      this.router.navigate(['/notes']);
    });
  }

  onCancel() {
    this.router.navigate(['/notes']);
  }

}
