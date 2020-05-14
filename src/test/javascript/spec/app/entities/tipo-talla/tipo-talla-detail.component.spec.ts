import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { TipoTallaDetailComponent } from 'app/entities/tipo-talla/tipo-talla-detail.component';
import { TipoTalla } from 'app/shared/model/tipo-talla.model';

describe('Component Tests', () => {
  describe('TipoTalla Management Detail Component', () => {
    let comp: TipoTallaDetailComponent;
    let fixture: ComponentFixture<TipoTallaDetailComponent>;
    const route = ({ data: of({ tipoTalla: new TipoTalla(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [TipoTallaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoTallaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoTallaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoTalla on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoTalla).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
