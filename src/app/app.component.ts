import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUploadComponent } from './components/form-upload/form-upload.component';
import { UpdateDocumentComponent } from './components/update-document/update-document.component';
import { ViewDocumentComponent } from './components/view-document/view-document.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormUploadComponent, UpdateDocumentComponent, ViewDocumentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'view-pdfs';
}
