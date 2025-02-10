import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import HttpClientModule
import { TranslateModule } from '@ngx-translate/core';
import { StreamAutocompleteTextareaModule, StreamChatModule } from 'stream-chat-angular';
import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
} from 'stream-chat-angular';
import { catchError, map, Observable, switchMap, of, from } from 'rxjs';
import { NewChannelComponent } from "./features/channels/new-channel/new-channel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, TranslateModule, StreamAutocompleteTextareaModule, StreamChatModule, NgIf, AsyncPipe, NewChannelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  chatIsReady$!: Observable<boolean>;
  public users$!: Observable<any[]>; // ✅ Observable for users


  constructor(
    private userService: UserService,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
  ) { }
  ngOnInit(): void {
    this.users$ = this.userService.loadUsers(); // ✅ Assign observable directly
    this.streamI18nService.setTranslation();
    this.userService.loadUsers().subscribe((users) => {
      this.userService.findUserById("67a22468305dd22f6dfb0726")
      this.chatIsReady$ = this.userService.generateToken().pipe(
        switchMap((token) => this.chatService.init(
          'twghaea6bwp3',
          "67a22468305dd22f6dfb0726",
          token
        )),
        switchMap(() => this.channelService.init({
          type: 'messaging',
          members: { $in: ["67a22468305dd22f6dfb0726"] },
        })),
        map(() => true),
        catchError(() => of(false))
      );
    });
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
        name,
        members: ["67a22468305dd22f6dfb0726"]
      });
      from(channel.create());
    }

}