import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldTestInfiniteScrollEntity } from 'app/shared/model/field-test-infinite-scroll-entity.model';
import { FieldTestInfiniteScrollEntityService } from './field-test-infinite-scroll-entity.service';

@Component({
    selector: 'jhi-field-test-infinite-scroll-entity-delete-dialog',
    templateUrl: './field-test-infinite-scroll-entity-delete-dialog.component.html'
})
export class FieldTestInfiniteScrollEntityDeleteDialogComponent {
    fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity;

    constructor(
        private fieldTestInfiniteScrollEntityService: FieldTestInfiniteScrollEntityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fieldTestInfiniteScrollEntityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fieldTestInfiniteScrollEntityListModification',
                content: 'Deleted an fieldTestInfiniteScrollEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-field-test-infinite-scroll-entity-delete-popup',
    template: ''
})
export class FieldTestInfiniteScrollEntityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldTestInfiniteScrollEntity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FieldTestInfiniteScrollEntityDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fieldTestInfiniteScrollEntity = fieldTestInfiniteScrollEntity;
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
