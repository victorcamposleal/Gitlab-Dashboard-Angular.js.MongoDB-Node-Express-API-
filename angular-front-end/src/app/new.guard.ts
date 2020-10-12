import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ApiService } from './api.service';
import { UserMessage } from './admin.app/interfaces/userMessage';

@Injectable({
  providedIn: 'root'
})
export class NewGuard implements CanActivate {
  data: any

  constructor(private ApiService: ApiService, private router: Router) {}
  
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let result: UserMessage = await this.ApiService.searchUserAsync();
    if (result.username === 'No valido') {
      this.router.navigate(['admin/login']);
      return false;
    } else {
      return true;
    }
  }
}
