import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Group } from "../../models/group/group.model";

@Injectable()
export class GroupsListService {

    // Create a list initialized with the content of table groups
    private groupsListRef = this.db.list<Group>('groups-list');
    
    constructor(private db: AngularFireDatabase){ }

    getGroupsList(players: boolean){
        return this.db.list<Group>('groups-list', ref => ref.orderByChild('players').equalTo(players));
    }

    addGroup(group: Group){
        return this.groupsListRef.push(group);
    }

    editGroup(group: Group){
        return this.groupsListRef.update(group.key, group);
    }

    removeGroup(group: Group){
        return this.groupsListRef.remove(group.key);
    }


}