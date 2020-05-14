import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { FleastoreTestModule } from '../../../test.module';
import { ListaDetailComponent } from 'app/entities/lista/lista-detail.component';
import { Lista } from 'app/shared/model/lista.model';

describe('Component Tests', () => {
  describe('Lista Management Detail Component', () => {
    let comp: ListaDetailComponent;
    let fixture: ComponentFixture<ListaDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ lista: new Lista(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [ListaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ListaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ListaDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load lista on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.lista).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
