import { Controller, Get, Header } from "@nestjs/common";
import { BuildingsService } from "./buildings.service";

@Controller("buildings")
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  @Header("Content-Type", "text/html")
  getHome(): string {
    return this.buildingsService.getHome();
  }

  @Get("data")
  getData() {
    return this.buildingsService.getData();
  }
}
