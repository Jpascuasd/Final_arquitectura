import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { RolComponent } from 'app/entities/rol/rol.component';
import { RolService } from 'app/entities/rol/rol.service';
import { Rol } from 'app/shared/model/rol.model';

describe('Component Tests', () => {
  describe('Rol Management Component', () => {
    let comp: RolComponent;
    let fixture: ComponentFixture<RolComponent>;
    let service: RolService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [RolComponent]
      })
        .overrideTemplate(RolComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RolComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Rol(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rols && comp.rols[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
