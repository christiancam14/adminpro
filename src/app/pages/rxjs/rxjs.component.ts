import { Component, OnDestroy, OnInit } from '@angular/core';
// import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  public intervalSub: Subscription;

  constructor() {
    /*
    this.retornaObseravable()
      .pipe(retry())
      .subscribe(
        (valor) => console.log('Subs:', valor),
        (error) => console.warn('Error', error),
        () => console.log('Completado')
      );
      */

    this.intervalSub = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      take(10),
      map((valor) => valor + 1),
      filter((num) => num % 2 === 0)
    );
  }

  retornaObseravable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llegó al valor de 2');
        }
      }, 1000);
    });

    return obs$;
  }

  ngOnInit(): void {}
}
