import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { DetalleFacturaComponent } from 'app/entities/detalle-factura/detalle-factura.component';
import { DetalleFacturaService } from 'app/entities/detalle-factura/detalle-factura.service';
import { DetalleFactura } from 'app/shared/model/detalle-factura.model';

describe('Component Tests', () => {
  describe('DetalleFactura Management Component', () => {
    let comp: DetalleFacturaComponent;
    let fixture: ComponentFixture<DetalleFacturaComponent>;
    let service: DetalleFacturaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [DetalleFacturaComponent]
      })
        .overrideTemplate(DetalleFacturaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleFacturaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleFacturaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetalleFactura(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detalleFacturas && comp.detalleFacturas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
