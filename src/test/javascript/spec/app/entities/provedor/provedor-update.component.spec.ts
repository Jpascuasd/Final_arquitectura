import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { ProvedorUpdateComponent } from 'app/entities/provedor/provedor-update.component';
import { ProvedorService } from 'app/entities/provedor/provedor.service';
import { Provedor } from 'app/shared/model/provedor.model';

describe('Component Tests', () => {
  describe('Provedor Management Update Component', () => {
    let comp: ProvedorUpdateComponent;
    let fixture: ComponentFixture<ProvedorUpdateComponent>;
    let service: ProvedorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [ProvedorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProvedorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProvedorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvedorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Provedor(123);
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
        const entity = new Provedor();
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
