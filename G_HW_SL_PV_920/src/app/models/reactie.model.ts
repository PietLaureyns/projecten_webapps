export class Reactie {

  constructor(
    public auteursId: string,
    public auteursNaam: string,
    public inhoud: string,
    public datum: Date,
    public id?: string
  ) { }

  static fromJSON(json): Reactie {
    console.log('REACTIE JSON', json);
    const rec = new Reactie(json.auteursId, json.auteursNaam, json.inhoud , new Date(json.datum));
    rec.id = json._id;
    return rec;
  }

  public toJSON() {
    return {
      auteursId: this.auteursId,
      auteursNaam: this.auteursNaam,
      inhoud: this.inhoud,
      datum: this.datum,
      id: this.id
    }
  }

  getDatum() {
    return this.datum.toLocaleDateString() + " " + this.datum.toLocaleTimeString();
  }

}
