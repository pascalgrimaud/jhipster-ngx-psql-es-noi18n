import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldTestServiceImplEntity } from 'app/shared/model/field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityService } from './field-test-service-impl-entity.service';

@Component({
    selector: 'jhi-field-test-service-impl-entity-delete-dialog',
    templateUrl: './field-test-service-impl-entity-delete-dialog.component.html'
})
export class FieldTestServiceImplEntityDeleteDialogComponent {
    fieldTestServiceImplEntity: IFieldTestServiceImplEntity;

    constructor(
        private fieldTestServiceImplEntityService: FieldTestServiceImplEntityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fieldTestServiceImplEntityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fieldTestServiceImplEntityListModification',
                content: 'Deleted an fieldTestServiceImplEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-field-test-service-impl-entity-delete-popup',
    template: ''
})
export class FieldTestServiceImplEntityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldTestServiceImplEntity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FieldTestServiceImplEntityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fieldTestServiceImplEntity = fieldTestServiceImplEntity;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
