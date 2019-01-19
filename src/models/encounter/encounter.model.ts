export interface Encounter {
    key?: string;
    name: string;
    description: string;
    turn: number;
    characterKeys: string[];
    monsterList;
    initiatives;
}