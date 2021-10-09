export class CreatePrimeTimeDto {
    id: string;
    description: string;
    title: string;
    rank: number;
    tags: []
    shared: [];
    subscriptions: [];
    //user: string
}

export class UpdatePrimeTimeDto {
    id: string;
    description: string;
    title: string;
    rank: number;
    tags: [];
    shared: [];
    subscriptions: [];
    //user: string
}

export class GetPrimeTimesFilterDto {
    description: string;
    title: string;
    rank: number;
}