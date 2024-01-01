export interface TokenType {
  name: string;
  image: string | undefined;
  allowRotate: boolean;
  blocked: boolean;
  rotation: number;
}
export class TokenClass implements TokenType {
  /* Class used to represent the core state of a token for save/load */
  name: string;
  image: string | undefined;
  allowRotate: boolean;
  blocked: boolean;
  rotation: number;
  constructor(name: string, image: string | undefined, allowRotate: boolean, blocked: boolean, rotation: number) {
    this.name = name;
    this.image = image;
    this.allowRotate = allowRotate;
    this.blocked = blocked;
    this.rotation = rotation;
  }
}
  