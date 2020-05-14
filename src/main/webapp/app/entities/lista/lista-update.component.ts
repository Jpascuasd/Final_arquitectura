import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILista, Lista } from 'app/shared/model/lista.model';
import { ListaService } from './lista.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-lista-update',
  templateUrl: './lista-update.component.html'
})
export class ListaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    codigo: [],
    descripcion: [],
    descripcionContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected listaService: ListaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lista }) => {
      this.updateForm(lista);
    });
  }

  updateForm(lista: ILista): void {
    this.editForm.patchValue({
      id: lista.id,
      nombre: lista.nombre,
      codigo: lista.codigo,
      descripcion: lista.descripcion,
      descripcionContentType: lista.descripcionContentType
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('fleastoreApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lista = this.createFromForm();
    if (lista.id !== undefined) {
      this.subscribeToSaveResponse(this.listaService.update(lista));
    } else {
      this.subscribeToSaveResponse(this.listaService.create(lista));
    }
  }

  private createFromForm(): ILista {
    return {
      ...new Lista(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      descripcionContentType: this.editForm.get(['descripcionContentType'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILista>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
