import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { StreamChatModule } from 'stream-chat-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewChannelComponent } from './new-channel/new-channel.component'; 
import { InviteButtonComponent } from './invite-button/invite-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Import this
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    StreamChatModule,
    MatAutocompleteModule,
    NewChannelComponent,
    InviteButtonComponent,
    NoopAnimationsModule
  ],
  exports: [
    NewChannelComponent, 
    InviteButtonComponent,
  ]
})
export class ChannelsModule { }