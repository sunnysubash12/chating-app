import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { StreamChatModule } from 'stream-chat-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewChannelComponent } from './new-channel/new-channel.component'; // Importing the component

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    StreamChatModule,
    MatAutocompleteModule,
    NewChannelComponent  // ✅ Import standalone component here
  ],
  exports: [
    NewChannelComponent, // ✅ Now it can be exported
  ]
})
export class ChannelsModule { }