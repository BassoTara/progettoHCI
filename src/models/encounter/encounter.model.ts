export interface Encounter {
    key?: string;
    name: string;
    turn: number;
    characterKeys: string[];
    monsterList;
    initiatives;
}