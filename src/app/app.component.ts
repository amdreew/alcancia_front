import { Component } from '@angular/core';
import {PinggyBankService} from "./service/pinggy-bank.service";
import {PiggyBankDTO} from "./model/PiggyBankDTO";
import {DenominationDTO} from "./model/DenominationDTO";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'alcancia';
  sumall: number = 0;
  monedas: number = 0;
  mensaje = 'No sea agregado ninguna Moneda';
  cambio: boolean = false;
  obejctMonedas: PiggyBankDTO[] = [];
  denominations: DenominationDTO[] = [];

  constructor(private readonly pinggyBankService: PinggyBankService) {
    this.loadData();
  }

  private loadData(): void {
    this.pinggyBankService.getDataInit().subscribe(res => {
      this.obejctMonedas = res.bank;
      this.denominations = res.denominations;
      this.listBank();
    });
  }

  addMoney() {
    this.cambio = true;
  }

  toggle(denomination: DenominationDTO): void{
    this.pinggyBankService.updateItemBank(denomination).subscribe(res => {
      this.listBank();
    })
  }


  public clean(): void {
    alert('Cantidad despues de romper la alcancia' + '    ' + this.sumall);
    this.pinggyBankService.cleanBank().subscribe(res => {
      alert(res.data);
      this.listBank();
    })
  }

  private listBank(): void {
    this.pinggyBankService.getStatusPinggyBank().subscribe(res => {
      this.obejctMonedas = res.data;
      this.sumall = 0;
      this.monedas = 0;
      this.obejctMonedas.forEach(x => {
        this.sumall += x.amount * x.denomination.value;
        this.monedas += x.amount;
      });
    })
  }

}
