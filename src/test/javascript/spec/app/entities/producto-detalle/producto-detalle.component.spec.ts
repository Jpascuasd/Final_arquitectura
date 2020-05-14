import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { ProductoDetalleComponent } from 'app/entities/producto-detalle/producto-detalle.component';
import { ProductoDetalleService } from 'app/entities/producto-detalle/producto-detalle.service';
import { ProductoDetalle } from 'app/shared/model/producto-detalle.model';

describe('Component Tests', () => {
  describe('ProductoDetalle Management Component', () => {
    let comp: ProductoDetalleComponent;
    let fixture: ComponentFixture<ProductoDetalleComponent>;
    let service: ProductoDetalleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [ProductoDetalleComponent]
      })
        .overrideTemplate(ProductoDetalleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductoDetalleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductoDetalleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductoDetalle(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productoDetalles && comp.productoDetalles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
