import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DetalleMovimientoService } from 'app/entities/detalle-movimiento/detalle-movimiento.service';
import { IDetalleMovimiento, DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

describe('Service Tests', () => {
  describe('DetalleMovimiento Service', () => {
    let injector: TestBed;
    let service: DetalleMovimientoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetalleMovimiento;
    let expectedResult: IDetalleMovimiento | IDetalleMovimiento[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DetalleMovimientoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DetalleMovimiento(0, 'AAAAAAA', 'AAAAAAA', 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate
          },
          returnedFromService
        );

        service.create(new DetalleMovimiento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            nombre: 'BBBBBB',
            producto: 1,
            cantidad: 1,
            fecha: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetalleMovimiento', () => {
        const returnedFromService = Object.assign(
          {
            codigo: 'BBBBBB',
            nombre: 'BBBBBB',
            producto: 1,
            cantidad: 1,
            fecha: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DetalleMovimiento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
