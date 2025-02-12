import { Component, OnInit, TemplateRef, ViewChild, viewChild , AfterViewInit} from '@angular/core';
import { UserService } from './user.service';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import HttpClientModule
import { TranslateModule } from '@ngx-translate/core';
import { ChannelActionsContext, ChannelPreviewContext, StreamAutocompleteTextareaModule, StreamChatModule,CustomTemplatesService, DefaultStreamChatGenerics } from 'stream-chat-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { signout } from './signout';



import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
} from 'stream-chat-angular';
import { catchError, map, Observable, switchMap, of, from } from 'rxjs';
import { NewChannelComponent } from "./features/channels/new-channel/new-channel.component";
import { InviteButtonComponent } from "./features/channels/invite-button/invite-button.component";
import { LogoutComponent } from "./features/logout/logout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatAutocompleteModule, ReactiveFormsModule, HttpClientModule, TranslateModule, StreamAutocompleteTextareaModule, StreamChatModule, NgIf, AsyncPipe, NewChannelComponent, InviteButtonComponent, LogoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {

  chatIsReady$!: Observable<boolean>;
  public users$!: Observable<any[]>;
  loginForm!: FormGroup;
  public users: any[] = [];
  public currentUserId:string='';
  public currentUserName:string='';
  title = 'chating-app'; 



@ViewChild('channelActionsTemplate')
private channelActionsTemplate!: TemplateRef<ChannelActionsContext>;
// @ViewChild('channelPreview')
// private channelPreview!: TemplateRef<ChannelPreviewContext>;

  constructor(
    private userService: UserService,
    private signout: signout,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService
  ) { }
  ngOnInit(): void {
        // Fetch user list from API
        this.userService.getUsers().subscribe((users) => {
          this.users = Array.isArray(users) ? users : []; // Ensure it's an array
        }, (error) => {
          console.error('Error fetching users:', error);  // Log any error
        });       
    this.loginForm = new FormGroup({
      phone: new FormControl('')  
    });
  }

  login() {
    const fone = this.loginForm.get('phone')?.value;  
    console.log('Logging in with phone number:', fone);
    console.log('Users array:', this.users);
    const user = this.users.find((u) => u.phone === fone.toString());  // Find user by phone number
    console.log('current user:', user);
    

    if (user) {
      this.currentUserName=user.name;
      this.currentUserId=user._id;
      console.log('User id found:', this.currentUserId);
    this.users$ = this.userService.loadUsers();
    this.streamI18nService.setTranslation();
    this.userService.loadUsers().subscribe((users) => {
      this.userService.findUserById(user._id)
      this.chatIsReady$ = this.userService.generateToken().pipe(
        switchMap((token) => this.chatService.init(
          'twghaea6bwp3',
          user._id,
          token
        )),
        switchMap(() => this.channelService.init({
          type: 'messaging',
          members: { $in: [user._id] },
        })),
        map(() => true),
        catchError(() => of(false))
      );
    });
  } else {
    console.log('User not found!');
  }
  }
  ngAfterViewInit(): void {
    // this.customTemplatesService.channelPreviewTemplate$.next(
    //   this.channelPreview
    // )
    this.customTemplatesService.channelActionsTemplate$.next(
      this.channelActionsTemplate
    )
}

  onCreate(name: string) {
    console.log('current user:', this.currentUserId);
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
        name,
        members: [this.currentUserId]
      });
    from(channel.create());
  }

  logout() {
    this.signout.log_out(this.currentUserId );
    console.log(this.currentUserId );
    // Clear user-related data
    this.currentUserId = '';
    this.users$ = of([]);  // Reset the users list if needed

    // Set chatIsReady$ to false to show the login form
    this.chatIsReady$ = of(false);
    this.loginForm.get('phone')?.setValue('');
  }

}