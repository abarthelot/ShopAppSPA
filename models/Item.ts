export interface Item{
    title: string;
    isService: boolean;
    shipingAddress: string;
    shipingCountr: string;
    quantity: number;
    imageUrl: string;
    description?: string;
    createdDate?: Date;
    otherUrl?: string;
}
