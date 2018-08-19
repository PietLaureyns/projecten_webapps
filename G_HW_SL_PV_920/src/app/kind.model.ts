import{ Gebruiker } from './gebruiker.model';

export class Kind extends Gebruiker{
//  bloedgroep: String,
//  allergieen: [String],
//  geboortedatum: Date,
//  hobbys: [String]

  constructor(
    voornaam: string,
    familienaam: string,
    //kleur: string,
    //private _bloedgroep: string,
    //private _allergieen: string[],
    //private _geboortedatum: Date,
    //private _hobbys: string[]
  ) {
     super("",voornaam,familienaam,"","",["",""]);
  }
}
