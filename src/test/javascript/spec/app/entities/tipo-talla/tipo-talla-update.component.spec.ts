import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { TipoTallaUpdateComponent } from 'app/entities/tipo-talla/tipo-talla-update.component';
import { TipoTallaService } from 'app/entities/tipo-talla/tipo-talla.service';
import { TipoTalla } from 'app/shared/model/tipo-talla.model';

describe('Component Tests', () => {
  describe('TipoTalla Management Update Component', () => {
    let comp: TipoTallaUpdateComponent;
    let fixture: ComponentFixture<TipoTallaUpdateComponent>;
    let service: TipoTallaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [TipoTallaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoTallaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoTallaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoTallaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoTalla(123);
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
        const entity = new TipoTalla();
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
