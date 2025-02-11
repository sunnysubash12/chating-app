import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../user.service'; // Adjust the import path
import { ChatClientService } from 'stream-chat-angular';
import { of } from 'rxjs'; // Use rxjs 'of' to emit empty response for clearing state
@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  @Input() currentUserName: string = ''; // Use @Input() to receive the value from the parent
  @Output() logoutEvent = new EventEmitter<void>();  // Emit event on logout button click

  onLogoutClick() {
    this.logoutEvent.emit();  // Emit event to parent
  }

  constructor(
    private userService: UserService,
    private chatClientService: ChatClientService
  ) {}
  }
