import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { AbonoComponent } from 'app/entities/abono/abono.component';
import { AbonoService } from 'app/entities/abono/abono.service';
import { Abono } from 'app/shared/model/abono.model';

describe('Component Tests', () => {
  describe('Abono Management Component', () => {
    let comp: AbonoComponent;
    let fixture: ComponentFixture<AbonoComponent>;
    let service: AbonoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [AbonoComponent]
      })
        .overrideTemplate(AbonoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AbonoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AbonoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Abono(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.abonos && comp.abonos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
