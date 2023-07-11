import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map,finalize, switchMap, forkJoin } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-my-comttt',
  templateUrl: './my-comttt.component.html',
  styleUrls: ['./my-comttt.component.css']
})
export class MyComtttComponent implements OnInit {
  imageUrls$?: Observable<string[]>;

  items$?: Observable<any[]>;
  constructor(private firebaseService: FirebaseService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
    ) {}
  ngOnInit() {
    this.imageUrls$ = this.getImages();

  }
 
  getImages(): Observable<string[]> {
    const imagesRef = this.storage.ref('images');
    return imagesRef.listAll().pipe(
      switchMap(res => {
        const downloadUrlObservables = res.items.map(item => item.getDownloadURL());
        return forkJoin(downloadUrlObservables);
      }),
      finalize(() => console.log('Image fetching completed.')) // Optional: Log completion
    );
  }
  

  selectedFile?: File;
  content?: string;


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (this.selectedFile) {
      this.firebaseService.uploadImage(this.selectedFile);
    }
  }

}
