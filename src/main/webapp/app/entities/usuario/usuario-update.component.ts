import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IUsuario, Usuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-usuario-update',
  templateUrl: './usuario-update.component.html'
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    apellido: [],
    genero: [],
    rol: [],
    telefono: [],
    direccion: [],
    job: []
  });

  constructor(
    protected usuarioService: UsuarioService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuario }) => {
      if (!usuario.id) {
        const today = moment().startOf('day');
        usuario.telefono = today;
      }

      this.updateForm(usuario);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(usuario: IUsuario): void {
    this.editForm.patchValue({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      genero: usuario.genero,
      rol: usuario.rol,
      telefono: usuario.telefono ? usuario.telefono.format(DATE_TIME_FORMAT) : null,
      direccion: usuario.direccion,
      job: usuario.job
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  private createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      genero: this.editForm.get(['genero'])!.value,
      rol: this.editForm.get(['rol'])!.value,
      telefono: this.editForm.get(['telefono'])!.value ? moment(this.editForm.get(['telefono'])!.value, DATE_TIME_FORMAT) : undefined,
      direccion: this.editForm.get(['direccion'])!.value,
      job: this.editForm.get(['job'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
