export class Contact {

  createByJson(json: JSON) {
    this._mobile = json["mobile"] || "";
    this._name = json["name"] || "";
  }

  constructor(
    private _mobile: string = "",
    private _name: string = ""
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
}
