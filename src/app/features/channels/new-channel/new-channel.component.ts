import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-new-channel',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,     
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
