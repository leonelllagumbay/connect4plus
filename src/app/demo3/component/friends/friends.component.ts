import { GameKonstant } from './../../constant/game-constant';
import { ConnectFourService } from './../../service/connect-four.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from './../../class/friend';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  onlineFriends: Friend[];
  gameId: string;
  constructor(private _ar: ActivatedRoute, private _cs: ConnectFourService, private _router: Router) { }

  ngOnInit() {
    this.onlineFriends = [];

    this._ar.params.subscribe(value => {
      console.log('route params', value);
      // Invite friends here
      this.getWhosOnline(value);
    });

    // listen for incoming socket
    this._cs.getMessage().subscribe(data => {
      this.processIncomingData(data);
    });

    this.onlineFriends = this._cs.onlineFriends;
  }

  inviteFriend(friend: Friend) {

    const params = {
      command: GameKonstant.get('invite_friend'),
      source_id:  this._cs.getMyId(),
      destination_id: friend.source_id,
      name: this._cs.getMyName()
    }
    this._cs.sendMessage(JSON.stringify(params));

    this._cs.setMyOpponentId(friend.source_id);

    this.onlineFriends.map(f => {
      if (f.source_id === friend.source_id) {
        f.requestClass = 'btn-success';
        return f;
      }
    });
  }

  acceptGame(friend: Friend) {
    this._cs.setGameId('gameid' + Math.random().toString());
    const turn_id = 'turnid' + Math.random().toString();
    this._cs.setTurnId(turn_id);
    this._cs.setMyTurnId(turn_id);
    const params = {
      command: GameKonstant.get('accept_invite'),
      source_id:  this._cs.getMyId(),
      destination_id: friend.source_id,
      name: this._cs.getMyName(),
      game_id: this._cs.getGameId(),
      turn_id: this._cs.getTurnId(),
    }
    this._cs.sendMessage(JSON.stringify(params));
    this._router.navigate(['demo3']);
  }

  getWhosOnline(value) {
    const params = {
      command: GameKonstant.get('whos_online'),
      source_id:  this._cs.getMyId()
    }
    this._cs.sendMessage(JSON.stringify(params));
  }

  processIncomingData(data) {
    if (data !== 'Welcome bro!') {
      const data_stream = JSON.parse(data);
      if (data_stream.command === GameKonstant.get('whos_online')) {
        this._cs.sayImOnline(data_stream);
      } else if (data_stream.command === GameKonstant.get('im_online')) {
        this.addOnlineToList(data_stream);
      } else if (data_stream.command === GameKonstant.get('invite_friend')) {
        this.addOnlineToListAsPending(data_stream);
      }  else if (data_stream.command === GameKonstant.get('accept_invite')) {
        this.startGame(data_stream);
      } else if (data_stream.command === GameKonstant.get('hover_update')) {
        // TODO
      } else if (data_stream.command === GameKonstant.get('click_update')) {
        // TODO
      } else if (data_stream.command === GameKonstant.get('play_again')) {
        // TODO
      } else if (data_stream.command === GameKonstant.get('quit')) {
        this.removeFromList(data_stream);
      } else {
        // Ignore anything
      }
    }
  }

  removeFromList(data_stream) {
    console.log('remove user from list');
    if (!this.doesNotExistSourceId(data_stream.source_id)) {
      const temp_friends = [];
      for (const friend of this.onlineFriends) {
        if (friend.source_id !== data_stream.source_id) {
          console.log('exists to delete');
          temp_friends.push(friend);
        }
      }
      this.onlineFriends = temp_friends;
    }
  }

  addOnlineToList(data_stream) {
    console.log('add online users to list', this._cs.getMyId());
    if (data_stream.source_id && this.doesNotExistSourceId(data_stream.source_id)) {
      if (this._cs.getMyName()) { // you know that your online if this is defined
        this.onlineFriends.push(new Friend('Invite', 'btn-warning', data_stream.name, data_stream.source_id));
      }
    } else { // Update the name
      this.onlineFriends.map(friend => {
        if (friend.source_id === data_stream.source_id) {
          friend.name = data_stream.name;
          return friend;
        } else {
          return friend;
        }
      })
    }
  }

  doesNotExistSourceId(source_id) {
    for (const friend of this.onlineFriends) {
      if (friend.source_id === source_id) {
        return false;
      }
    }
    return true;
  }

  addOnlineToListAsPending(data_stream) {
    console.log('this invite is for me 0');
    if (data_stream.destination_id === this._cs.getMyId()) {
      if (localStorage.getItem('your_name') && this.doesNotExistSourceId(data_stream.source_id)) {
        this.onlineFriends.push(new Friend('Accept', 'btn-primary', data_stream.name, data_stream.source_id));
      } else { // Update the name
        this.onlineFriends.map(friend => {
          if (friend.source_id === data_stream.source_id) {
            friend.name = data_stream.name;
            friend.requestAction = 'Accept';
            friend.requestClass = 'btn-primary';
            return friend;
          } else {
            return friend;
          }
        })
      }
    }
  }

  startGame(data_stream) {
    this._cs.setGameId(data_stream.game_id);
    this._cs.setTurnId(data_stream.turn_id);
    this._cs.setMyTurnId('turn' + Math.random().toString());
    if (data_stream.destination_id === this._cs.getMyId() && data_stream.source_id === this._cs.getMyOpponentId()) {
      this._router.navigate(['demo3']);
    }
  }

}
