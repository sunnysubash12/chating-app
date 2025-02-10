import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-new-channel',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,        
    MatInputModule,             
    MatButtonModule,            
    MatAutocompleteModule   
  ],
  templateUrl: './new-channel.component.html',
  styleUrl: './new-channel.component.scss'
})
export class NewChannelComponent {
  @Output()
  saved = new EventEmitter<string>();

  channelName = new FormControl();

  onCreate() {
    this.saved.emit(this.channelName.value);
    this.channelName.reset('');
  }


}
