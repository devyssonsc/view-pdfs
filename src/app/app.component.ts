import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUploadComponent } from './components/form-upload/form-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'view-pdfs';
}
