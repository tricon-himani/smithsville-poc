import { Account, Entity, Journal, GeneralLedger } from '../models';

export const ACCOUNTS: Account[] = [
    {
        account_number: 1010,
        description: 'Cash',
        control_account: 1010,
        child_accounts: []
    },
    {
        account_number: 1020,
        description: 'Taxes Receivable-Current',
        control_account: 1020,
        child_accounts: []
    },
    {
        account_number: 1021,
        description: 'Allowance for Uncollectible Current Taxes',
        control_account: 1021,
        child_accounts: []
    },
    {
        account_number: 1030,
        description: 'Taxes Receivable-Delinquent',
        control_account: 1030,
        child_accounts: []
    },
    {
        account_number: 1031,
        description: 'Allowance for Uncollectible Delinquent Taxes',
        control_account: 1031,
        child_accounts: []
    },
    {
        account_number: 6010,
        description: 'Expenditures',
        control_account: 6010,
        child_accounts: [
            {
                account_number: 6020,
                description: 'Expenditures-General Goverment',
                control_account: 6010
            },
            {
                account_number: 6030,
                description: 'Expenditures-Public Safety',
                control_account: 6010
            }
        ]
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
    },
    {
        id: 3,
        fund: 4,
        description: 'Street Improvement Bond Debt Service Fund',
    },
    {
        id: 4,
        fund: 5,
        description: 'Governmental Activities, Governmental-Wide level',
    },
    {
        id: 5,
        fund: 6,
        description: 'Solid Waste Disposal Fund',
    },
    {
        id: 6,
        fund: 7,
        description: 'Tax Agency Fund',
    }
];

export const JOURNALS: Journal[] = [
    {
        id: 1,
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 1114543.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 2,
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 1114543.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 3,
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 1114543.43,
        ref_2: 101
    },
    {
        id: 4,
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 1114543.43,
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
        posted: true,
        account:  'cash',
        year: 2018,
        description: '2b',
        debits: 111.10,
        credits: 123.43,
        ref_2: 101
    },
    {
        id: 7,
        posted: true,
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
