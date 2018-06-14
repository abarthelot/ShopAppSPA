import { Item } from "./Item";

export interface FavoriteItem{
    id: number;
    item: Item[];
    itemId: number;
    userId: number;
}