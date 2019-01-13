import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Encounter } from "../../models/encounter/encounter.model";

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
}