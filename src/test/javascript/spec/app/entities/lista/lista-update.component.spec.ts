import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { ListaUpdateComponent } from 'app/entities/lista/lista-update.component';
import { ListaService } from 'app/entities/lista/lista.service';
import { Lista } from 'app/shared/model/lista.model';

describe('Component Tests', () => {
  describe('Lista Management Update Component', () => {
    let comp: ListaUpdateComponent;
    let fixture: ComponentFixture<ListaUpdateComponent>;
    let service: ListaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [ListaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ListaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Lista(123);
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
        const entity = new Lista();
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
