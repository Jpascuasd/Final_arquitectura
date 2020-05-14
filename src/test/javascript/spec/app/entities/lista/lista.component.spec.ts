import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { ListaComponent } from 'app/entities/lista/lista.component';
import { ListaService } from 'app/entities/lista/lista.service';
import { Lista } from 'app/shared/model/lista.model';

describe('Component Tests', () => {
  describe('Lista Management Component', () => {
    let comp: ListaComponent;
    let fixture: ComponentFixture<ListaComponent>;
    let service: ListaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [ListaComponent]
      })
        .overrideTemplate(ListaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ListaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ListaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Lista(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.listas && comp.listas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
