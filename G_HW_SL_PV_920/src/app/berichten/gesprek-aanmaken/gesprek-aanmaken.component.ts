import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Gesprek } from "../gesprek.model";
import { Bericht } from "../bericht.model";
import { GebruikerService } from '../../gebruiker.service';
import { Gezin } from '../../gezin.model';

@Component({
  selector: 'app-gesprek-aanmaken',
  templateUrl: './gesprek-aanmaken.component.html',
  styleUrls: ['./gesprek-aanmaken.component.css']
})
export class GesprekAanmakenComponent implements OnInit {

  nieuwGesprek;
  //@Input() gezinsLeden;
  gezinsLedenExcl;
  //@Input() aangemeldeGebruiker;
  @Output() nieuwGesprek2 = new EventEmitter<Gesprek>();
  @Output() annuleren = new EventEmitter<boolean>();
  ingelogdeGebruiker;
  //get personen(): FormArray {
  //    return <FormArray>this.nieuwGesprek.get('personen');
  //}

  constructor(private fb: FormBuilder, private gebruikerService: GebruikerService) { }

  ngOnInit() {
    //this.nieuwGesprek = this.fb.group({
    //  titel: [
    //    "", [/*Titel van gesprek.*/
    //      Validators.required, Validators.maxLength(20),
    //      Validators.minLength(2)
    //    ]
    //  ],
    //  personen: this.buildPersonen()
    //});
    this.gebruikerService.ingelogdeGebruiker.subscribe(gebruiker => {
      this.ingelogdeGebruiker = gebruiker;
      this.gebruikerService.haalGezinUitDatabase().subscribe((gezin: Gezin) => {
        let gezin2 = gezin;
        this.gezinsLedenExcl = gezin2.gezinsleden.map(lid => {
          if (lid.id !== this.ingelogdeGebruiker.id) return lid;
        });
        this.nieuwGesprek = this.fb.group({
          titel: [
            "", [/*Titel van gesprek.*/
              Validators.required, Validators.maxLength(20),
              Validators.minLength(2)
            ]
          ],
          personen: this.buildPersonen()
        });
      });
    });

    //this.nieuwGesprek.value.personen = this.gezinsLedenExcl;
  }

  buildPersonen() {
    const arr = this.gezinsLedenExcl.map(persoon => {
      return this.fb.control(true);
    });
    return this.fb.array(arr);
  }

  get personen(): FormArray {
    return this.nieuwGesprek.get('personen') as FormArray;
  };


  gesprekAanmakenAnnuleren() {
    //TODO implementeren
    this.annuleren.emit(true);
  }

  maakPersoon(bool: boolean, id, naam): FormGroup {
    return this.fb.group({
      checked: [bool],
      id: [id],
      naam: [naam]
    });
  }

  onSubmit() {
    console.log(this.nieuwGesprek);
    let berichten: Bericht[] = [];

    let nieuwGesprek = new Gesprek(
      this.nieuwGesprek.value.titel,
      this.nieuwGesprek.value.personen,
      //this.getBetrokkenPersonen(),
      berichten
    );
    this.nieuwGesprek2.emit(nieuwGesprek);
  }

  getBetrokkenPersonen() {
    let personen = [];
    for (var i = 0; i < this.gezinsLedenExcl.length; i++) {
      if (this.nieuwGesprek.value.betrokkenPersonen[i]) {
        personen.push(this.gezinsLedenExcl[i]);
      }
    }
    return personen;
  }

}
