import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { MovimientoComponent } from 'app/entities/movimiento/movimiento.component';
import { MovimientoService } from 'app/entities/movimiento/movimiento.service';
import { Movimiento } from 'app/shared/model/movimiento.model';

describe('Component Tests', () => {
  describe('Movimiento Management Component', () => {
    let comp: MovimientoComponent;
    let fixture: ComponentFixture<MovimientoComponent>;
    let service: MovimientoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [MovimientoComponent]
      })
        .overrideTemplate(MovimientoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MovimientoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MovimientoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Movimiento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.movimientos && comp.movimientos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
