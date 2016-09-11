import {Md5} from 'ts-md5/dist/md5';
import {Injectable} from "@angular/core";

/**
 * @returns String unixTimestamp
 * @var Date timestamp
 */

export class UnixTimeStamp {
  timestamp = new Date;
  unixTimeStamp: any;
  constructor() {
    this.unixTimeStamp = String(this.timestamp.getTime() / 1000 | 0);
  }
}

/**
 * @param UnixTimeStamp timeStamp
 * @returns String this.hashed
 */

export class CreateHash {
  hashed: any;
  constructor(timeStamp: UnixTimeStamp, secret: string) {

    this.hashed = Md5.hashStr(timeStamp.unixTimeStamp + secret);
  }
}

/**
 * This function is an injectable function that takes the secret keyword  as a parameter from the calling function
 * @param String secret
 * @returns String token
 */

@Injectable()
export class CreateTokenService {
  token: any;
  constructor(secret: string) {
  let timestamp = new UnixTimeStamp();
  this.token = new CreateHash(timestamp, secret);
  }
}

