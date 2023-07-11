import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/compat';
import { Observable, finalize } from 'rxjs';
import 'firebase/storage';


interface Image {
  filename: string;
  url: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    // Rest of the code...
  
      uploadForm: FormGroup;
      selectedFile?: File | null;
      uploadProgress: number | null = null;
      downloadUrl: string | null = null;
    
      constructor(
        private formBuilder: FormBuilder,
        private storage: AngularFireStorage,

        private firestore: AngularFirestore
      ) {
        this.uploadForm = this.formBuilder.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          orderContents: ['', Validators.required],
          image: [null, Validators.required]
        });
      }
    
      onFileSelected(event: any) {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
          this.selectedFile = fileInput.files[0];
          this.uploadForm.patchValue({
            image: this.selectedFile
          });
        }
      }
    
      onSubmit() {
        const { title, description, orderContents, image } = this.uploadForm.value;
        
        if (image) {
          const filePath = `images/${image.name}`;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, image);
      
          task.percentageChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url: string) => {
                this.downloadUrl = url;
      
                // Save additional fields along with the download URL
                this.saveData(title, description, orderContents);
              });
            })
          ).subscribe((percentage: number | undefined) => {
            this.uploadProgress = percentage !== undefined ? percentage : null;
          });
        }
      }
      
      saveData(title: string, description: string, orderContents: string) {
        const data = {
          title,
          description,
          orderContents,
          imageUrl: this.downloadUrl
        };
      
        this.firestore.collection('products-food').add(data)
          .then((docRef) => {
            console.log('WRM6lkDLyXbGHT4qE9Ql:', docRef.id);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }
      
      
    }
    
  