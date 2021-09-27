export class CreatePrimeTimeDto {
    id: string;
    description: string;
    title: string;
    rank: number;
    //tags: string;
    //shared: [];
    subscriptions: [];
    //userId: string;
}

export class UpdatePrimeTimeDto {
    id: string;
    description: string;
    title: string;
    rank: number;
    //tags: string;
    //shared: [];
    subscriptions: [];
}

export class GetPrimeTimesFilterDto {
    description: string;
    title: string;
    rank: number;
}