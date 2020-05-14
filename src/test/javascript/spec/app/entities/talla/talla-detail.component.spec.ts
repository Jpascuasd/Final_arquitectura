import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { TallaDetailComponent } from 'app/entities/talla/talla-detail.component';
import { Talla } from 'app/shared/model/talla.model';

describe('Component Tests', () => {
  describe('Talla Management Detail Component', () => {
    let comp: TallaDetailComponent;
    let fixture: ComponentFixture<TallaDetailComponent>;
    const route = ({ data: of({ talla: new Talla(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [TallaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TallaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TallaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load talla on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.talla).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
