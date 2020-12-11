import * as crypto from "crypto";

  public setEncryptionKeyDES(sKey: string) {
    const desIV = Buffer.alloc(8);
    this.encLobby.cipher = crypto.createCipheriv(
      "des-cbc",
      Buffer.from(sKey, "hex"),
      desIV,
    );
    this.encLobby.cipher.setAutoPadding(false);
    this.encLobby.decipher = crypto.createDecipheriv(
      "des-cbc",
      Buffer.from(sKey, "hex"),
      desIV,
    );
    this.encLobby.decipher.setAutoPadding(false);

    this.isSetupComplete = true;
  }