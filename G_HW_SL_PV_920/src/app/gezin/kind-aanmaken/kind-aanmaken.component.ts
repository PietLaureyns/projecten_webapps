import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { GezinAanmakenComponent } from '../gezin-aanmaken/gezin-aanmaken.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Gebruiker} from '../../gebruiker.model';

@Component({
  selector: 'app-kind-aanmaken',
  templateUrl: './kind-aanmaken.component.html',
  styleUrls: ['./kind-aanmaken.component.css']
})
export class KindAanmakenComponent implements OnInit {

  @Output() nieuwKind = new EventEmitter<Gebruiker>();
  @Output() annuleerKindAanmaken = new EventEmitter<boolean>();
  kind: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.kind = this.fb.group({
      voornaam: ["", Validators.required],
      familienaam: ["", Validators.required]
    });
  }

  onSubmit() {
    let nieuwKind = new Gebruiker(
      "",
      this.kind.value.voornaam,
      this.kind.value.familienaam,
      "",
      "",
      []
    );
    
    this.nieuwKind.emit(nieuwKind);
  }

  annuleer() {
    this.annuleerKindAanmaken.emit(false);
  }
}
