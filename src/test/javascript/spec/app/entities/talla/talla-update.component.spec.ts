import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { TallaUpdateComponent } from 'app/entities/talla/talla-update.component';
import { TallaService } from 'app/entities/talla/talla.service';
import { Talla } from 'app/shared/model/talla.model';

describe('Component Tests', () => {
  describe('Talla Management Update Component', () => {
    let comp: TallaUpdateComponent;
    let fixture: ComponentFixture<TallaUpdateComponent>;
    let service: TallaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [TallaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TallaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TallaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TallaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Talla(123);
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
        const entity = new Talla();
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
