import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PiggyBankDTO} from "../model/PiggyBankDTO";
import {ResposeApi} from "../model/ResposeApi";
import {DenominationDTO} from "../model/DenominationDTO";

@Injectable({
  providedIn: 'root'
})
export class PinggyBankService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getDataInit(): Observable<{bank: PiggyBankDTO[]; denominations: DenominationDTO[]}> {
    return forkJoin([this.getStatusPinggyBank(), this.getDenominations()]).pipe((map(result => {
      return {bank: result[0].data, denominations: result[1].data}
    })));
  }

  public getStatusPinggyBank(): Observable<ResposeApi<PiggyBankDTO[]>> {
    return this.http.get<ResposeApi<PiggyBankDTO[]>>(`${environment.uri}/bank`);
  }

  public getDenominations(): Observable<ResposeApi<DenominationDTO[]>> {
    return this.http.get<ResposeApi<DenominationDTO[]>>(`${environment.uri}/denomination`);
  }

  public updateItemBank(denomination: DenominationDTO): Observable<ResposeApi<PiggyBankDTO>> {
    return this.http.put<ResposeApi<PiggyBankDTO>>(`${environment.uri}/bank`, denomination);
  }

  public cleanBank(): Observable<ResposeApi<string>> {
    return this.http.delete<ResposeApi<string>>(`${environment.uri}/bank`);
  }
}
