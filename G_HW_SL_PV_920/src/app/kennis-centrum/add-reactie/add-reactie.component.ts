import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Reactie } from "../../models/reactie.model";
import { GebruikerService } from '../../gebruiker.service';

@Component({
  selector: 'app-add-reactie',
  templateUrl: './add-reactie.component.html',
  styleUrls: ['./add-reactie.component.css']
})
export class AddReactieComponent implements OnInit {

  reactie: FormGroup;


  constructor(private fb: FormBuilder, public dialogRef: MdDialogRef<AddReactieComponent>,private gebruikerService: GebruikerService,
    @Inject(MD_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.reactie = this.fb.group({
      inhoud: ["", [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    this.gebruikerService.ingelogdeGebruiker.subscribe(gebruiker => {
      let nieuweReactie = new Reactie(gebruiker.id, gebruiker.volledigeNaam, this.reactie.value.inhoud, new Date());
      this.dialogRef.close(nieuweReactie);
    });
  }

  annuleer(): void {
    this.dialogRef.close();
  }
}
