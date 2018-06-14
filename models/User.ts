import { Image } from "./Image";
import { Item } from "./Item";
import { FavoriteItem } from "./FavoriteItem";

export interface User{
    id: number;
    email: string;
    username: string;
    address: string;
    country: string;
    postalCode: string;
    photoUrl: string;
    joined: boolean;
    lastActive: boolean;
    passwordHash?: any[];
    passwordSalt?: any[];
    photo?: Image[];
    purchasedItems?: Item[];
    favoriteslist?: FavoriteItem[];
}