import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { TipoTallaComponent } from 'app/entities/tipo-talla/tipo-talla.component';
import { TipoTallaService } from 'app/entities/tipo-talla/tipo-talla.service';
import { TipoTalla } from 'app/shared/model/tipo-talla.model';

describe('Component Tests', () => {
  describe('TipoTalla Management Component', () => {
    let comp: TipoTallaComponent;
    let fixture: ComponentFixture<TipoTallaComponent>;
    let service: TipoTallaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [TipoTallaComponent]
      })
        .overrideTemplate(TipoTallaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoTallaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoTallaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoTalla(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoTallas && comp.tipoTallas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
