import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'signals-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css'],
})
export class UserInfoPageComponent implements OnInit {
  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  /* private porque no saldrá de este componente */
  private usersService = inject(UsersService);

  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  loadUser(id: number) {
    if (id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined); // para que de la impresión de que carga más rápido porque elimina todo y luego carga el nuevo usuario

    this.usersService.getFetchUserById(id).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: (error) => {
        console.log(error);
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      },
    });
  }
}
