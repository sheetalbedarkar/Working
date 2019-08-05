import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/core/service/note.service';
import { noteModel } from '../../core/model/noteModel';
import { MatSnackBar} from '@angular/material';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-archive-note',
  templateUrl: './archive-note.component.html',
  styleUrls: ['./archive-note.component.scss']
})
export class ArchiveNoteComponent implements OnInit {
  @Input() noteData : any
  note : noteModel = new noteModel();
  notes : any[];
  isArchive
  constructor(
    private snackBar: MatSnackBar, 
    private noteService: NoteService,
    public matDialog : MatDialog
  ) { }

  ngOnInit() {
    this.getAllArchiveNotes();
  }

/** 
 * function for displaying all archived Note
 */
  getAllArchiveNotes() {
    this.noteService.getAllArchiveNotes('note/getAllArchiveNotes').subscribe(
      (response: any) => 
      {
      console.log(response);
      //this.note = response;
      this.notes = response.result
    })
  }

  onArchive(items,$event) {
    this.isArchive = $event
    var data = {
      "id" : items._id
    }
    console.log("data",data)
    console.log("isArchive noteId :::::::",data)
    this.noteService.archiveNote('note/archiveNote/'+data.id,data).subscribe(

      (response: any) => {
        
          this.snackBar.open(
            "Note is unarchived",
            "undo",
            { duration: 2500 }
          )

        },
        (error: any) =>
        {
          this.snackBar.open(
            "Notes unarchived failed",
            "undo",
          )
          }
    )
  }

  colorCodes =
  [
    [
      { name: "white", hexcode: "#ffffff" },
      { name: "lightGreen", hexcode: "#ccff8f" },
      { name: "purple", hexcode: "#d8aefb" },
      { name: "red", hexcode: "#f28b82" },
    ],
    [
      { name: "Teal", hexcode: "#a7feeb" },
      { name: "pink", hexcode: "#fdcfe8" },
      { name: "orange", hexcode: "#fbbd03" },
      { name: "blue", hexcode: "#cbf0f8" },
    ],
    [
      { name: "brown", hexcode: "#e6c9a8" },
      { name: "yellow", hexcode: "#fff474" },
      { name: "darkBlue", hexcode: "#aecbfa" },
      { name: "gray", hexcode: "#e8eaed" }
    ]
  ]

    

    changeColor(color, items) {
      console.log("items",items)
     // this.color = $event
      console.log("get color", color);
      var data = {
        "color": color,
        "id": items._id
      }
      console.log("jdfdhfhd", data);
  
      this.noteService.postColor('note/setColor',data).subscribe(
        (response: any) => {
          console.log(response);
         
          this.getAllArchiveNotes();
          this.snackBar.open(
            'note color updated Successfully..', 
            'End now', 
            { duration: 1000 });
  
        },
        error => {
          console.log(error);
          this.snackBar.open(
            'note color not updated', 
            'End now', 
            { duration: 1000 });
        })
    }


}
