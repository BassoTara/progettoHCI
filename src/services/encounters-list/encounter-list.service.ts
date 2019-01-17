import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Encounter } from "../../models/encounter/encounter.model";
import { Character } from "../../models/character/character.model";

@Injectable()
export class EncountersListService {

    // Create a list initialized with the content of table encounters
    private encountersListRef = this.db.list<Encounter>('encounters-list');
    
    constructor(private db: AngularFireDatabase){ }

    getEncountersList(){
        return this.encountersListRef;
    }

    addEncounter(encounter: Encounter){
        return this.encountersListRef.push(encounter);
    }

    removeEncounter(encounter: Encounter){
        return this.encountersListRef.remove(encounter.key);
    }

    editEncounter(encounter : Encounter){
        return this.encountersListRef.update(encounter.key, encounter);
    }
}