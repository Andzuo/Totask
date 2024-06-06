import { Card, List } from "@prisma/client";

export type LisWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };