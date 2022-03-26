import {DenominationDTO} from "./DenominationDTO";

export interface PiggyBankDTO {
  id: number;
  denomination: DenominationDTO;
  amount: number;
}
