import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Gezin } from '../../gezin.model';
import { GebruikerService } from '../../gebruiker.service';
import { Gebruiker } from '../../gebruiker.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gesprek } from '../../berichten/gesprek.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gezin-aanmaken',
  templateUrl: './gezin-aanmaken.component.html',
  styleUrls: ['./gezin-aanmaken.component.css']
})

export class GezinAanmakenComponent implements OnInit {

  gezin: FormGroup;
  kinderen: Gebruiker[];
  _kindToevoegen: boolean = false;
  ingelogdeGebruiker: Gebruiker; 
  familienaamVanAndereOuder;

  //TODO Na het aanmaken moet je een gesprek toevoegen die dezelfde naam heeft als het gezin.

  constructor(private fb: FormBuilder,
    private http: HttpClient, private gebruikerService: GebruikerService, private router : Router) {

  }

  //gebruiker uitnodigen checkbox om aan te duiden of hij al een account heeft, als hij bestaat
  //kijkt hij naar de backend en haalt hij de naam, als hij geen account heeft wordt gewoon de email getoont.

  ngOnInit() {
    this.gebruikerService.ingelogdeGebruiker.subscribe(item => {
      this.ingelogdeGebruiker = item;
      this.gezin = this.fb.group({
        gezinsNaam: ["", Validators.required],
        ouder1: [this.ingelogdeGebruiker.voornaam + this.ingelogdeGebruiker.familienaam,
          Validators.required],
        ouder2: ["", Validators.required],
        plusouder1: [""],
        plusouder2: [""],
      });
    });

    this.kinderen = [];
  }

  getFamilienaamAndereOuder() {
    let familienaam = this.gezin.value.ouder2;
    return familienaam.split(' ')[1];
  }

  onSubmit() {
    let naam = this.ingelogdeGebruiker.familienaam + " - " + this.getFamilienaamAndereOuder();
    let gesprek = new Gesprek( // alle gezinsleden in dit gesprek steken, backend? service?
      naam,[]
    );
    let gezin = new Gezin(
      naam,
      [],
      [],
      [],
      [gesprek]
    );

    console.log(gezin);
    this.gebruikerService.maakGezinAan(gezin).subscribe(item => console.log(item));
    this.router.navigate(['/homepage']);
  }

  kindToevoegen(nieuwKind) {
    console.log(nieuwKind);
    this.kinderen.push(nieuwKind);
    this._kindToevoegen = false;
  }

  annuleerKindAanmaken() {
    console.log("annuleer");

    this._kindToevoegen = false;
  }



}
