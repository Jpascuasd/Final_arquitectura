import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { DetalleFacturaUpdateComponent } from 'app/entities/detalle-factura/detalle-factura-update.component';
import { DetalleFacturaService } from 'app/entities/detalle-factura/detalle-factura.service';
import { DetalleFactura } from 'app/shared/model/detalle-factura.model';

describe('Component Tests', () => {
  describe('DetalleFactura Management Update Component', () => {
    let comp: DetalleFacturaUpdateComponent;
    let fixture: ComponentFixture<DetalleFacturaUpdateComponent>;
    let service: DetalleFacturaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [DetalleFacturaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DetalleFacturaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetalleFacturaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetalleFacturaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleFactura(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DetalleFactura();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
