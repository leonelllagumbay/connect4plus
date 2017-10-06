import { FriendsComponent } from './../component/friends/friends.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class CanDeactivateFriends implements CanDeactivate<{}> {
    constructor() {}

    canDeactivate(
        component: FriendsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot
    ): boolean {
        return window.confirm('Leave the page?');
    }
}
