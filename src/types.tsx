export interface TokenType {
  name: string;
  image: string | undefined;
  allowRotate: boolean;
  blocked: boolean;
  rotation: number;
  type: string;
}
export class TokenClass implements TokenType {
  /* Class used to represent the core state of a token for save/load */
  name: string;
  image: string | undefined;
  allowRotate: boolean;
  blocked: boolean;
  rotation: number;
  type: string;
  constructor(name: string, image: string | undefined, allowRotate: boolean, blocked: boolean, rotation: number, type: string) {
    this.name = name;
    this.image = image;
    this.allowRotate = allowRotate;
    this.blocked = blocked;
    this.rotation = rotation;
    this.type = type;
  }
}
  