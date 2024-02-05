import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  /* forma tradicional de inyección de dependencias */
  // constructor(private httpClient: HttpClient) {}

  /* otra forma de inyección de dependencias */
  private httpClient = inject(HttpClient);

  private baseUrl = 'https://reqres.in/api/users';

  getFetchUserById(id: number): Observable<User> {
    return this.httpClient
      .get<SingleUserResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        map((response) => response.data),
        tap((response) => console.log(response))
      );
  }
}
