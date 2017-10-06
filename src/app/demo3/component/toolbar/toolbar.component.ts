import { GameKonstant } from './../../constant/game-constant';
import { ConnectFourService } from './../../service/connect-four.service';
import { ModalInfoComponent } from './../modal-info/modal-info.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() playAgainClicked = new EventEmitter<number>();
  @Output() quitClicked = new EventEmitter<number>();
  form: FormGroup;
  constructor(private modalService: NgbModal, private _fb: FormBuilder, private _cs: ConnectFourService) {}

  ngOnInit() {
    this.form = this._fb.group({
      your_name: ['', [Validators.required]],
      online: ['', []]
    });

    const userForm = this.form.get('your_name');
    userForm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(value => {
        if (value !== '') {
          this.form.controls.online.setValue(true);
          localStorage.setItem('your_name', value);
          this.tellMyFriendsImOnline(value);
        } else {
          this.form.controls.online.setValue(false);
          this.tellMyFriendsIQuit();
        }
    });
    if (localStorage.getItem('your_name')) {
      this.form.controls.your_name.setValue(localStorage.getItem('your_name'));
    }
  }

  open(winner) {
    const modalRef = this.modalService.open(ModalInfoComponent);
    modalRef.componentInstance.name = winner;
    modalRef.result.then((result) => {
      // console.log('modal result', result);
    }, (reason) => {
      // console.log('reason of closing', reason);
    })
  }

  playConnectFour() {
    this.playAgainClicked.emit(0);
    // this.open();
  }

  tellMyFriendsImOnline(value) {
    const request = {
      command: GameKonstant.get('im_online'),
      source_id: this._cs.getDestinationId(),
      name: value
    }
    this._cs.sendMessage(JSON.stringify(request));
  }

  tellMyFriendsIQuit() {
    const request = {
      command: GameKonstant.get('quit'),
      source_id: this._cs.getDestinationId()
    }
    this._cs.sendMessage(JSON.stringify(request));
  }
}
