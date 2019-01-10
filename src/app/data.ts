import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
import { url } from "inspector";

@Injectable()
export class DataProvider {

  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage) {

  }

  getFiles() {
    let ref = this.db.list('files');

    return ref.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  uploadImageCharacterToStorage(information, name): AngularFireUploadTask {
    let newName = name;

    return this.afStorage.ref(`images/characters/${newName}`).putString(information, 'data_url');
  }

  uploadToStorage(information): AngularFireUploadTask {
    let newName = `${new Date().getTime()}.txt`;

    return this.afStorage.ref(`files/${newName}`).putString(information);
  }

  storeInfoToDatabase(metainfo) {
    let toSave = {
      created: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType
    }
    return this.db.list('files').push(toSave);
  }

  deleteFile(file) {
    let key = file.key;
    let storagePath = file.fullPath;

    this.db.list('files').remove(key);

    return this.afStorage.ref(storagePath).delete();
  }

  getCharacterImgDownloadUrl(key) {
    this.afStorage.ref(`images/characters/${key}`).getDownloadURL();
  }
}
