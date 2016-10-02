import {Md5} from 'ts-md5/dist/md5';
import {Injectable} from "@angular/core";

/**
 * @returns String unixTimestamp
 * @var Date timestamp
 */
@Injectable()

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
@Injectable()

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
  myCookie: any;
  constructor(myType: string, secret: string) {
  let timestamp = new UnixTimeStamp();
  let myToken = new CreateHash(timestamp, secret);
  this.myCookie = {
      'hashed': myToken.hashed,
      'loginP': myType,
    };
  this.myCookie = JSON.stringify(this.myCookie);
  }

}

