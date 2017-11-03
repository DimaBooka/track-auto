export class Contact {

  createByJson(json: JSON) {
    this._mobile = json["mobile"] || "";
    this._name = json["name"] || "";
    this.email = json["email"] || "";
  }

  constructor(
    private _mobile: string = "",
    private _name: string = "",
    private _email: string = ""
  ) {}

  public get mobile() {
    return this._mobile;
  }

  public set mobile(mobile: string) {
    this._mobile = mobile;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }
  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }
}
