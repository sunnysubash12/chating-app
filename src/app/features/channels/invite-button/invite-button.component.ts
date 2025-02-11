import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { catchError, debounceTime, from, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Channel, UserResponse } from 'stream-chat';
import { ChatClientService, DefaultStreamChatGenerics } from 'stream-chat-angular';
import { CommonModule } from '@angular/common';
import { StreamChatModule } from 'stream-chat-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../user.service';
import { trigger, transition, style, animate } from '@angular/animations';





@Component({
  selector: 'app-invite-button',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,StreamChatModule,MatFormFieldModule,MatAutocompleteModule,MatInputModule],
  templateUrl: './invite-button.component.html',
  styleUrl: './invite-button.component.scss'
})
export class InviteButtonComponent implements OnInit{
  @Input()
  channel!: Channel;

  showDialog = false;

  userSearchField = new FormControl();

  availableUsers$!: Observable<UserResponse<DefaultStreamChatGenerics>[]>;

  constructor(private chatClientService: ChatClientService,    private userService: UserService  ) { }
  ngOnInit(): void {
    this.availableUsers$ = this.userSearchField.valueChanges.pipe(
      debounceTime(300),
      startWith(''), // Start with an empty string
      switchMap((queryString) => {
        // Ensure that the queryString is a valid string before passing to autocompleteUsers
        if (typeof queryString === 'string' && queryString.trim().length > 0) {
          return from(this.chatClientService.autocompleteUsers(queryString)).pipe(
            catchError((error) => {
              console.error('Error fetching users:', error);
              return of([]); // Return an empty array on error
            })
          );
        } else {
          // If queryString is not a valid string, return an empty array
          return of([]);
        }
      }),
      tap((users) => console.log('Fetched Users:', users))
    );
  }
  

  addToChat({ option: {value:userId} }: MatAutocompleteSelectedEvent) {
    this.channel.addMembers([userId])
    this.userSearchField.reset();

  }


}
