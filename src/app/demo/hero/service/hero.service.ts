import { Hero } from './../hero';
import { HEROES } from './../constant/mock-hero';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {

  constructor() { }
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 1000);
    })
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }
}
