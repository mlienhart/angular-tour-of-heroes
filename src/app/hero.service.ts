import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';

const MINIMUM_HEROES_AMOUNT: number = 4;

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    if (HEROES.length > MINIMUM_HEROES_AMOUNT) {
      const heroes = of(HEROES)
        .pipe(map(data => data
          .map(x => <Hero>
            { id: x.id, name: x.name, code: x.code }
          )
          .sort((a, b) => a.name < b.name ? -1 : 1)
          .filter(x => x.id > 12)
        ));
      this.messageService.add('HeroService: fetched heroes');
      return heroes;
    }
    return EMPTY;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

}
