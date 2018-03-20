import { Injectable } from '@angular/core';
import { Account, Entity, Journal, GeneralLedger } from '../models';
import { ACCOUNTS, ENTITIES, JOURNALS, GENERALLEDGERS } from '../mocks/fakedata';

@Injectable()
export class DataService {
    getAccounts(): Account[] {
        // actual implementation would use async method
        return ACCOUNTS;
    }
    getEntities(): Entity[] {
        return ENTITIES;
    }
    getJournals(): Journal[] {
        return JOURNALS;
    }
    getGeneralLedgers(): GeneralLedger[] {
        return GENERALLEDGERS;
    }
}
