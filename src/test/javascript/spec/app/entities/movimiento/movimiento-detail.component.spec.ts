import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { MovimientoDetailComponent } from 'app/entities/movimiento/movimiento-detail.component';
import { Movimiento } from 'app/shared/model/movimiento.model';

describe('Component Tests', () => {
  describe('Movimiento Management Detail Component', () => {
    let comp: MovimientoDetailComponent;
    let fixture: ComponentFixture<MovimientoDetailComponent>;
    const route = ({ data: of({ movimiento: new Movimiento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [MovimientoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MovimientoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MovimientoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load movimiento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.movimiento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
