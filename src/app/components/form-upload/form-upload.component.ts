import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-upload',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-upload.component.html',
  styleUrl: './form-upload.component.css'
})
export class FormUploadComponent {
  urlApi: string = 'http://localhost:8080/api/upload';

  selectedFile: File | null = null;

  constructor(private http: HttpClient){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if(this.selectedFile){
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post(this.urlApi, formData, {
        responseType: 'text'
      }).subscribe({
        next: (response: string) => {
          console.log(response);
          alert(response);
        },
        error: (error) => {
          console.error('Erro:', error);
          alert('Erro ao enviar o arquivo');
        }
      });
    }
  }
}
