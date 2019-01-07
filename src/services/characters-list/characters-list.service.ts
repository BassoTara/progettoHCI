import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Character } from "../../models/character/character.model";

@Injectable()
export class CharactersListService {

    // Create a list initialized with the content of table encounters
    // TODO cosa è encounters-lisT? dOVE LO prende?
    private charactersListRef = this.db.list<Character>('characters-list');
    
    constructor(private db: AngularFireDatabase){ }

    getCharactersList(){
        return this.charactersListRef;
    }

    getCharactersListByGroupKey(key: string){
        return this.db.list<Character>('characters-list', ref => ref.orderByChild('group').equalTo(key));
    }

    addCharacter(character: Character){
        return this.charactersListRef.push(character);
    }

    editCharacter(character: Character){
        return this.charactersListRef.update(character.key, character);
    }

    removeCharacter(character: Character){
        return this.charactersListRef.remove(character.key);
    }
}