import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldTestEntity } from 'app/shared/model/field-test-entity.model';
import { FieldTestEntityService } from './field-test-entity.service';

@Component({
    selector: 'jhi-field-test-entity-delete-dialog',
    templateUrl: './field-test-entity-delete-dialog.component.html'
})
export class FieldTestEntityDeleteDialogComponent {
    fieldTestEntity: IFieldTestEntity;

    constructor(
        private fieldTestEntityService: FieldTestEntityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fieldTestEntityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fieldTestEntityListModification',
                content: 'Deleted an fieldTestEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-field-test-entity-delete-popup',
    template: ''
})
export class FieldTestEntityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldTestEntity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FieldTestEntityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fieldTestEntity = fieldTestEntity;
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
