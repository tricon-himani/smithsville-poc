import { Account, Entity, Journal, GeneralLedger } from '../models';

export const ACCOUNTS: Account[] = [
    {
        id: 1,
        account_number: 1010,
        description: 'Cash',
        control_account: 1010
    },
    {
        id: 2,
        account_number: 1050,
        description: 'Due to Smith County',
        control_account: 1050
    },
    {
        id: 2,
        account_number: 1060,
        description: 'Due From State government',
        control_account: 1060
    },
    {
        id: 2,
        account_number: 6010,
        description: 'Expenditures',
        control_account: 6100
    },
    {
        id: 2,
        account_number: 1250,
        description: 'Land',
        control_account: 1250
    }
];


export const ENTITIES: Entity[] = [
    {
        id: 1,
        fund: 1,
        description: 'General Fund'
    },
    {
        id: 2,
        fund: 3,
        description: 'Street Improvement Fund',
    }
];

export const JOURNALS: Journal[] = [
    {
        id: 1,
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 2,
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 3,
        posted: false,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 4,
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 5,
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 6,
        posted: false,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 7,
        posted: false,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 123.43,
        ref_2: 101
    }
];


export const GENERALLEDGERS: GeneralLedger[] = [
    {
        id: 1,
        account: 'Cash',
        ref: 101,
        year: 2018,
        account_description: '2b',
        debits: 111.10,
        credits: 111.10,
        balance: 0
    }
];
