import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FleastoreTestModule } from '../../../test.module';
import { RolDetailComponent } from 'app/entities/rol/rol-detail.component';
import { Rol } from 'app/shared/model/rol.model';

describe('Component Tests', () => {
  describe('Rol Management Detail Component', () => {
    let comp: RolDetailComponent;
    let fixture: ComponentFixture<RolDetailComponent>;
    const route = ({ data: of({ rol: new Rol(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FleastoreTestModule],
        declarations: [RolDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RolDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RolDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load rol on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rol).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
