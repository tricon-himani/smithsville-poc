export class Journal {
    id: number;
    posted?: boolean;
    account: string;
    year: number;
    description: string;
    debits: number;
    credits: number;
    ref_2?: number;
}
