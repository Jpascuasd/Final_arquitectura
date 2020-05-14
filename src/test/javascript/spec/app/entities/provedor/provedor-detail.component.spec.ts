import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { ProvedorDetailComponent } from 'app/entities/provedor/provedor-detail.component';
import { Provedor } from 'app/shared/model/provedor.model';

describe('Component Tests', () => {
  describe('Provedor Management Detail Component', () => {
    let comp: ProvedorDetailComponent;
    let fixture: ComponentFixture<ProvedorDetailComponent>;
    const route = ({ data: of({ provedor: new Provedor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [ProvedorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProvedorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProvedorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load provedor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.provedor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
