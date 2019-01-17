export interface Character {
    key?: string;
    name: string;
    armorClass: number;
    initiativeModifier: number;
    healthPoints: number;
    currentHealth: number;
    description: string;
    group: string;
}