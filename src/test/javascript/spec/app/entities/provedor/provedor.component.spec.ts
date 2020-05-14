import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FleastoreTestModule } from '../../../test.module';
import { ProvedorComponent } from 'app/entities/provedor/provedor.component';
import { ProvedorService } from 'app/entities/provedor/provedor.service';
import { Provedor } from 'app/shared/model/provedor.model';

describe('Component Tests', () => {
  describe('Provedor Management Component', () => {
    let comp: ProvedorComponent;
    let fixture: ComponentFixture<ProvedorComponent>;
    let service: ProvedorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [ProvedorComponent]
      })
        .overrideTemplate(ProvedorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProvedorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProvedorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Provedor(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.provedors && comp.provedors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
