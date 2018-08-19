import { Reactie } from "./reactie.model";

export class Blog {

  constructor(
    public titel: string,
    public beschrijving: string,
    public datum: Date,
    public reacties: Reactie[],
    public id?: string
    ) { }

  static fromJSON(json): Blog {
    let reacties2: Reactie[] = json.reacties;
    let reacties3: Reactie[] = [];
    if (reacties2.length > 0) {
      reacties2.forEach(reactie => {
        reacties3.push(Reactie.fromJSON(reactie));
      });
    }
    const rec = new Blog(json.titel, json.beschrijving, new Date(json.datum), reacties3);
    rec.id = json._id;
    return rec;
  }

  public toJSON() {
    return {
      titel: this.titel,
      beschrijving: this.beschrijving,
      datum: this.datum,
      reacties: this.reacties,
      id: this.id
    }
  }

  getDatum(): string {
    return this.datum.toLocaleDateString();
  }

  getAantalReacties(): number {
    return this.reacties.length;
  }
}
