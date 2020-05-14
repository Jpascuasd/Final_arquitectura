import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { DetalleFacturaDetailComponent } from 'app/entities/detalle-factura/detalle-factura-detail.component';
import { DetalleFactura } from 'app/shared/model/detalle-factura.model';

describe('Component Tests', () => {
  describe('DetalleFactura Management Detail Component', () => {
    let comp: DetalleFacturaDetailComponent;
    let fixture: ComponentFixture<DetalleFacturaDetailComponent>;
    const route = ({ data: of({ detalleFactura: new DetalleFactura(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [DetalleFacturaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetalleFacturaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetalleFacturaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load detalleFactura on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detalleFactura).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
