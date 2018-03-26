export class Account {
    account_number: number;
    description: string;
    control_account: number;
    child_accounts: ChildAccount[];
}

export class ChildAccount {
    account_number: number;
    description: string;
    control_account: number;
}
