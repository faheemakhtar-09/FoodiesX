import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  uploadImage(image: File) {
    // Generate a unique filename for the image
    const filename = `${new Date().getTime()}_${image.name}`;

    // Upload the image to Firebase Storage in the "images" folder
    const imageRef = this.storage.ref('images/' + filename);
    const task = this.storage.upload('images/' + filename, image);

    // Get the download URL of the uploaded image
    task.snapshotChanges().pipe(
      finalize(() => {
        imageRef.getDownloadURL().subscribe((downloadUrl: any) => {
          // Save the download URL to Firestore or perform other operations
          console.log('Image uploaded:', downloadUrl);
        });
      })
    ).subscribe();
  }
}
