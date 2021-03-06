import { Injectable, group } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Group } from "../../models/group/group.model";
import { CharactersListService } from "../characters-list/characters-list.service";
import { Character } from "../../models/character/character.model";

@Injectable()
export class GroupsListService {

    // Create a list initialized with the content of table groups
    private groupsListRef = this.db.list<Group>('groups-list');

    constructor(private db: AngularFireDatabase, private characters: CharactersListService) { }

    getGroupsList(players: boolean) {
        return this.db.list<Group>('groups-list', ref => ref.orderByChild('players').equalTo(players));
    }

    addGroup(group: Group) {
        return this.groupsListRef.push(group);
    }

    editGroup(group: Group) {
        return this.groupsListRef.update(group.key, group);
    }

    removeGroup(group: Group) {
        this.removeCharactersListByGroupKey(group.key);
        return this.groupsListRef.remove(group.key);
    }

    removeCharactersListByGroupKey(key: string) {

        let charactersList = this.characters.getCharactersListByGroupKey(key).snapshotChanges().map(
            changes => {
                return changes.map(c => ({
                    key: c.payload.key, ...c.payload.val(),
                }));
            }
        );

        charactersList.subscribe((list) => {
            for (let character of list) {
                this.characters.removeCharacter(character);
            }
        })


    }

}