import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "NYC Energy Maps Server Home";
  }
}
