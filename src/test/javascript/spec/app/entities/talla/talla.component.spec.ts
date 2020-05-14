import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { TallaComponent } from 'app/entities/talla/talla.component';
import { TallaService } from 'app/entities/talla/talla.service';
import { Talla } from 'app/shared/model/talla.model';

describe('Component Tests', () => {
  describe('Talla Management Component', () => {
    let comp: TallaComponent;
    let fixture: ComponentFixture<TallaComponent>;
    let service: TallaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [TallaComponent]
      })
        .overrideTemplate(TallaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TallaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TallaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Talla(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tallas && comp.tallas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
