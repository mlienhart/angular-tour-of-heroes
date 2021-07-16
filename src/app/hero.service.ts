import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES)
      .pipe(map(data => data
        .map(x => <Hero>
          { id: x.id * 100, name: x.name.toLocaleUpperCase() }
        )
        .filter(x => x.id > 1300)));
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

}
