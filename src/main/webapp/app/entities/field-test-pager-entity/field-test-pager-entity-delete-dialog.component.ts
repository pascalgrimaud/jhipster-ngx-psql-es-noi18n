import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldTestPagerEntity } from 'app/shared/model/field-test-pager-entity.model';
import { FieldTestPagerEntityService } from './field-test-pager-entity.service';

@Component({
    selector: 'jhi-field-test-pager-entity-delete-dialog',
    templateUrl: './field-test-pager-entity-delete-dialog.component.html'
})
export class FieldTestPagerEntityDeleteDialogComponent {
    fieldTestPagerEntity: IFieldTestPagerEntity;

    constructor(
        private fieldTestPagerEntityService: FieldTestPagerEntityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fieldTestPagerEntityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fieldTestPagerEntityListModification',
                content: 'Deleted an fieldTestPagerEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-field-test-pager-entity-delete-popup',
    template: ''
})
export class FieldTestPagerEntityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldTestPagerEntity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FieldTestPagerEntityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fieldTestPagerEntity = fieldTestPagerEntity;
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
